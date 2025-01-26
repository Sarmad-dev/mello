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
import { Visibility } from "@/lib/constants";
import { toast } from "sonner";
import { changeWorkspaceVisibility } from "@/actions/action";
import { ConvexError } from "convex/values";

type Props = {
  workspacesSettings: Doc<"workspaceSettings">;
};

const VisibilityDropdown = ({ workspacesSettings }: Props) => {
  const handleVisibilityChange = async (value: "public" | "private") => {
    try {
      await changeWorkspaceVisibility({
        workspaceSettingId: workspacesSettings._id,
        visibility: value,
        path: `/dashboard/workspace/${workspacesSettings.workspace}/settings`,
      });

      toast.success(`Visibility change to ${value}`);
    } catch (error) {
      if (error instanceof ConvexError)
        throw new Error(`Something went wrong: ${error.message}`);
    }
  };

  return (
    <div className="flex flex-col gap-2">
      <h4 className="font-semibold">Workspace Visibility</h4>

      <div className="flex justify-between w-full">
        <p className="flex items-center gap-1">
          {workspacesSettings.visibility === "private" ? (
            <Lock width={15} height={15} color="red" />
          ) : (
            <Earth width={15} height={15} color="green" />
          )}
          <span className="text-sm">
            {workspacesSettings.visibility === "private"
              ? "Private – This Workspace is private. It's not indexed or visible to those outside the Workspace."
              : "Public - This workspace is public. It is visible to those outside workspace"}
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
              Select workspace visibility
            </DropdownMenuLabel>
            {Visibility.map((visibility) => (
              <DropdownMenuItem
                key={visibility.value}
                onSelect={() => handleVisibilityChange(visibility.value)}
              >
                <div className="flex flex-col gap-1">
                  <div className="flex items-center gap-2">
                    <visibility.icon
                      width={15}
                      height={15}
                      color={visibility.value === "private" ? "red" : "green"}
                    />
                    <p>{visibility.title}</p>
                  </div>
                  <p className="text-sm">{visibility.description}</p>
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default VisibilityDropdown;
