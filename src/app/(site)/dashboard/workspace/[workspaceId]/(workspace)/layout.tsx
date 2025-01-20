import React, { Suspense } from "react";
import { Id } from "../../../../../../../convex/_generated/dataModel";
import InviteMemberToWorkspace from "./_components/InviteMemberToWorkspace";
import InviteMemberToWorkspaceLoading from "./_components/InviteMemberToWorkspaceLoading";

type Props = {
  children: React.ReactNode;
  params: Promise<{ workspaceId: string }>;
};

const WorkspaceLayout = async ({ children, params }: Props) => {
  const { workspaceId } = await params;

  return (
    <main className="flex-1 flex flex-col gap-8">
      <Suspense fallback={<InviteMemberToWorkspaceLoading />}>
        <InviteMemberToWorkspace
          workspaceId={workspaceId as Id<"workspaces">}
        />
      </Suspense>

      <div>{children}</div>
    </main>
  );
};

export default WorkspaceLayout;
