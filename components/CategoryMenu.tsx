"use client";

import React, { useRef, useEffect } from "react";
import CategoryItem from "./CategoryItem";
import { categoryMenuList } from "@/lib/utils";

const CategoryMenu = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Duplicate the categoryMenuList to simulate the infinite scroll
  const duplicatedList = categoryMenuList.concat(categoryMenuList);

  useEffect(() => {
    const scrollContainer = scrollRef.current;

    // Function to handle infinite scroll behavior
    const handleScroll = () => {
      if (scrollContainer) {
        const scrollWidth = scrollContainer.scrollWidth / 2;

        // If scrolled past the original items, jump back to the start of the original items
        if (scrollContainer.scrollLeft >= scrollWidth) {
          scrollContainer.scrollLeft = 0;
        }

        // If scrolled back before the original items, jump to the end of the original items
        if (scrollContainer.scrollLeft === 0) {
          scrollContainer.scrollLeft = scrollWidth;
        }
      }
    };

    // Attach scroll event listener
    if (scrollContainer) {
      scrollContainer.addEventListener("scroll", handleScroll);

      // Set initial scroll position to the start of the second set (for smooth loop)
      scrollContainer.scrollLeft = scrollContainer.scrollWidth / 2;
    }

    return () => {
      // Clean up the event listener
      if (scrollContainer) {
        scrollContainer.removeEventListener("scroll", handleScroll);
      }
    };
  }, []);

  return (
    <div className="py-10 mt-10 bg-black">
      <h2 className="text-white text-7xl font-extrabold text-center mt-10 max-lg:text-5xl">
        TOP <span className="text-yellow-500">CATEGORIES</span>
      </h2>

      {/* Original Grid Layout: Shown on larger screens (desktop/tablet) */}
      <div className="hidden md:grid max-w-screen-2xl mx-auto py-10 gap-x-5 px-16 gap-y-5 grid-cols-5 max-lg:grid-cols-3 max-md:grid-cols-2 max-[450px]:grid-cols-1">
        {categoryMenuList.map((item) => (
          <CategoryItem
            title={item.title}
            key={item.id}
            href={item.href}
            image={item.src}
          />
        ))}
      </div>

      {/* Mobile View: Horizontal Scroll with Infinite Loop */}
      <div
        className="relative overflow-x-auto md:hidden py-5 px-5"
        ref={scrollRef}
      >
        <div className="flex flex-nowrap space-x-5 animate-scroll">
          {duplicatedList.map((item, index) => (
            <div
              key={`${item.id}-${index}`} // Ensure unique key for each duplicated item
              className="flex-shrink-0 w-[250px]" // Fixed width for items
            >
              <CategoryItem
                title={item.title}
                href={item.href}
                image={item.src}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryMenu;
