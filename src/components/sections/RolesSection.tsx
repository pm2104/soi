"use client";

import RoleCard from "@/components/cards/RoleCard";
import SectionHeading from "@/components/ui/SectionHeading";

export default function RolesSection() {
  return (
    <section className="py-20 md:py-28 bg-light-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Every Role. One Platform."
          subtitle="Whether you're looking to hire or get hired, SOI has you covered with tailored experiences for every user type."
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          <RoleCard type="client" index={0} />
          <RoleCard type="professional" index={1} />
        </div>
      </div>
    </section>
  );
}