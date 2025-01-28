import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
    name: v.string(),
    email: v.string(),
    username: v.string(),
    image: v.optional(v.string()),
    bio: v.optional(v.string()),
    workspaces: v.optional(v.array(v.id("workspaces"))),
    starredBoards: v.optional(v.array(v.id("boards"))),
    cards: v.optional(v.array(v.id("cards"))),
  })
    .index("by_email", ["email"])
    .index("by_username", ["username"]),

  workspaces: defineTable({
    name: v.string(),
    type: v.union(
      v.literal("business"),
      v.literal("web-development"),
      v.literal("data-science")
    ),
    description: v.optional(v.string()),
    invite_link: v.optional(v.string()),
    is_invite_link_active: v.optional(v.boolean()),
    admin: v.id("users"),
    members: v.optional(v.array(v.id("users"))),
    boards: v.optional(v.array(v.id("boards"))),
  }).index("by_userId_by_memberId", ["admin", "members"]),

  workspaceSettings: defineTable({
    workspace: v.id("workspaces"),
    visibility: v.union(v.literal("private"), v.literal("public")),
    create_board: v.union(v.literal("admin"), v.literal("member")),
    delete_board: v.union(v.literal("admin"), v.literal("member")),
    share_board: v.union(v.literal("admin"), v.literal("member")),
  }),

  boards: defineTable({
    title: v.string(),
    visibility: v.union(v.literal("private"), v.literal("public")),
    background_colors: v.array(v.string()),
    lists: v.optional(v.array(v.id("lists"))),
    workspace: v.id("workspaces"),
    members: v.optional(v.id("users")),
  }),

  lists: defineTable({
    title: v.string(),
    board: v.id("boards"),
    cards: v.optional(v.array(v.id("cards"))),
  }),

  cards: defineTable({
    title: v.string(),
    background_color: v.optional(v.string()),
    list: v.id("lists"),
    description: v.optional(v.string()),
    labels: v.optional(
      v.array(
        v.object({ id: v.number(), title: v.string(), color: v.string() })
      )
    ),

    watch: v.boolean(),
    members: v.optional(v.array(v.id("users"))),
    date: v.optional(
      v.object({
        date: v.string(),
        status: v.boolean(),
      })
    ),
    attachment: v.optional(v.array(v.id("_storage"))),
  }),
});
