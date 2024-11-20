"use client";
import { UserOrders } from "@/components";
import React from "react";

const DashboardOrdersPage = () => {
  return (
    <div className="bg-white flex justify-start max-w-screen-2xl mx-auto h-full max-xl:flex-col max-xl:h-fit">
      <UserOrders />
    </div>
  );
};

export default DashboardOrdersPage;
