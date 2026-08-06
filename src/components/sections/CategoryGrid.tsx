"use client";

import { CATEGORIES } from "@/lib/constants";
import CategoryCard from "@/components/cards/CategoryCard";
import SectionHeading from "@/components/ui/SectionHeading";

export default function CategoryGrid() {
  return (
    <section id="categories" className="py-20 md:py-28 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          title="Find Professionals by Category"
          subtitle="Browse through our comprehensive network of verified construction experts across India"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {CATEGORIES.map((category, index) => (
            <CategoryCard
              key={category.name}
              name={category.name}
              icon={category.icon}
              description={category.description}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}