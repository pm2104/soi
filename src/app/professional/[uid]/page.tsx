import ProfessionalProfileClient from "@/components/marketplace/ProfessionalProfileClient";

export function generateStaticParams() {
  return [{ uid: "placeholder" }];
}

interface PageProps {
  params: Promise<{ uid: string }>;
}

export default async function Page({ params }: PageProps) {
  const { uid } = await params;
  return <ProfessionalProfileClient uid={uid} />;
}