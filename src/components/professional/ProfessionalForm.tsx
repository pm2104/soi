"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import {
  Loader2,
  Upload,
  Trash2,
  X,
  Check,
  ChevronRight,
  AlertCircle,
  User,
} from "lucide-react";
import Image from "next/image";

import { db } from "@/lib/firebase";
import { useAuth } from "@/lib/auth-context";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ACCEPTED_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
];

const CLOUDINARY_CLOUD_NAME =
  process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

const CLOUDINARY_UPLOAD_PRESET =
  process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

/* ─────────────────────────────────────────────
   FORM SCHEMA
───────────────────────────────────────────── */

const onboardingSchema = z
  .object({
    displayName: z.string().min(2, "Full name is required"),

    email: z.string().email("Invalid email"),

    phone: z.string().min(10, "Valid phone number is required"),

    city: z.string().min(2, "City is required"),

    professionalType: z
      .string()
      .min(1, "Professional type is required"),

    professionalTypeOther: z.string().optional(),

    specialization: z
      .string()
      .min(1, "Specialization is required"),

    specializationOther: z.string().optional(),

    experienceYears: z.coerce
      .number()
      .min(0, "Experience must be 0 or more")
      .max(60, "Experience must be realistic"),

    organization: z.string().optional(),

    qualifications: z
      .array(z.string())
      .min(1, "At least one qualification is required"),

    certifications: z.array(z.string()).optional(),

    areasOfExpertise: z.array(z.string()).optional(),

    bio: z
      .string()
      .min(50, "Bio must be at least 50 characters")
      .max(1000, "Bio must be under 1000 characters"),

    linkedinUrl: z
      .string()
      .url("Must be a valid URL")
      .or(z.literal("")),

    portfolioUrl: z
      .string()
      .url("Must be a valid URL")
      .or(z.literal("")),
  })
  .superRefine((data, ctx) => {
    if (
      data.professionalType === "Other" &&
      !data.professionalTypeOther?.trim()
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["professionalTypeOther"],
        message: "Please enter your professional type",
      });
    }

    if (
      data.specialization === "Other" &&
      !data.specializationOther?.trim()
    ) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ["specializationOther"],
        message: "Please enter your specialization",
      });
    }
  });

type OnboardingFormData = z.infer<typeof onboardingSchema>;

/* ─────────────────────────────────────────────
   PROFESSIONAL TYPES
───────────────────────────────────────────── */

const PROFESSIONAL_TYPES = [
  "Site Supervisor",
  "Civil Engineer",
  "Architect",
  "Interior Designer",
  "Project Manager",
  "Quantity Surveyor",
  "MEP Engineer",
  "Consultant",
  "3D Visualizer",
  "Structural Engineer",
  "Other",
];

const SPECIALIZATIONS: Record<string, string[]> = {
  "Site Supervisor": [
    "Residential",
    "Commercial",
    "Industrial",
    "Infrastructure",
    "Renovation",
    "Other",
  ],

  "Civil Engineer": [
    "Structural",
    "Geotechnical",
    "Transportation",
    "Water Resources",
    "Environmental",
    "Other",
  ],

  Architect: [
    "Residential",
    "Commercial",
    "Landscape",
    "Sustainable",
    "Urban",
    "Other",
  ],

  "Interior Designer": [
    "Residential",
    "Commercial",
    "Hospitality",
    "Retail",
    "Corporate",
    "Other",
  ],

  "Project Manager": [
    "Construction",
    "Infrastructure",
    "Real Estate",
    "Renovation",
    "Other",
  ],

  "Quantity Surveyor": [
    "Cost Estimation",
    "Contract Management",
    "Procurement",
    "Valuation",
    "Other",
  ],

  "MEP Engineer": [
    "Mechanical",
    "Electrical",
    "Plumbing",
    "HVAC",
    "Fire Protection",
    "Other",
  ],

  Consultant: [
    "Structural",
    "Project Management",
    "Sustainability",
    "Legal",
    "Safety",
    "Other",
  ],

  "3D Visualizer": [
    "Architectural",
    "Interior",
    "Product",
    "Animation",
    "VR/AR",
    "Other",
  ],

  "Structural Engineer": [
    "Concrete",
    "Steel",
    "Timber",
    "Masonry",
    "Seismic",
    "Other",
  ],

  Other: ["Other"],
};

/* ─────────────────────────────────────────────
   TAG INPUT
───────────────────────────────────────────── */

