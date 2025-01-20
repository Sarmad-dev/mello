import { fetchQuery } from "convex/nextjs";
import React from "react";
import { api } from "../../../../../../../../convex/_generated/api";
import { Id } from "../../../../../../../../convex/_generated/dataModel";
import VisibilityDropdown from "./_components/VisibilityDropdown";
import BoardCreationDropdown from "./_components/BoardCreationDropdown";
import { Separator } from "@/components/ui/separator";
import BoardDeletionDropdown from "./_components/DeleteBoardDropdown";
import BoardSharingDropdown from "./_components/BoardShareDropdown";
import { currentUser } from "@clerk/nextjs/server";

type Props = {
  params: Promise<{ workspaceId: string }>;
};

const Settings = async ({ params }: Props) => {
  const { workspaceId } = await params;
  const workspaceSettings = await fetchQuery(
    api.workspaceSettings.getWorkspaceSettingsByWorkspaceId,
    { workspaceId: workspaceId as Id<"workspaces"> }
  );

  const clerkUser = await currentUser();
  const loggedInUser = await fetchQuery(api.users.getUserByClerkId, {
    clerkId: clerkUser?.id as string,
  });

  const workspace = await fetchQuery(api.workspaces.getWorkspaceById, {
    workspaceId: workspaceId as Id<"workspaces">,
  });

  if (workspace?.admin !== loggedInUser) {
    return (
      <div className="w-[650px] mx-auto flex flex-col gap-1 items-center">
        <h1 className="font-semibold text-2xl">Unauthorized</h1>
        <p className="text-center">
          As you are not the admin of this workspace, You are not authorized to
          change settings of this workspace
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-10 mx-72 max-xl:mx-96">
      <h3 className="text-lg font-semibold">Workspace Settings</h3>

      <div className="flex flex-col gap-3">
        <VisibilityDropdown workspacesSettings={workspaceSettings!} />
        <Separator />
        <BoardCreationDropdown workspacesSettings={workspaceSettings!} />
        <Separator />
        <BoardDeletionDropdown workspacesSettings={workspaceSettings!} />
        <Separator />
        <BoardSharingDropdown workspacesSettings={workspaceSettings!} />
      </div>
    </div>
  );
};

export default Settings;
