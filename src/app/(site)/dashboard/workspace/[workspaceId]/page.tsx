import InviteForm from "@/components/global/invite/InviteForm";
import React from "react";
import { Id } from "../../../../../../convex/_generated/dataModel";

type WorkspacePageProps = {
  params: Promise<{ workspaceId: string }>;
};

const Workspace = async ({ params }: WorkspacePageProps) => {
  const { workspaceId } = await params;
  return (
    <div>
      <h1>{workspaceId}</h1>
      <InviteForm workspaceId={workspaceId as Id<"workspaces">} />
    </div>
  );
};

export default Workspace;
