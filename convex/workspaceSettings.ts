import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const getWorkspaceSettingsByWorkspaceId = query({
  args: { workspaceId: v.id("workspaces") },
  handler: async ({ db }, { workspaceId }) => {
    try {
      const workspaceSettings = await db
        .query("workspaceSettings")
        .filter((q) => q.eq(q.field("workspace"), workspaceId))
        .unique();

      return workspaceSettings;
    } catch (error) {
      if (error instanceof ConvexError)
        throw new Error(`Something went wrong: ${error.message}`);
    }
  },
});

export const changeWorkspaceVisibility = mutation({
  args: {
    workspaceSettingId: v.id("workspaceSettings"),
    visibility: v.union(v.literal("private"), v.literal("public")),
  },
  handler: async ({ db }, { workspaceSettingId, visibility }) => {
    try {
      await db.patch(workspaceSettingId, { visibility: visibility });
    } catch (error) {
      if (error instanceof ConvexError)
        throw new Error(`Something went wrong: ${error.message}`);
    }
  },
});

export const changeWorkspaceBoardCreation = mutation({
  args: {
    workspaceSettingId: v.id("workspaceSettings"),
    create_board: v.union(v.literal("admin"), v.literal("member")),
  },
  handler: async ({ db }, { workspaceSettingId, create_board }) => {
    try {
      await db.patch(workspaceSettingId, { create_board: create_board });
    } catch (error) {
      if (error instanceof ConvexError)
        throw new Error(`Something went wrong: ${error.message}`);
    }
  },
});

export const changeWorkspaceBoardDeletion = mutation({
  args: {
    workspaceSettingId: v.id("workspaceSettings"),
    delete_board: v.union(v.literal("admin"), v.literal("member")),
  },
  handler: async ({ db }, { workspaceSettingId, delete_board }) => {
    try {
      await db.patch(workspaceSettingId, { delete_board: delete_board });
    } catch (error) {
      if (error instanceof ConvexError)
        throw new Error(`Something went wrong: ${error.message}`);
    }
  },
});

export const changeWorkspaceBoardSharing = mutation({
  args: {
    workspaceSettingId: v.id("workspaceSettings"),
    share_board: v.union(v.literal("admin"), v.literal("member")),
  },
  handler: async ({ db }, { workspaceSettingId, share_board }) => {
    try {
      await db.patch(workspaceSettingId, { share_board: share_board });
    } catch (error) {
      if (error instanceof ConvexError)
        throw new Error(`Something went wrong: ${error.message}`);
    }
  },
});
