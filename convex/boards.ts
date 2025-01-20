import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";

export const createBoard = mutation({
  args: {
    workspaceId: v.id("workspaces"),
    title: v.string(),
    visibility: v.union(v.literal("private"), v.literal("public")),
    backgroundColors: v.array(v.string()),
  },
  handler: async (
    { db },
    { workspaceId, title, visibility, backgroundColors }
  ) => {
    try {
      const boardId = await db.insert("boards", {
        title,
        workspace: workspaceId,
        visibility,
        background_colors: backgroundColors,
      });

      const workspace = await db.get(workspaceId);

      await db.patch(workspaceId, {
        boards: [...(workspace?.boards ?? []), boardId],
      });
    } catch (error) {
      if (error instanceof ConvexError) throw new Error(error.message);
    }
  },
});

export const getBoardsByWorkspaceId = query({
  args: { workspaceId: v.id("workspaces") },
  handler: async ({ db }, { workspaceId }) => {
    try {
      const boards = await db
        .query("boards")
        .filter((q) => q.eq(q.field("workspace"), workspaceId))
        .collect();

      return boards;
    } catch (error) {
      if (error instanceof ConvexError)
        throw new Error(`Something went wrong: ${error.message}`);
    }
  },
});

export const getBoardById = query({
  args: { boardId: v.id("boards") },
  handler: async ({ db }, { boardId }) => {
    try {
      const board = await db.get(boardId);

      return board;
    } catch (error) {
      if (error instanceof ConvexError)
        throw new Error(`Something went wrong: ${error.message}`);
    }
  },
});

export const deleteBoard = mutation({
  args: { boardId: v.id("boards") },
  handler: async ({ db }, { boardId }) => {
    try {
      const board = await db.get(boardId);
      const lists = await db
        .query("lists")
        .filter((q) => q.eq(q.field("board"), board?._id))
        .collect();

      let cards: Doc<"cards">[] = [];

      for (const list of lists) {
        const card = await db
          .query("cards")
          .filter((q) => q.eq(q.field("list"), list._id))
          .collect();

        cards = [...cards, ...card];

        await db.delete(list._id);
      }

      for (const card of cards) {
        await db.delete(card._id);
      }

      const workspace = await db.get(board?.workspace as Id<"workspaces">);

      const filteredWorkspaceBoards = workspace?.boards?.filter(
        (boardId) => boardId !== board?._id
      );

      await db.patch(workspace?._id as Id<"workspaces">, {
        boards: filteredWorkspaceBoards,
      });

      await db.delete(boardId);
    } catch (error) {
      if (error instanceof ConvexError)
        throw new Error(`Something went wrong: ${error.message}`);
    }
  },
});

export const addWorkspaceToStarred = mutation({
  args: { clerkId: v.string(), boardId: v.id("boards") },
  handler: async ({ db }, { clerkId, boardId }) => {
    try {
      const user = await db
        .query("users")
        .filter((q) => q.eq(q.field("clerkId"), clerkId))
        .unique();

      await db.patch(user?._id as Id<"users">, {
        starredBoards: [...(user?.starredBoards ?? []), boardId],
      });
    } catch (error) {
      if (error instanceof ConvexError)
        throw new Error(`Something went wrong: ${error.message}`);
    }
  },
});

export const removeWorkspaceFromStarred = mutation({
  args: { clerkId: v.string(), boardId: v.id("boards") },
  handler: async ({ db }, { clerkId, boardId }) => {
    try {
      const user = await db
        .query("users")
        .filter((q) => q.eq(q.field("clerkId"), clerkId))
        .unique();

      const filteredStarredBoards = user?.starredBoards?.filter(
        (board) => board !== boardId
      );

      await db.patch(user?._id as Id<"users">, {
        starredBoards: filteredStarredBoards,
      });
    } catch (error) {
      if (error instanceof ConvexError) throw new Error("Something went wrong");
    }
  },
});
