import React from "react";
import HeaderDropdown from "./HeaderDropdown";
import {
  DropdownMenuItem,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu";
import { api } from "../../../../convex/_generated/api";
import Link from "next/link";
import WorkspaceItem from "./WorkspaceItem";
import ActiveWorkspace from "./ActiveWorkspace";
import { currentUser } from "@clerk/nextjs/server";
import { fetchQuery } from "convex/nextjs";

const WorkspaceDropdown = async () => {
  const user = await currentUser();
  const workspaces = await fetchQuery(api.workspaces.getUserWorkspaces, {
    clerkId: user?.id as string,
  });

  return (
    <HeaderDropdown title="Workspace">
      <>
        <ActiveWorkspace workspaces={workspaces!} />
        <DropdownMenuLabel className="text-primary-dark text-sm">
          Your workspaces
        </DropdownMenuLabel>
        {workspaces?.map((workspace) => (
          <DropdownMenuItem key={workspace._id} asChild>
            <Link href={`/dashboard/workspace/${workspace._id}/boards`}>
              <WorkspaceItem workspaceName={workspace.name} />
            </Link>
          </DropdownMenuItem>
        ))}
      </>
    </HeaderDropdown>
  );
};

export default WorkspaceDropdown;
