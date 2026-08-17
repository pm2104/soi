"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  ReactNode,
} from "react";
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut,
  User,
} from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db, googleProvider } from "./firebase";

export interface ProfessionalProfile {
  uid: string;
  email: string;
  displayName: string;
  photoURL: string | null;
  phone: string;
  professionalType: string;
  specialization: string;
  experienceYears: number;
  city: string;
  organization: string;
  qualifications: string[];
  certifications: string[];
  areasOfExpertise: string[];
  bio: string;
  linkedinUrl: string;
  portfolioUrl: string;
  portfolioPhotos: string[]; // <-- ADD THIS LINE
  profileCompleted: boolean;
  status: "pending" | "approved" | "rejected" | "suspended";
  createdAt: unknown;
  updatedAt: unknown;
}

interface AuthContextType {
  user: User | null;
  profile: ProfessionalProfile | null;
  loading: boolean;
  authLoading: boolean;
  authError: string | null;
  signInWithGoogle: () => Promise<ProfessionalProfile | null>;
  logout: () => Promise<void>;
  refreshProfile: () => Promise<void>;
  clearAuthError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<ProfessionalProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);

      if (firebaseUser) {
        try {
          const profileDoc = await getDoc(
            doc(db, "professionals", firebaseUser.uid)
          );
          if (profileDoc.exists()) {
            setProfile(profileDoc.data() as ProfessionalProfile);
          } else {
            setProfile(null);
          }
        } catch (err) {
          console.error("Error fetching profile:", err);
          setProfile(null);
        }
      } else {
        setProfile(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const refreshProfile = useCallback(async () => {
    if (!user) return;
    try {
      const profileDoc = await getDoc(doc(db, "professionals", user.uid));
      if (profileDoc.exists()) {
        setProfile(profileDoc.data() as ProfessionalProfile);
      }
    } catch (err) {
      console.error("Error refreshing profile:", err);
    }
  }, [user]);

  const signInWithGoogle = useCallback(async (): Promise<ProfessionalProfile | null> => {
    setAuthLoading(true);
    setAuthError(null);

    try {
      const result = await signInWithPopup(auth, googleProvider);
      const firebaseUser = result.user;

      const profileRef = doc(db, "professionals", firebaseUser.uid);
      const profileSnap = await getDoc(profileRef);

      if (!profileSnap.exists()) {
        const initialProfile = {
          uid: firebaseUser.uid,
          email: firebaseUser.email || "",
          displayName: firebaseUser.displayName || "",
          photoURL: firebaseUser.photoURL,
          phone: "",
          professionalType: "",
          specialization: "",
          experienceYears: 0,
          city: "",
          organization: "",
          qualifications: [],
          certifications: [],
          areasOfExpertise: [],
          bio: "",
          linkedinUrl: "",
          portfolioUrl: "",
          profileCompleted: false,
          status: "pending" as const,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
        };

        await setDoc(profileRef, initialProfile);
        const prof = { ...initialProfile, createdAt: null, updatedAt: null } as unknown as ProfessionalProfile;
        setProfile(prof);
        return prof;
      } else {
        const data = profileSnap.data() as ProfessionalProfile;
        setProfile(data);
        return data;
      }
    } catch (err: unknown) {
      const error = err as { code?: string; message?: string };
      console.error("Google sign-in error:", error);

      if (error.code === "auth/popup-closed-by-user") {
        setAuthError("Sign-in cancelled. Please try again.");
      } else if (error.code === "auth/popup-blocked") {
        setAuthError("Popup blocked. Please allow popups for this site.");
      } else if (error.code === "auth/network-request-failed") {
        setAuthError("Network error. Please check your connection.");
      } else if (error.code === "auth/unauthorized-domain") {
        setAuthError("This domain is not authorized for authentication. Please contact support.");
      } else {
        setAuthError("Sign-in failed. Please try again.");
      }
      return null;
    } finally {
      setAuthLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await signOut(auth);
      setProfile(null);
    } catch (err) {
      console.error("Sign-out error:", err);
    }
  }, []);

  const clearAuthError = useCallback(() => {
    setAuthError(null);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        loading,
        authLoading,
        authError,
        signInWithGoogle,
        logout,
        refreshProfile,
        clearAuthError,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}