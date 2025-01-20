"use client";

import { usePathname } from "next/navigation";
import React from "react";
import { Doc } from "../../../../convex/_generated/dataModel";
import { DropdownMenuLabel } from "@/components/ui/dropdown-menu";
import WorkspaceItem from "./WorkspaceItem";

const ActiveWorkspace = ({
  workspaces,
}: {
  workspaces: Doc<"workspaces">[];
}) => {
  const pathname = usePathname();
  const activeWorkspace = workspaces?.find((workspace) =>
    pathname.includes(workspace._id)
  );
  return (
    <>
      {activeWorkspace && (
        <>
          <DropdownMenuLabel className="text-primary-dark text-xs">
            Current workspace
          </DropdownMenuLabel>

          <WorkspaceItem workspaceName={activeWorkspace.name} />
        </>
      )}
    </>
  );
};

export default ActiveWorkspace;
