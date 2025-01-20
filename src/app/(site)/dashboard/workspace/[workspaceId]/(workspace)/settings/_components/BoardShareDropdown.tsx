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
import { BoardSharing, Visibility } from "@/lib/constants";
import { toast } from "sonner";
import {
  changeWorkspaceBoardSharing,
} from "@/actions/action";

type Props = {
  workspacesSettings: Doc<"workspaceSettings">;
};

const BoardSharingDropdown = ({ workspacesSettings }: Props) => {
  const handleVBoardSharing = async (value: "admin" | "member") => {
    try {
      await changeWorkspaceBoardSharing({
        workspaceSettingId: workspacesSettings._id,
        boardSharing: value,
        path: `/dashboard/workspace/${workspacesSettings.workspace}/settings`,
      });

      toast.success(`Board Sharing change to ${value}`);
    } catch (error) {
      throw new Error("Something went wrong");
    }
  };
  return (
    <div className="flex flex-col gap-2">
      <h4 className="font-semibold">Share Board Restriction</h4>

      <div className="flex justify-between w-full">
        <p className="flex items-center gap-1">
          {workspacesSettings.share_board === "admin" ? (
            <Lock width={15} height={15} color="red" />
          ) : (
            <Earth width={15} height={15} color="green" />
          )}
          <span className="text-sm">
            {workspacesSettings.share_board === "admin"
              ? "Private – Only admin can share board in this workspace"
              : "Public - All members can share board in this workspace"}
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
              Change Board Sharing
            </DropdownMenuLabel>
            {BoardSharing.map((sharing) => (
              <DropdownMenuItem
                key={sharing.value}
                onSelect={() => handleVBoardSharing(sharing.value)}
              >
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <sharing.icon
                      width={15}
                      height={15}
                      color={sharing.value === "admin" ? "red" : "green"}
                    />
                    <p>{sharing.title}</p>
                  </div>
                  <p className="text-sm">{sharing.description}</p>
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default BoardSharingDropdown;
