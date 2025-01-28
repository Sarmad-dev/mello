"use server";

import { fetchMutation, fetchQuery } from "convex/nextjs";
import { api } from "../../convex/_generated/api";
import { Doc, Id } from "../../convex/_generated/dataModel";
import { revalidatePath } from "next/cache";
import { ConvexError } from "convex/values";

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
    if (error instanceof ConvexError)
      throw new Error(`Something went wrong: ${error.message}`);
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
    if (error instanceof ConvexError)
      throw new Error(`Something went wrong: ${error.message}`);
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
    if (error instanceof ConvexError)
      throw new Error(`Something went wrong: ${error.message}`);
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
    if (error instanceof ConvexError)
      throw new Error(`Something went wrong: ${error.message}`);
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
    if (error instanceof ConvexError)
      throw new Error(`Something went wrong: ${error.message}`);
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
    if (error instanceof ConvexError)
      throw new Error(`Something went wrong: ${error.message}`);
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
    if (error instanceof ConvexError)
      throw new Error(`Something went wrong: ${error.message}`);
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
    if (error instanceof ConvexError)
      throw new Error(`Something went wrong: ${error.message}`);
  }
};

export const addListToBoard = async (title: string, board: Doc<"boards">) => {
  try {
    await fetchMutation(api.lists.addListToBoard, {
      title,
      boardId: board._id,
    });

    revalidatePath(
      `/dashboard/workspace/${board.workspace}/board/${board._id}`
    );
  } catch (error) {
    if (error instanceof ConvexError)
      throw new Error(`Something went wrong: ${error.message}`);
  }
};

export const getBoard = async (boardId: Id<"boards">) => {
  try {
    const board = await fetchQuery(api.boards.getBoardById, {
      boardId,
    });

    return board;
  } catch (error) {
    if (error instanceof ConvexError)
      throw new Error(`Something went wrong: ${error.message}`);
  }
};

export const getLists = async (boardId: Id<"boards">) => {
  try {
    const lists = await fetchQuery(api.lists.getListsByBoardId, {
      boardId: boardId as Id<"boards">,
    });
    return lists;
  } catch (error) {
    if (error instanceof ConvexError)
      throw new Error(`Something went wrong: ${error.message}`);
  }
};
