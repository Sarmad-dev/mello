import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Doc, Id } from "./_generated/dataModel";

export const getUserWorkspaces = query({
  args: { clerkId: v.string() },
  handler: async ({ db }, { clerkId }) => {
    try {
      const user = await db
        .query("users")
        .filter((q) => q.eq(q.field("clerkId"), clerkId))
        .unique();

      let userWorkspaces = [];
      const workspacesByUser = await db
        .query("workspaces")
        .filter((q) => q.eq(q.field("admin"), user?._id as Id<"users">))
        .collect();

      const allWorkspaces = await db.query("workspaces").collect();

      const memberWorkspaces = allWorkspaces.filter((workspace) =>
        workspace.members?.includes(user?._id as Id<"users">)
      );

      userWorkspaces = [...workspacesByUser, ...memberWorkspaces];
      return userWorkspaces;
    } catch (error) {
      if (error instanceof ConvexError)
        throw new Error(`Server Error: , ${error.message}`);
    }
  },
});

export const createWorkspace = mutation({
  args: {
    name: v.string(),
    type: v.union(
      v.literal("business"),
      v.literal("web-development"),
      v.literal("data-science")
    ),
    description: v.optional(v.string()),
    clerkId: v.string(),
  },
  handler: async (
    { db },
    { name, type = "web-development", description, clerkId }
  ) => {
    console.log("Hello from convex");
    console.log("ClerkId: ", clerkId);

    const user = await db
      .query("users")
      .filter((q) => q.eq(q.field("clerkId"), clerkId))
      .unique();

    try {
      const newWorkspace = await db.insert("workspaces", {
        name,
        type,
        description,
        admin: user?._id as Id<"users">,
        invite_link: `${process.env.BASE_URL}/invite/${user?._id}/`,
        is_invite_link_active: true,
      });

      console.log(newWorkspace);

      await db.patch(newWorkspace, {
        invite_link: `${process.env.NEXT_PUBLIC_BASE_URL}/invite/${user?._id}/${newWorkspace}`,
      });

      await db.patch(user?._id as Id<"users">, {
        workspaces: [...(user?.workspaces ?? []), newWorkspace],
      });

      await db.insert("workspaceSettings", {
        workspace: newWorkspace,
        create_board: "admin",
        delete_board: "admin",
        share_board: "admin",
        visibility: "private",
      });

      return newWorkspace;
    } catch (error) {
      if (error instanceof ConvexError)
        throw new Error(`Something went wrong: ${error.message}`);
    }
  },
});

export const updateMemebrsInWorkspace = mutation({
  args: { workspaceId: v.id("workspaces"), memberId: v.id("users") },
  handler: async ({ db }, { workspaceId, memberId }) => {
    try {
      const workspace = await db.get(workspaceId);
      if (!workspace) throw new Error("Workspace not found");

      const members = workspace.members ?? [];
      await db.patch(workspaceId, {
        members: [...members, memberId],
      });

      const users = await db.get(memberId);
      await db.patch(memberId, {
        workspaces: [...(users?.workspaces ?? []), workspaceId],
      });
    } catch (error) {
      if (error instanceof ConvexError)
        throw new Error(`Something went wrong: ${error.message}`);
    }
  },
});

export const getWorkspaceById = query({
  args: { workspaceId: v.id("workspaces") },
  handler: async ({ db }, { workspaceId }) => {
    try {
      const workspace = await db.get(workspaceId);

      return workspace;
    } catch (error) {
      if (error instanceof ConvexError)
        throw new Error(`Something went wrong: ${error.message}`);
    }
  },
});

export const getWorkspaceMembers = query({
  args: { workspaceId: v.id("workspaces") },
  handler: async ({ db }, { workspaceId }) => {
    try {
      const workspace = await db.get(workspaceId);

      return Promise.all(
        (workspace?.members ?? []).map((memberId) => db.get(memberId))
      );
    } catch (error) {
      if (error instanceof ConvexError)
        throw new Error(`Something went wrong: ${error.message}`);
    }
  },
});

export const removeWOrkspaceMember = mutation({
  args: { workspaceId: v.id("workspaces"), memberId: v.id("users") },
  handler: async ({ db }, { workspaceId, memberId }) => {
    try {
      const workspace = await db.get(workspaceId);
      const workspaceMembers = workspace?.members;

      const filteredMembers = workspaceMembers?.filter(
        (member) => member !== memberId
      );

      await db.patch(workspaceId, { members: filteredMembers });
    } catch (error) {
      if (error instanceof ConvexError)
        throw new Error(`Something went wrong: ${error.message}`);
    }
  },
});

export const getWorkspaceData = query({
  args: { workspaceId: v.id("workspaces") },
  handler: async ({ db }, { workspaceId }) => {
    try {
      // Step 1: Fetch all boards in the given workspace
      const boards = await db
        .query("boards")
        .filter((q) => q.eq(q.field("workspace"), workspaceId))
        .collect();

      console.log("Boards: ", boards);

      // Step 2: Fetch all lists in the fetched boards
      const lists: Doc<"lists">[] = [];
      for (const board of boards) {
        const boardLists = await db
          .query("lists")
          .filter((q) => q.eq(q.field("board"), board._id))
          .collect();
        lists.push(...boardLists);
      }

      console.log("Lists: ", lists);

      // Step 3: Fetch all cards for the lists
      const cards: Doc<"cards">[] = [];
      for (const list of lists) {
        const listCards = await db
          .query("cards")
          .filter((q) => q.eq(q.field("list"), list._id))
          .collect();
        cards.push(...listCards);
      }

      console.log("Cards: ", cards);

      // Step 4: Structure the result
      const boardsWithDetails = boards.map((board) => ({
        ...board,
        lists: lists
          .filter((list) => list.board === board._id)
          .map((list) => ({
            ...list,
            cards: cards.filter((card) => card.list === list._id),
          })),
      }));

      return boardsWithDetails;
    } catch (error) {
      if (error instanceof ConvexError)
        throw new Error(`Something went wrong: ${error.message}`);
    }
  },
});

export const getWorkspaceByBoardId = query({
  args: { boardId: v.id("boards") },
  handler: async ({ db }, { boardId }) => {
    try {
      const allWorkspaces = await db.query("workspaces").collect();
      const workspace = allWorkspaces.filter((workspace) =>
        workspace.boards?.includes(boardId)
      );

      return workspace[0];
    } catch (error) {
      if (error instanceof ConvexError)
        throw new Error(`Something went wrong: ${error.message}`);
    }
  },
});