interface TagInputProps {
  label: React.ReactNode;
  tags: string[];
  onChange: (tags: string[]) => void;
  placeholder?: string;
  error?: string;
}

function TagInput({
  label,
  tags,
  onChange,
  placeholder,
  error,
}: TagInputProps) {
  const [input, setInput] = useState("");

  const addTag = (raw: string) => {
    const trimmed = raw.trim().replace(/,$/, "");

    if (trimmed && !tags.includes(trimmed)) {
      onChange([...tags, trimmed]);
    }
  };

  const removeTag = (tag: string) => {
    onChange(tags.filter((t) => t !== tag));
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag(input);
      setInput("");
    } else if (e.key === "," || e.key === "Tab") {
      e.preventDefault();
      addTag(input);
      setInput("");
    } else if (
      e.key === "Backspace" &&
      input === "" &&
      tags.length > 0
    ) {
      removeTag(tags[tags.length - 1]);
    }
  };

  const handleBlur = () => {
    if (input.trim()) {
      addTag(input);
      setInput("");
    }
  };

  const handlePaste = (
    e: React.ClipboardEvent<HTMLInputElement>
  ) => {
    e.preventDefault();

    const pasted = e.clipboardData
      .getData("text")
      .split(/[,\n]/)
      .map((s) => s.trim())
      .filter(
        (s) =>
          s.length > 0 &&
          !tags.includes(s)
      );

    if (pasted.length > 0) {
      onChange([...tags, ...pasted]);
    }
  };

  return (
    <div>
      <label className="block text-sm font-semibold text-text mb-2">
        {label}
      </label>

      <div
        className={cn(
          "flex flex-wrap gap-2 p-3 rounded-2xl border bg-white transition-colors min-h-[52px]",
          error
            ? "border-red-300"
            : "border-border focus-within:border-accent"
        )}
      >
        {tags.map((tag) => (
          <span
            key={tag}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-navy/5 text-navy text-sm font-medium rounded-xl"
          >
            {tag}

            <button
              type="button"
              onClick={() => removeTag(tag)}
              className="hover:text-red-500 transition-colors p-0.5 rounded-md hover:bg-red-50"
            >
              <X className="h-3 w-3" />
            </button>
          </span>
        ))}

        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          onPaste={handlePaste}
          placeholder={
            tags.length === 0 ? placeholder : ""
          }
          className="flex-1 min-w-[140px] bg-transparent text-sm outline-none placeholder:text-secondary-text/50 py-1"
        />
      </div>

      <p className="text-xs text-secondary-text/70 mt-1.5">
        Press{" "}
        <kbd className="px-1.5 py-0.5 bg-light-gray rounded text-[10px] font-mono">
          Enter
        </kbd>
        ,{" "}
        <kbd className="px-1.5 py-0.5 bg-light-gray rounded text-[10px] font-mono">
          ,
        </kbd>
        ,{" "}
        <kbd className="px-1.5 py-0.5 bg-light-gray rounded text-[10px] font-mono">
          Tab
        </kbd>
        , or click away to add.
      </p>

      {error && (
        <p className="text-xs text-red-500 mt-1">
          {error}
        </p>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   CLOUDINARY UPLOAD
───────────────────────────────────────────── */

interface ImageUploadProps {
  label: string;
  images: string[];
  onChange: (urls: string[]) => void;
  maxFiles?: number;
  folder: string;
  uid: string;
}

function ImageUpload({
  label,
  images,
  onChange,
  maxFiles = 1,
  folder,
  uid,
}: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const inputRef =
    useRef<HTMLInputElement>(null);

  const handleFileSelect = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = e.target.files;

    if (!files || files.length === 0) {
      return;
    }

    if (
      !CLOUDINARY_CLOUD_NAME ||
      !CLOUDINARY_UPLOAD_PRESET
    ) {
      alert(
        "Cloudinary configuration is missing. Please check your environment variables."
      );
      return;
    }

    const remainingSlots =
      maxFiles - images.length;

    const filesToUpload =
      Array.from(files).slice(
        0,
        remainingSlots
      );

    if (filesToUpload.length === 0) {
      alert(
        `Maximum ${maxFiles} image${
          maxFiles > 1 ? "s" : ""
        } allowed.`
      );
      return;
    }

    setUploading(true);
    setProgress(0);

    const uploadedUrls: string[] = [];

    for (
      let i = 0;
      i < filesToUpload.length;
      i++
    ) {
      const file = filesToUpload[i];

      if (file.size > MAX_FILE_SIZE) {
        alert(
          `${file.name} is too large. Maximum size is 5MB.`
        );
        continue;
      }

      if (!ACCEPTED_TYPES.includes(file.type)) {
        alert(
          `${file.name} is not a valid image. Use JPG, PNG, or WebP.`
        );
        continue;
      }

      try {
        const formData = new FormData();

        formData.append("file", file);

        const uploadFolder =
          `supervisors-of-india/${folder}/${uid}`;

        formData.append(
          "upload_preset",
          CLOUDINARY_UPLOAD_PRESET
        );

        formData.append(
          "folder",
          uploadFolder
        );

        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
          {
            method: "POST",
            body: formData,
          }
        );

        const result = await response.json();

        if (!response.ok) {
          throw new Error(
            result?.error?.message ||
              "Cloudinary upload failed"
          );
        }

        if (!result.secure_url) {
          throw new Error(
            "Cloudinary did not return an image URL."
          );
        }

        uploadedUrls.push(result.secure_url);

        const percent =
          ((i + 1) /
            filesToUpload.length) *
          100;

        setProgress(Math.round(percent));
      } catch (error) {
        console.error(
          "Cloudinary upload error:",
          error
        );

        alert(
          `Failed to upload ${file.name}. Please try again.`
        );
      }
    }

    if (uploadedUrls.length > 0) {
      onChange([
        ...images,
        ...uploadedUrls,
      ]);
    }

    setUploading(false);
    setProgress(0);

    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const removeImage = (url: string) => {
    onChange(
      images.filter((img) => img !== url)
    );
  };

  return (
    <div>
      {label && (
        <label className="block text-sm font-semibold text-text mb-2">
          {label}
        </label>
      )}

      {images.length > 0 && (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 mb-3">
          {images.map((url) => (
            <div
              key={url}
              className="relative aspect-square rounded-2xl overflow-hidden border border-border/50 group"
            >
              <Image
                src={url}
                alt="Uploaded"
                fill
                className="object-cover"
                sizes="(max-width: 640px) 33vw, 25vw"
              />

              <button
                type="button"
                onClick={() =>
                  removeImage(url)
                }
                className="absolute top-1.5 right-1.5 p-1.5 bg-red-500 text-white rounded-xl opacity-0 group-hover:opacity-100 transition-opacity shadow-sm"
              >
                <Trash2 className="h-3 w-3" />
              </button>
            </div>
          ))}
        </div>
      )}

      {images.length < maxFiles && (
        <div>
          <input
            ref={inputRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple={maxFiles > 1}
            onChange={handleFileSelect}
            className="hidden"
          />

          <button
            type="button"
            onClick={() =>
              inputRef.current?.click()
            }
            disabled={uploading}
            className={cn(
              "w-full flex flex-col items-center justify-center gap-2 px-4 py-6 rounded-2xl border-2 border-dashed transition-colors",
              uploading
                ? "border-accent bg-accent/5 cursor-wait"
                : "border-border hover:border-accent hover:bg-accent/5 cursor-pointer"
            )}
          >
            {uploading ? (
              <>
                <Loader2 className="h-6 w-6 text-accent animate-spin" />

                <span className="text-sm font-medium text-accent">
                  Uploading... {progress}%
                </span>
              </>
            ) : (
              <>
                <Upload className="h-6 w-6 text-secondary-text" />

                <span className="text-sm font-medium text-secondary-text">
                  Click to upload image
                  {maxFiles > 1 ? "s" : ""}
                </span>

                <span className="text-xs text-secondary-text/60">
                  JPG, PNG, WebP up to 5MB
                  {maxFiles > 1
                    ? ` • ${images.length}/${maxFiles} uploaded`
                    : ""}
                </span>
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   MAIN FORM
───────────────────────────────────────────── */

export default function ProfessionalForm() {
  const router = useRouter();

  const {
    user,
    profile,
    refreshProfile,
  } = useAuth();

  const [submitting, setSubmitting] =
    useState(false);

  const [submitError, setSubmitError] =
    useState<string | null>(null);

  const [step, setStep] = useState(0);

  const [profilePhoto, setProfilePhoto] =
    useState<string>(
      profile?.photoURL ||
        user?.photoURL ||
        ""
    );

  const [portfolioPhotos, setPortfolioPhotos] =
    useState<string[]>(
      profile?.portfolioPhotos || []
    );

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    getValues,
    formState: { errors },
  } = useForm<OnboardingFormData>({
    resolver: zodResolver(
      onboardingSchema
    ),

    defaultValues: {
      displayName:
        user?.displayName ||
        profile?.displayName ||
        "",

      email:
        user?.email ||
        profile?.email ||
        "",

      phone:
        profile?.phone ||
        "",

      city:
        profile?.city ||
        "",

      professionalType:
        profile?.professionalType ||
        "",

      professionalTypeOther:
        (profile as any)?.professionalTypeOther ||
        "",

      specialization:
        profile?.specialization ||
        "",

      specializationOther:
        (profile as any)?.specializationOther ||
        "",

      experienceYears:
        profile?.experienceYears ||
        0,

      organization:
        profile?.organization ||
        "",

      qualifications:
        profile?.qualifications ||
        [],

      certifications:
        profile?.certifications ||
        [],

      areasOfExpertise:
        profile?.areasOfExpertise ||
        [],

      bio:
        profile?.bio ||
        "",

      linkedinUrl:
        profile?.linkedinUrl ||
        "",

      portfolioUrl:
        profile?.portfolioUrl ||
        "",
    },
  });

  const selectedType =
    watch("professionalType");

  const selectedSpecialization =
    watch("specialization");

  const qualifications =
    watch("qualifications") || [];

  const certifications =
    watch("certifications") || [];

  const areasOfExpertise =
    watch("areasOfExpertise") || [];

  /* ─────────────────────────────────────────
     SUBMIT
  ───────────────────────────────────────── */

  const onSubmit = async (
    data: OnboardingFormData
  ) => {
    if (!user) {
      setSubmitError(
        "You must be signed in to submit your profile."
      );
      return;
    }

    setSubmitting(true);
    setSubmitError(null);

    try {
      const profileRef = doc(
        db,
        "professionals",
        user.uid
      );

      const payload = {
        uid: user.uid,

        email: data.email,

        displayName:
          data.displayName,

        photoURL:
          profilePhoto ||
          user.photoURL ||
          null,

        phone: data.phone,

        city: data.city,

        professionalType:
          data.professionalType,

        professionalTypeOther:
          data.professionalType === "Other"
            ? data.professionalTypeOther?.trim() || ""
            : "",

        specialization:
          data.specialization,

        specializationOther:
          data.specialization === "Other"
            ? data.specializationOther?.trim() || ""
            : "",

        experienceYears:
          data.experienceYears,

        organization:
          data.organization || "",

        qualifications:
          data.qualifications,

        certifications:
          data.certifications || [],

        areasOfExpertise:
          data.areasOfExpertise || [],

        bio: data.bio,

        linkedinUrl:
          data.linkedinUrl || "",

        portfolioUrl:
          data.portfolioUrl || "",

        portfolioPhotos:
          portfolioPhotos,

        profileCompleted: true,

        status: "pending",

        updatedAt:
          serverTimestamp(),
      };

      await setDoc(
        profileRef,
        payload,
        {
          merge: true,
        }
      );

      await refreshProfile();

      router.push(
        "/professional/dashboard"
      );
    } catch (error) {
      console.error(
        "Save error:",
        error
      );

      setSubmitError(
        "Failed to save profile. Please try again."
      );

      setSubmitting(false);
    }
  };

  /* ─────────────────────────────────────────
     FINAL VALIDATION
  ───────────────────────────────────────── */

  const handleFinalSubmit = () => {
    const values = getValues();

    if (
      !values.displayName ||
      values.displayName.trim().length < 2
    ) {
      setStep(0);
      setSubmitError(
        "Full name is required."
      );
      return;
    }

    if (
      !values.phone ||
      values.phone.trim().length < 10
    ) {
      setStep(0);
      setSubmitError(
        "Phone number is required."
      );
      return;
    }

    if (
      !values.city ||
      values.city.trim().length < 2
    ) {
      setStep(0);
      setSubmitError(
        "City is required."
      );
      return;
    }

    if (!values.professionalType) {
      setStep(1);
      setSubmitError(
        "Professional type is required."
      );
      return;
    }

    if (
      values.professionalType ===
        "Other" &&
      !values.professionalTypeOther?.trim()
    ) {
      setStep(1);
      setSubmitError(
        "Please enter your professional type."
      );
      return;
    }

    if (!values.specialization) {
      setStep(1);
      setSubmitError(
        "Specialization is required."
      );
      return;
    }

    if (
      values.specialization ===
        "Other" &&
      !values.specializationOther?.trim()
    ) {
      setStep(1);
      setSubmitError(
        "Please enter your specialization."
      );
      return;
    }

    if (
      values.experienceYears ===
        undefined ||
      values.experienceYears === null ||
      Number(values.experienceYears) < 0
    ) {
      setStep(1);
      setSubmitError(
        "Years of experience is required."
      );
      return;
    }

    if (
      !values.qualifications ||
      values.qualifications.length === 0
    ) {
      setStep(2);
      setSubmitError(
        "At least one qualification is required."
      );
      return;
    }

    if (
      !values.bio ||
      values.bio.trim().length < 50
    ) {
      setStep(3);
      setSubmitError(
        "Professional bio must be at least 50 characters."
      );
      return;
    }

    handleSubmit(onSubmit)();
  };

  const sections = [
    {
      title: "Basic Information",
      description:
        "Your personal details",
    },
    {
      title: "Professional Information",
      description:
        "Your work expertise",
    },
    {
      title: "Qualifications & Expertise",
      description:
        "Your skills and background",
    },
    {
      title: "About & Online Presence",
      description:
        "Tell us more about yourself",
    },
  ];

  if (!user) {
    return (
      <div className="text-center py-12">
        <p className="text-secondary-text">
          Please sign in to continue.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">

      {/* ─────────────────────────────
          PROGRESS
      ───────────────────────────── */}

      <div className="mb-10">
        <div className="flex items-center justify-between mb-4">
          {sections.map(
            (section, i) => (
              <div
                key={i}
                className="flex flex-col items-center gap-2 flex-1"
              >
                <button
                  type="button"
                  onClick={() =>
                    setStep(i)
                  }
                  className={cn(
                    "w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-colors",
                    i <= step
                      ? "bg-accent text-white"
                      : "bg-light-gray text-secondary-text"
                  )}
                >
                  {i < step ? (
                    <Check className="h-5 w-5" />
                  ) : (
                    i + 1
                  )}
                </button>

                <span
                  className={cn(
                    "text-xs font-medium hidden sm:block",
                    i <= step
                      ? "text-text"
                      : "text-secondary-text"
                  )}
                >
                  {section.title}
                </span>
              </div>
            )
          )}
        </div>

        <div className="h-1.5 bg-light-gray rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-accent rounded-full"
            initial={{ width: "0%" }}
            animate={{
              width: `${
                ((step + 1) /
                  sections.length) *
                100
              }%`,
            }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">

        {/* ─────────────────────────────
            STEP 0
        ───────────────────────────── */}

        {step === 0 && (
          <motion.div
            key="step0"
            initial={{
              opacity: 0,
              x: 20,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            exit={{
              opacity: 0,
              x: -20,
            }}
            className="space-y-6"
          >

            {/* Profile Photo */}

            <div>
              <label className="block text-sm font-semibold text-text mb-3">
                Profile Photo
              </label>

              <div className="flex items-center gap-4">
                <div className="relative w-24 h-24 rounded-2xl overflow-hidden bg-light-gray border border-border/50 shrink-0">

                  {profilePhoto ? (
                    <Image
                      src={profilePhoto}
                      alt="Profile"
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <User className="h-10 w-10 text-navy/20" />
                    </div>
                  )}

                </div>

                <div className="flex-1">
                  <ImageUpload
                    label=""
                    images={
                      profilePhoto
                        ? [profilePhoto]
                        : []
                    }
                    onChange={(urls) =>
                      setProfilePhoto(
                        urls[0] || ""
                      )
                    }
                    maxFiles={1}
                    folder="profile"
                    uid={user.uid}
                  />
                </div>
              </div>

              <p className="text-xs text-secondary-text/70 mt-2">
                Upload a professional photo.
                This will be visible to clients.
              </p>
            </div>

            {/* Full Name */}

            <div>
              <label className="block text-sm font-semibold text-text mb-2">
                Full Name{" "}
                <span className="text-red-500">
                  *
                </span>
              </label>

              <input
                {...register("displayName")}
                type="text"
                className={cn(
                  "w-full px-4 py-3 rounded-2xl border bg-white text-sm outline-none transition-colors",
                  errors.displayName
                    ? "border-red-300 focus:border-red-400"
                    : "border-border focus:border-accent"
                )}
                placeholder="Enter your full name"
              />

              {errors.displayName && (
                <p className="text-xs text-red-500 mt-1.5">
                  {errors.displayName.message}
                </p>
              )}
            </div>

            {/* Email */}

            <div>
              <label className="block text-sm font-semibold text-text mb-2">
                Email{" "}
                <span className="text-red-500">
                  *
                </span>
              </label>

              <input
                {...register("email")}
                type="email"
                readOnly
                className="w-full px-4 py-3 rounded-2xl border border-border bg-light-gray text-sm text-secondary-text cursor-not-allowed outline-none"
              />

              <p className="text-xs text-secondary-text mt-1.5">
                Linked to your Google account.
              </p>
            </div>

            {/* Phone */}

            <div>
              <label className="block text-sm font-semibold text-text mb-2">
                Phone Number{" "}
                <span className="text-red-500">
                  *
                </span>
              </label>

              <input
                {...register("phone")}
                type="tel"
                className={cn(
                  "w-full px-4 py-3 rounded-2xl border bg-white text-sm outline-none transition-colors",
                  errors.phone
                    ? "border-red-300 focus:border-red-400"
                    : "border-border focus:border-accent"
                )}
                placeholder="+91 98765 43210"
              />

              {errors.phone && (
                <p className="text-xs text-red-500 mt-1.5">
                  {errors.phone.message}
                </p>
              )}
            </div>

            {/* City */}

            <div>
              <label className="block text-sm font-semibold text-text mb-2">
                City{" "}
                <span className="text-red-500">
                  *
                </span>
              </label>

              <input
                {...register("city")}
                type="text"
                className={cn(
                  "w-full px-4 py-3 rounded-2xl border bg-white text-sm outline-none transition-colors",
                  errors.city
                    ? "border-red-300 focus:border-red-400"
                    : "border-border focus:border-accent"
                )}
                placeholder="e.g. Mumbai, Bangalore, Delhi"
              />

              {errors.city && (
                <p className="text-xs text-red-500 mt-1.5">
                  {errors.city.message}
                </p>
              )}
            </div>

          </motion.div>
        )}

        {/* ─────────────────────────────
            STEP 1
        ───────────────────────────── */}

        {step === 1 && (
          <motion.div
            key="step1"
            initial={{
              opacity: 0,
              x: 20,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            exit={{
              opacity: 0,
              x: -20,
            }}
            className="space-y-6"
          >

            {/* Professional Type */}

            <div>
              <label className="block text-sm font-semibold text-text mb-2">
                Professional Type{" "}
                <span className="text-red-500">
                  *
                </span>
              </label>

              <select
                {...register(
                  "professionalType",
                  {
                    onChange: () => {
                      setValue(
                        "specialization",
                        ""
                      );

                      setValue(
                        "specializationOther",
                        ""
                      );

                      setSubmitError(null);
                    },
                  }
                )}
                className={cn(
                  "w-full px-4 py-3 rounded-2xl border bg-white text-sm outline-none appearance-none transition-colors",
                  errors.professionalType
                    ? "border-red-300 focus:border-red-400"
                    : "border-border focus:border-accent"
                )}
              >
                <option value="">
                  Select your profession
                </option>

                {PROFESSIONAL_TYPES.map(
                  (type) => (
                    <option
                      key={type}
                      value={type}
                    >
                      {type}
                    </option>
                  )
                )}
              </select>

              {errors.professionalType && (
                <p className="text-xs text-red-500 mt-1.5">
                  {
                    errors.professionalType
                      .message
                  }
                </p>
              )}
            </div>

            {/* Custom Professional Type */}

            {selectedType === "Other" && (
              <motion.div
                initial={{
                  opacity: 0,
                  height: 0,
                  y: -8,
                }}
                animate={{
                  opacity: 1,
                  height: "auto",
                  y: 0,
                }}
                className="overflow-hidden"
              >
                <label className="block text-sm font-semibold text-text mb-2">
                  Enter Your Professional Type{" "}
                  <span className="text-red-500">
                    *
                  </span>
                </label>

                <input
                  {...register(
                    "professionalTypeOther"
                  )}
                  type="text"
                  className={cn(
                    "w-full px-4 py-3 rounded-2xl border bg-white text-sm outline-none transition-colors",
                    errors.professionalTypeOther
                      ? "border-red-300 focus:border-red-400"
                      : "border-border focus:border-accent"
                  )}
                  placeholder="e.g. Construction Safety Specialist"
                />

                {errors.professionalTypeOther && (
                  <p className="text-xs text-red-500 mt-1.5">
                    {
                      errors
                        .professionalTypeOther
                        .message
                    }
                  </p>
                )}
              </motion.div>
            )}

            {/* Specialization */}

            <div>
              <label className="block text-sm font-semibold text-text mb-2">
                Specialization{" "}
                <span className="text-red-500">
                  *
                </span>
              </label>

              <select
                {...register(
                  "specialization"
                )}
                disabled={!selectedType}
                className={cn(
                  "w-full px-4 py-3 rounded-2xl border bg-white text-sm outline-none appearance-none transition-colors",
                  errors.specialization
                    ? "border-red-300 focus:border-red-400"
                    : "border-border focus:border-accent",
                  !selectedType &&
                    "bg-light-gray cursor-not-allowed"
                )}
              >
                <option value="">
                  {selectedType
                    ? "Select specialization"
                    : "Choose profession first"}
                </option>

                {(
                  SPECIALIZATIONS[
                    selectedType
                  ] || []
                ).map((spec) => (
                  <option
                    key={spec}
                    value={spec}
                  >
                    {spec}
                  </option>
                ))}
              </select>

              {errors.specialization && (
                <p className="text-xs text-red-500 mt-1.5">
                  {
                    errors.specialization
                      .message
                  }
                </p>
              )}
            </div>

            {/* Custom Specialization */}

            {selectedSpecialization ===
              "Other" && (
              <motion.div
                initial={{
                  opacity: 0,
                  height: 0,
                  y: -8,
                }}
                animate={{
                  opacity: 1,
                  height: "auto",
                  y: 0,
                }}
                className="overflow-hidden"
              >
                <label className="block text-sm font-semibold text-text mb-2">
                  Enter Your Specialization{" "}
                  <span className="text-red-500">
                    *
                  </span>
                </label>

                <input
                  {...register(
                    "specializationOther"
                  )}
                  type="text"
                  className={cn(
                    "w-full px-4 py-3 rounded-2xl border bg-white text-sm outline-none transition-colors",
                    errors.specializationOther
                      ? "border-red-300 focus:border-red-400"
                      : "border-border focus:border-accent"
                  )}
                  placeholder="e.g. Green Building Consulting"
                />

                {errors.specializationOther && (
                  <p className="text-xs text-red-500 mt-1.5">
                    {
                      errors
                        .specializationOther
                        .message
                    }
                  </p>
                )}
              </motion.div>
            )}

            {/* Experience */}

            <div>
              <label className="block text-sm font-semibold text-text mb-2">
                Years of Experience{" "}
                <span className="text-red-500">
                  *
                </span>
              </label>

              <input
                {...register(
                  "experienceYears"
                )}
                type="number"
                min={0}
                max={60}
                className={cn(
                  "w-full px-4 py-3 rounded-2xl border bg-white text-sm outline-none transition-colors",
                  errors.experienceYears
                    ? "border-red-300 focus:border-red-400"
                    : "border-border focus:border-accent"
                )}
                placeholder="e.g. 5"
              />

              {errors.experienceYears && (
                <p className="text-xs text-red-500 mt-1.5">
                  {
                    errors
                      .experienceYears
                      .message
                  }
                </p>
              )}
            </div>

            {/* Organization */}

            <div>
              <label className="block text-sm font-semibold text-text mb-2">
                Current Organization / Practice
              </label>

              <input
                {...register(
                  "organization"
                )}
                type="text"
                className="w-full px-4 py-3 rounded-2xl border border-border bg-white text-sm outline-none focus:border-accent transition-colors"
                placeholder="Company name or Independent Practice"
              />
            </div>

          </motion.div>
        )}

        {/* ─────────────────────────────
            STEP 2
        ───────────────────────────── */}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{
              opacity: 0,
              x: 20,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            exit={{
              opacity: 0,
              x: -20,
            }}
            className="space-y-6"
          >
            <TagInput
              label={
                <>
                  Qualifications{" "}
                  <span className="text-red-500">
                    *
                  </span>
                </>
              }
              tags={qualifications}
              onChange={(tags) =>
                setValue(
                  "qualifications",
                  tags,
                  {
                    shouldValidate: true,
                  }
                )
              }
              placeholder="e.g. B.Tech Civil, MBA Construction..."
              error={
                errors.qualifications
                  ?.message
              }
            />

            <TagInput
              label="Certifications"
              tags={certifications}
              onChange={(tags) =>
                setValue(
                  "certifications",
                  tags
                )
              }
              placeholder="e.g. PMP, LEED AP, AutoCAD..."
            />

            <TagInput
              label="Areas of Expertise"
              tags={areasOfExpertise}
              onChange={(tags) =>
                setValue(
                  "areasOfExpertise",
                  tags
                )
              }
              placeholder="e.g. High-rise, Green Building, Renovation..."
            />
          </motion.div>
        )}

        {/* ─────────────────────────────
            STEP 3
        ───────────────────────────── */}

        {step === 3 && (
          <motion.div
            key="step3"
            initial={{
              opacity: 0,
              x: 20,
            }}
            animate={{
              opacity: 1,
              x: 0,
            }}
            exit={{
              opacity: 0,
              x: -20,
            }}
            className="space-y-6"
          >

            {/* Bio */}

            <div>
              <label className="block text-sm font-semibold text-text mb-2">
                Professional Bio{" "}
                <span className="text-red-500">
                  *
                </span>
              </label>

              <textarea
                {...register("bio")}
                rows={5}
                className={cn(
                  "w-full px-4 py-3 rounded-2xl border bg-white text-sm outline-none resize-none transition-colors",
                  errors.bio
                    ? "border-red-300 focus:border-red-400"
                    : "border-border focus:border-accent"
                )}
                placeholder="Describe your experience, approach, and what makes you stand out..."
              />

              <div className="flex justify-between mt-1.5">
                {errors.bio ? (
                  <p className="text-xs text-red-500">
                    {errors.bio.message}
                  </p>
                ) : (
                  <span />
                )}

                <p className="text-xs text-secondary-text">
                  Min 50 characters
                </p>
              </div>
            </div>

            {/* Portfolio Photos */}

            <ImageUpload
              label="Work Portfolio Photos"
              images={portfolioPhotos}
              onChange={
                setPortfolioPhotos
              }
              maxFiles={8}
              folder="portfolio"
              uid={user.uid}
            />

            {/* LinkedIn */}

            <div>
              <label className="block text-sm font-semibold text-text mb-2">
                LinkedIn URL
              </label>

              <input
                {...register(
                  "linkedinUrl"
                )}
                type="url"
                className={cn(
                  "w-full px-4 py-3 rounded-2xl border bg-white text-sm outline-none transition-colors",
                  errors.linkedinUrl
                    ? "border-red-300 focus:border-red-400"
                    : "border-border focus:border-accent"
                )}
                placeholder="https://linkedin.com/in/yourprofile"
              />

              {errors.linkedinUrl && (
                <p className="text-xs text-red-500 mt-1.5">
                  {
                    errors.linkedinUrl
                      .message
                  }
                </p>
              )}
            </div>

            {/* Portfolio URL */}

            <div>
              <label className="block text-sm font-semibold text-text mb-2">
                Portfolio / Website URL
              </label>

              <input
                {...register(
                  "portfolioUrl"
                )}
                type="url"
                className={cn(
                  "w-full px-4 py-3 rounded-2xl border bg-white text-sm outline-none transition-colors",
                  errors.portfolioUrl
                    ? "border-red-300 focus:border-red-400"
                    : "border-border focus:border-accent"
                )}
                placeholder="https://yourportfolio.com"
              />

              {errors.portfolioUrl && (
                <p className="text-xs text-red-500 mt-1.5">
                  {
                    errors.portfolioUrl
                      .message
                  }
                </p>
              )}
            </div>

          </motion.div>
        )}

      </AnimatePresence>

      {/* ─────────────────────────────
          ERROR
      ───────────────────────────── */}

      <AnimatePresence>
        {submitError && (
          <motion.div
            initial={{
              opacity: 0,
              y: -8,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -8,
            }}
            className="mt-6 p-4 rounded-2xl bg-red-50 border border-red-200 flex items-start gap-3"
          >
            <AlertCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />

            <p className="text-sm text-red-700">
              {submitError}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─────────────────────────────
          NAVIGATION
      ───────────────────────────── */}

      <div className="flex items-center justify-between mt-10">

        <Button
          type="button"
          variant="ghost"
          onClick={() =>
            setStep((s) =>
              Math.max(0, s - 1)
            )
          }
          disabled={step === 0}
        >
          Back
        </Button>

        {step < sections.length - 1 ? (
          <Button
            type="button"
            onClick={() => {
              setSubmitError(null);

              setStep((s) => s + 1);
            }}
            className="group"
          >
            Next

            <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-0.5 transition-transform" />
          </Button>
        ) : (
          <Button
            type="button"
            onClick={handleFinalSubmit}
            isLoading={submitting}
            className="group"
          >
            {submitting
              ? "Saving..."
              : "Complete Profile"}

            {!submitting && (
              <Check className="h-4 w-4 ml-2" />
            )}
          </Button>
        )}

      </div>
    </div>
  );
}