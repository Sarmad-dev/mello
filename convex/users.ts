import { mutation, query } from "./_generated/server";
import { ConvexError, v } from "convex/values";

export const createUser = mutation({
  args: {
    clerkId: v.string(),
    username: v.string(),
    image: v.string(),
    email: v.string(),
    name: v.string(),
  },
  handler: async ({ db }, { clerkId, username, image, email, name }) => {
    const userByEmail = await db
      .query("users")
      .withIndex("by_email", (q) => q.eq("email", email))
      .unique();

    if (userByEmail) {
      return userByEmail._id;
    }

    const userByUsername = await db
      .query("users")
      .withIndex("by_username", (q) => q.eq("username", username))
      .unique();

    if (userByUsername) {
      throw new Error("This username is taken.");
    }

    const userId = await db.insert("users", {
      clerkId,
      name,
      email,
      image,
      username,
    });

    const workspaceId = await db.insert("workspaces", {
      admin: userId,
      name: "Trello workspace",
      type: "business",
    });

    await db.insert("workspaceSettings", {
      workspace: workspaceId,
      visibility: "public",
      create_board: "admin",
      share_board: "admin",
      delete_board: "admin",
    });

    return userId;
  },
});

export const updateUser = mutation({
  args: { id: v.id("users"), name: v.string(), image: v.string() },
  handler: async ({ db }, { id, name, image }) => {
    try {
      const updatedUser = await db.patch(id, {
        name,
        image,
      });

      return updatedUser;
    } catch (error) {
      if (error instanceof ConvexError)
        throw new Error(`Something went wrong: ${error.message}`);
    }
  },
});

export const getUserByClerkId = query({
  args: { clerkId: v.string() },
  handler: async ({ db }, { clerkId }) => {
    try {
      const user = await db
        .query("users")
        .filter((q) => q.eq(q.field("clerkId"), clerkId))
        .unique();

      return user?._id;
    } catch (error) {
      if (error instanceof ConvexError)
        throw new Error(`Something went wrong: ${error.message}`);
    }
  },
});

export const deleteUser = mutation({
  args: { id: v.id("users") },
  handler: async ({ db }, { id }) => {
    try {
      await db.delete(id);
    } catch (error) {
      if (error instanceof ConvexError)
        throw new Error(`Something went wrong: ${error.message}`);
    }
  },
});

export const getUserByName = query({
  args: { name: v.string() },
  handler: async ({ db }, { name }) => {
    try {
      const user = await db
        .query("users")
        .filter((q) => q.eq(q.field("name"), name))
        .collect();

      return user;
    } catch (error) {
      if (error instanceof ConvexError)
        throw new Error(`Something went wrong: ${error.message}`);
    }
  },
});

export const getUserById = query({
  args: { userId: v.id("users") },
  handler: async ({ db }, { userId }) => {
    try {
      const user = await db.get(userId);

      return user;
    } catch (error) {
      if (error instanceof ConvexError)
        throw new Error(`Something went wrong: ${error.message}`);
    }
  },
});
