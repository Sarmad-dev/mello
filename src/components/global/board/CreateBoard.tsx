import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import CreateBoardForm from './CreateBoardForm';
import React from "react";

const CreateBoard = ({ children }: { children: React.ReactNode }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent side="right">
        <CreateBoardForm />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CreateBoard;
