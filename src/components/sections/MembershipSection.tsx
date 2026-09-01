"use client";

import { MEMBERSHIP_TIERS } from "@/lib/constants";
import MembershipCard from "@/components/cards/MembershipCard";
import SectionHeading from "@/components/ui/SectionHeading";

export default function MembershipSection() {
  return (
    <section id="membership" className="py-20 md:py-28 bg-light-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Choose Your Membership"
          subtitle="Flexible plans designed to meet your needs. Start free and upgrade as you grow."
        />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-center">
          {MEMBERSHIP_TIERS.map((tier, index) => (
            <MembershipCard
              key={tier.name}
              name={tier.name}
              badge={tier.badge}
              price={tier.price}
              description={tier.description}
              features={tier.features}
              cta={tier.cta}
              highlighted={tier.highlighted}
              index={index}
              href={tier.url}
            />
          ))}
        </div>
      </div>
    </section>
  );
}