import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React, { useState } from "react";
import CardMemberInvite from "./CardMemberInvite";

type InviteMembersProps = {
  children: React.ReactNode;
  className?: string;
};

const InviteMembersDropdown = ({ children, className }: InviteMembersProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className={className}>
        <DropdownMenuLabel>Invite Members</DropdownMenuLabel>
        <CardMemberInvite />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default InviteMembersDropdown;
