// *********************
// Role of the component: Category Item that will display category icon, category name and link to the category
// Name of the component: CategoryItem.tsx
// Developer: Aleksandar Kuzmanovic
// Version: 1.0
// Component call: <CategoryItem title={title} href={href} ><Image /></CategoryItem>
// Input parameters: CategoryItemProps interface
// Output: Category icon, category name and link to the category
// *********************

import Link from "next/link";
import React, { type ReactNode } from "react";

interface CategoryItemProps {
  title: string;
  href: string;
  image: string;
}

const CategoryItem = ({ title, href, image }: CategoryItemProps) => {


 const style = {
  backgroundImage: `url('${image}')`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
};

return (
  <Link href={href}>
    <div
      style={style}
      className="h-[100px] cursor-pointer bg-white hover:bg-gray-100"
    >
      <div className="flex flex-col h-full w-full bg-black py-5 items-center bg-opacity-70 text-white">
        <h3 className="font-semibold text-xl">{title}</h3>
      </div>
    </div>
  </Link>
);
};

export default CategoryItem;
