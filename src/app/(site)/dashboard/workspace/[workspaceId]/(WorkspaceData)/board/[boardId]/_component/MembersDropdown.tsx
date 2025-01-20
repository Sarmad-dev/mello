import React from "react";
import { Doc } from "../../../../../../../../../../convex/_generated/dataModel";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Member from "./Member";
import CardMemberInvite from "@/components/global/invite/CardMemberInvite";

type Props = {
  card: Doc<"cards">;
  children: React.ReactNode;
};

const MembersDropdown = ({ card, children }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-[350px]" side="right">
        <DropdownMenuLabel>Card Members</DropdownMenuLabel>
        <DropdownMenuGroup>
          {card?.members &&
            card?.members.length > 0 &&
            card?.members.map((memberId) => (
              <Member memberId={memberId} key={memberId} />
            ))}
        </DropdownMenuGroup>
        <DropdownMenuLabel className="mt-3 text-sm font-normal">
          Invite Members
        </DropdownMenuLabel>
        <DropdownMenuGroup>
          <CardMemberInvite />
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default MembersDropdown;
