"use client";
import React from "react";
import { Doc } from "../../../../../../../../../convex/_generated/dataModel";
import { Earth, Lock } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { BoardCreation, BoardDeletion } from "@/lib/constants";
import { toast } from "sonner";
import {
  changeWorkspaceBoardCreation,
  changeWorkspaceBoardDeletion,
} from "@/actions/action";

type Props = {
  workspacesSettings: Doc<"workspaceSettings">;
};

const BoardDeletionDropdown = ({ workspacesSettings }: Props) => {
  const handleBoardDeletionChange = async (value: "admin" | "member") => {
    try {
      await changeWorkspaceBoardDeletion({
        workspaceSettingId: workspacesSettings._id,
        boardDeletion: value,
        path: `/dashboard/workspace/${workspacesSettings.workspace}/settings`,
      });

      toast.success(`Board deletion change to ${value}`);
    } catch (error) {
      throw new Error("Something went wrong");
    }
  };
  return (
    <div className="flex flex-col gap-2">
      <h4 className="font-semibold">Board Deletion Restriction</h4>

      <div className="flex justify-between w-full">
        <p className="flex items-center gap-1">
          {workspacesSettings.delete_board === "admin" ? (
            <Lock width={15} height={15} color="red" />
          ) : (
            <Earth width={15} height={15} color="green" />
          )}
          <span className="text-sm">
            {workspacesSettings.delete_board === "admin"
              ? "Private – Only admin can delete boards."
              : "Public - Any member can delete boards"}
          </span>
        </p>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="rounded-sm bg-white/10 hover:bg-white/20 text-white">
              Change
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[250px] text-primary-dark">
            <DropdownMenuLabel className="text-center">
              Change Board Deletion
            </DropdownMenuLabel>
            {BoardDeletion.map((boardDeletion) => (
              <DropdownMenuItem
                key={boardDeletion.value}
                onSelect={() => handleBoardDeletionChange(boardDeletion.value)}
              >
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <boardDeletion.icon
                      width={15}
                      height={15}
                      color={boardDeletion.value === "admin" ? "red" : "green"}
                    />
                    <p>{boardDeletion.title}</p>
                  </div>
                  <p className="text-sm">{boardDeletion.description}</p>
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default BoardDeletionDropdown;
