import React from "react";
import { Id } from "../../../../../../../../convex/_generated/dataModel";
import { currentUser } from "@clerk/nextjs/server";
import { fetchQuery } from "convex/nextjs";
import { api } from "../../../../../../../../convex/_generated/api";
import { Lock, Unlock, UserPlus } from "lucide-react";
import InviteWorkspaceMembersDialog from "../boards/_components/InviteWorkspaceMembersDialog";
import { Button } from "@/components/ui/button";

type InviteMemberToWorkspaceProps = {
  workspaceId: Id<"workspaces">;
};

const InviteMemberToWorkspace = async ({
  workspaceId,
}: InviteMemberToWorkspaceProps) => {
  const clerkUser = await currentUser();
  const loggedInUser = await fetchQuery(api.users.getUserByClerkId, {
    clerkId: clerkUser?.id as string,
  });

  const workspace = await fetchQuery(api.workspaces.getWorkspaceById, {
    workspaceId: workspaceId as Id<"workspaces">,
  });

  const workspaceSettings = await fetchQuery(
    api.workspaceSettings.getWorkspaceSettingsByWorkspaceId,
    { workspaceId: workspace?._id as Id<"workspaces"> }
  );
  return (
    <div className="flex gap-40 py-8 items-center justify-center">
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <div className="w-14 h-14 rounded-md text-white flex items-center justify-center text-2xl bg-gradient-to-r from-orange-400 to-red-400">
            <span>{workspace?.name.charAt(0)}</span>
          </div>
          <div className="flex flex-col justify-center text-white">
            <h2 className="font-semibold">{workspace?.name}</h2>
            <p className="flex gap-1 items-center">
              {workspaceSettings?.visibility === "private" ? (
                <Lock height={15} width={15} />
              ) : (
                <Unlock height={15} width={15} />
              )}
              <span className="text-sm">{workspaceSettings?.visibility}</span>
            </p>
          </div>
        </div>
        <p className="text-sm w-[450px]">{workspace?.description}</p>
      </div>

      {workspace?.admin === loggedInUser && (
        <InviteWorkspaceMembersDialog
          workspaceId={workspaceId as Id<"workspaces">}
        >
          <Button className="rounded-sm bg-blue-500 hover:bg-blue-500/90">
            <UserPlus />
            <span>Invite Workspace Members</span>
          </Button>
        </InviteWorkspaceMembersDialog>
      )}
    </div>
  );
};

export default InviteMemberToWorkspace;
