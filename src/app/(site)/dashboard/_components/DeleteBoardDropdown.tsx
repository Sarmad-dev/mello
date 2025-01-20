import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import React from "react";
import { Doc } from "../../../../../convex/_generated/dataModel";
import DeleteBoardDialog from "./DeleteBoardDialog";
import { Button } from "@/components/ui/button";

const DeleteBoardDropdown = ({
  children,
  board,
}: {
  children: React.ReactNode;
  board: Doc<"boards">;
}) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-[300px]" side="right">
        <DropdownMenuLabel className="mx-auto">
          <span>{board.title}</span>
        </DropdownMenuLabel>

        <DeleteBoardDialog board={board}>
          <Button className="w-full bg-red-500 text-white cursor-pointer hover:bg-red-400">
            Delete Board
          </Button>
        </DeleteBoardDialog>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DeleteBoardDropdown;
