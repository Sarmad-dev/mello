import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { updateCardProps } from "@/lib/types";
import React from "react";
import { Doc } from "../../../../../../../../../../convex/_generated/dataModel";
import { Labels } from "@/lib/constants";
import Label from "./Label";

type Props = {
  card: Doc<"cards">;
  handleCardLabelsUpdate: ({
    description,
    background_color,
    label,
    watch,
  }: updateCardProps) => void;
  children: React.ReactNode;
};

const LabelDropdown = ({ card, handleCardLabelsUpdate, children }: Props) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-[350px]" side="right">
        <DropdownMenuLabel className="w-full flex items-center justify-center font-normal text-sm">
          Labels
        </DropdownMenuLabel>
        <div className="w-full flex flex-col items-center gap-3">
          {Labels.map((label) => (
            <Label
              key={label.title}
              card={card}
              label={label}
              handleCardLabelsUpdate={handleCardLabelsUpdate}
            />
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default LabelDropdown;
