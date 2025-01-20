"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import React, { useState } from "react";

const DashboardHeaderSearchInput = () => {
  const [searchWidth, setSearchWidth] = useState("w-[250px]");
  return (
    <div
      className={`flex items-center gap-0 px-1 border border-primary-light dark:border-primary-dark rounded-sm ${searchWidth} transition-all duration-200 ease-linear`}
    >
      <Search className="text-primary-light dark:text-primary-dark" />
      <Input
        className="text-primary-light dark:text-primary-dark border-none  focus-visible:ring-0"
        type="text"
        placeholder="Search..."
        onFocus={() => {
          setSearchWidth("w-[550px]");
        }}
        onBlur={() => {
          setSearchWidth("w-[250px]");
        }}
      />
    </div>
  );
};

export default DashboardHeaderSearchInput;
