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
import { BoardCreation } from "@/lib/constants";
import { toast } from "sonner";
import { changeWorkspaceBoardCreation } from "@/actions/action";
import { ConvexError } from "convex/values";

type Props = {
  workspacesSettings: Doc<"workspaceSettings">;
};

const BoardCreationDropdown = ({ workspacesSettings }: Props) => {
  const handleBoardCreationChange = async (value: "admin" | "member") => {
    try {
      await changeWorkspaceBoardCreation({
        workspaceSettingId: workspacesSettings._id,
        boardCreation: value,
        path: `/dashboard/workspace/${workspacesSettings.workspace}/settings`,
      });

      toast.success(`Board Creation change to ${value}`);
    } catch (error) {
      if (error instanceof ConvexError)
        throw new Error(`Something went wrong: ${error.message}`);
    }
  };
  return (
    <div className="flex flex-col gap-2">
      <h4 className="font-semibold">Board Creation Restriction</h4>

      <div className="flex justify-between w-full">
        <p className="flex items-center gap-1">
          {workspacesSettings.create_board === "admin" ? (
            <Lock width={15} height={15} color="red" />
          ) : (
            <Earth width={15} height={15} color="green" />
          )}
          <span className="text-sm">
            {workspacesSettings.create_board === "admin"
              ? "Private – Only admin can create boards."
              : "Public - Any member can create boards"}
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
              Change Board Creation
            </DropdownMenuLabel>
            {BoardCreation.map((boardCreation) => (
              <DropdownMenuItem
                key={boardCreation.value}
                onSelect={() => handleBoardCreationChange(boardCreation.value)}
              >
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <boardCreation.icon
                      width={15}
                      height={15}
                      color={boardCreation.value === "admin" ? "red" : "green"}
                    />
                    <p>{boardCreation.title}</p>
                  </div>
                  <p className="text-sm">{boardCreation.description}</p>
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default BoardCreationDropdown;
