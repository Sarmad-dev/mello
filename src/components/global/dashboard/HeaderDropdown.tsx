"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import React from "react";

type Props = {
  title: "Workspace" | "Starred";
  children: React.ReactNode;
};

const HeaderDropdown = ({ title, children }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="focus-visible:ring-0">
        <Button
          variant="outline"
          className="flex items-center gap-2 bg-transparent text-primary-light dark:text-primary-dark border-none rounded-sm"
        >
          <span>{title}</span>
          <ChevronDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className={cn(
          "w-[300px]",
          title === "Workspace" ? "ml-[50px]" : "ml-[170px]"
        )}
      >
        <DropdownMenuGroup>{children}</DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default HeaderDropdown;
