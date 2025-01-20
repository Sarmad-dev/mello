"use client"
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import React from "react";

type Props = {
  title: string;
  children: React.ReactNode
};

const HeaderDropdown = ({ title, children }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="focus-visible:ring-0">
        <Button variant="outline" className="flex items-center gap-2 bg-transparent text-primary-light dark:text-primary-dark border-none rounded-sm">
          <span>{title}</span>
          <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[300px] ml-[130px]">
        <DropdownMenuGroup>
            {children}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default HeaderDropdown;
