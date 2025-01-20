import React from "react";
import { Doc } from "../../../../../convex/_generated/dataModel";
import WorkspaceItem from "@/components/global/dashboard/WorkspaceItem";
import { Separator } from "@/components/ui/separator";
import WorkspaceFields from "./WorkspaceFields";
import WorkspaceViews from "./WorkspaceViews";
import WorkspaceBoards from "./WorkspaceBoards";

type Props = {
  workspace: Doc<"workspaces">;
};

const LeftSidebar = ({ workspace }: Props) => {
  return (
    <div
      className={`flex flex-col gap-2 w-[300px] transition-all ease-linear min-h-screen border-r border-r-primary-dark overflow-y-auto`}
    >
      <WorkspaceItem workspaceName={workspace.name} className="mt-4 mb-2" />

      <Separator className="h-[1px] w-full bg-primary-dark" />
      <div className="flex flex-col gap-5">
        <WorkspaceFields workspace={workspace} />
        <WorkspaceViews workspace={workspace} />
        <WorkspaceBoards />
      </div>
    </div>
  );
};

export default LeftSidebar;
