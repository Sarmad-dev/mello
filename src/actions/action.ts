"use server";

import { fetchMutation, fetchQuery } from "convex/nextjs";
import { api } from "../../convex/_generated/api";
import { Id } from "../../convex/_generated/dataModel";
import { revalidatePath } from "next/cache";

export const getWorkspaceMembers = async ({
  workspaceId,
}: {
  workspaceId: Id<"workspaces">;
}) => {
  try {
    const members = await fetchQuery(api.workspaces.getWorkspaceMembers, {
      workspaceId: workspaceId as Id<"workspaces">,
    });

    return members;
  } catch (error) {
    throw new Error("Something went wrong");
  }
};

export const getWorkspace = async ({
  workspaceId,
}: {
  workspaceId: Id<"workspaces">;
}) => {
  try {
    const workspace = await fetchQuery(api.workspaces.getWorkspaceById, {
      workspaceId: workspaceId as Id<"workspaces">,
    });

    return workspace;
  } catch (error) {
    throw new Error("Something went wrong");
  }
};

export const removeMemberFromWorkspace = async ({
  workspaceId,
  memberId,
  path,
}: {
  workspaceId: Id<"workspaces">;
  memberId: Id<"users">;
  path: string;
}) => {
  try {
    await fetchMutation(api.workspaces.removeWOrkspaceMember, {
      workspaceId: workspaceId,
      memberId: memberId,
    });

    revalidatePath(path);
  } catch (error) {
    throw new Error("Something went wrong");
  }
};

export const addMemberFromWorkspace = async ({
  workspaceId,
  memberId,
  path,
}: {
  workspaceId: Id<"workspaces">;
  memberId: Id<"users">;
  path: string;
}) => {
  try {
    await fetchMutation(api.workspaces.updateMemebrsInWorkspace, {
      workspaceId: workspaceId,
      memberId: memberId,
    });

    revalidatePath(path);
  } catch (error) {
    throw new Error("Something went wrong");
  }
};

export const changeWorkspaceVisibility = async ({
  workspaceSettingId,
  visibility,
  path,
}: {
  workspaceSettingId: Id<"workspaceSettings">;
  visibility: "private" | "public";
  path: string;
}) => {
  try {
    await fetchMutation(api.workspaceSettings.changeWorkspaceVisibility, {
      workspaceSettingId: workspaceSettingId,
      visibility: visibility,
    });

    revalidatePath(path);
  } catch (error) {
    throw new Error("Something went wrong");
  }
};

export const changeWorkspaceBoardCreation = async ({
  workspaceSettingId,
  boardCreation,
  path,
}: {
  workspaceSettingId: Id<"workspaceSettings">;
  boardCreation: "admin" | "member";
  path: string;
}) => {
  try {
    await fetchMutation(api.workspaceSettings.changeWorkspaceBoardCreation, {
      workspaceSettingId: workspaceSettingId,
      create_board: boardCreation,
    });

    revalidatePath(path);
  } catch (error) {
    throw new Error("Something went wrong");
  }
};

export const changeWorkspaceBoardDeletion = async ({
  workspaceSettingId,
  boardDeletion,
  path,
}: {
  workspaceSettingId: Id<"workspaceSettings">;
  boardDeletion: "admin" | "member";
  path: string;
}) => {
  try {
    await fetchMutation(api.workspaceSettings.changeWorkspaceBoardDeletion, {
      workspaceSettingId: workspaceSettingId,
      delete_board: boardDeletion,
    });

    revalidatePath(path);
  } catch (error) {
    throw new Error("Something went wrong");
  }
};

export const changeWorkspaceBoardSharing = async ({
  workspaceSettingId,
  boardSharing,
  path,
}: {
  workspaceSettingId: Id<"workspaceSettings">;
  boardSharing: "admin" | "member";
  path: string;
}) => {
  try {
    await fetchMutation(api.workspaceSettings.changeWorkspaceBoardSharing, {
      workspaceSettingId: workspaceSettingId,
      share_board: boardSharing,
    });

    revalidatePath(path);
  } catch (error) {
    throw new Error("Something went wrong");
  }
};
