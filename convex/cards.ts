import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { Doc } from "./_generated/dataModel";

export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

export const addCardToList = mutation({
  args: { title: v.string(), listId: v.id("lists") },
  handler: async ({ db }, { title, listId }) => {
    try {
      const card = await db.insert("cards", {
        list: listId,
        title,
        watch: false,
      });

      const list = await db.get(listId);
      if (!list) throw new Error("List not found");

      const cards = list.cards ?? [];
      await db.patch(listId, { cards: [...cards, card] });
    } catch (error) {
      if (error instanceof ConvexError)
        throw new Error(`Something went wrong: ${error.message}`);
    }
  },
});

export const getCardById = query({
  args: { cardId: v.id("cards") },
  handler: async ({ db }, { cardId }) => {
    try {
      const card = await db.get(cardId);

      if (!card) throw new Error("Card not found");

      return card;
    } catch (error) {
      if (error instanceof ConvexError)
        throw new Error(`Something went wrong: ${error.message}`);
    }
  },
});

export const getCardByListId = query({
  args: { listId: v.id("lists") },
  handler: async ({ db }, { listId }) => {
    try {
      const cards = await db
        .query("cards")
        .filter((q) => q.eq(q.field("list"), listId))
        .collect();

      return cards;
    } catch (error) {
      if (error instanceof ConvexError)
        throw new Error(`Something went wrong: ${error.message}`);
    }
  },
});

export const getListCards = query({
  args: { listId: v.id("lists") },
  handler: async ({ db }, { listId }) => {
    const list = await db.get(listId);

    const cards: Doc<"cards">[] = [];

    if (list?.cards) {
      for (const cardId of list.cards) {
        const card = await db.get(cardId);
        if (card) {
          cards.push(card);
        }
      }
    }

    return cards;
  },
});

export const updateListCards = mutation({
  args: {
    listId: v.id("lists"),
    activeCardId: v.id("cards"),
    overCardIndex: v.number(),
  },
  handler: async ({ db }, { listId, activeCardId, overCardIndex }) => {
    const list = await db.get(listId);

    const listCards = list?.cards;
    if (!listCards) return;

    const newListCards = [...listCards];
    const listCardsWithoutActiveCard = newListCards.filter(
      (card) => card !== activeCardId
    );
    const updatedListCards = [
      ...listCardsWithoutActiveCard.slice(0, overCardIndex),
      activeCardId,
      ...listCardsWithoutActiveCard.slice(overCardIndex),
    ];

    await db.patch(listId, { cards: updatedListCards });
  },
});

// convex/cards.ts

// Move card to a different list
export const moveCardToList = mutation({
  args: {
    cardId: v.id("cards"),
    fromListId: v.id("lists"),
    toListId: v.id("lists"),
    position: v.number(),
  },
  handler: async (ctx, args) => {
    // Update the card's listId and position
    await ctx.db.patch(args.cardId, {
      list: args.toListId,
    });

    const overList = await ctx.db.get(args.toListId);

    await ctx.db.patch(args.toListId, {
      cards: [...(overList?.cards ?? []), args.cardId],
    });

    // You might want to update the positions of other cards in both lists
  },
});

export const updateCardDetails = mutation({
  args: {
    cardId: v.id("cards"),
    description: v.optional(v.string()),
    background_color: v.optional(v.string()),
    labels: v.optional(
      v.array(
        v.object({ id: v.number(), color: v.string(), title: v.string() })
      )
    ),
    watch: v.optional(v.boolean()),
    members: v.optional(v.array(v.id("users"))),
  },
  handler: async (
    { db },
    { cardId, description, background_color, labels, watch }
  ) => {
    try {
      await db.patch(cardId, {
        description,
        background_color,
        labels,
        watch,
      });
    } catch (error) {
      if (error instanceof ConvexError)
        throw new Error(`Something went wront: ${error.message}`);
    }
  },
});

export const invteMembersToCard = mutation({
  args: { cardId: v.id("cards"), memberId: v.id("users") },
  handler: async ({ db }, { cardId, memberId }) => {
    try {
      const card = await db.get(cardId);
      if (!card) throw new Error("Card not found");

      const members = card.members ?? [];
      await db.patch(cardId, { members: [...members, memberId] });

      const users = await db.get(memberId);
      await db.patch(memberId, {
        cards: [...(users?.cards ?? []), cardId],
      });
    } catch (error) {
      if (error instanceof ConvexError)
        throw new Error(`Something went wrong: ${error.message}`);
    }
  },
});

export const removeLabelFromCard = mutation({
  args: { cardId: v.id("cards"), id: v.number() },
  handler: async ({ db }, { cardId, id }) => {
    try {
      const card = await db.get(cardId);

      const cardLabels = card?.labels?.filter((label) => label.id !== id);

      await db.patch(cardId, {
        labels: cardLabels as { id: number; title: string; color: string }[],
      });
    } catch (error) {
      if (error instanceof ConvexError)
        throw new Error(`Something went wrong: ${error.message}`);
    }
  },
});

export const addDateToCard = mutation({
  args: {
    cardId: v.id("cards"),
    date: v.object({
      date: v.string(),
      status: v.boolean(),
    }),
  },
  handler: async ({ db }, { cardId, date }) => {
    try {
      await db.patch(cardId, { date });
    } catch (error) {
      if (error instanceof ConvexError)
        throw new Error(`Soemthing went wrong: ${error.message}`);
    }
  },
});

export const changeDateStatus = mutation({
  args: { cardId: v.id("cards"), status: v.boolean() },
  handler: async ({ db }, { cardId, status }) => {
    try {
      const card = await db.get(cardId);
      await db.patch(cardId, {
        date: {
          date: card?.date?.date as string,
          status: status,
        },
      });
    } catch (error) {
      if (error instanceof ConvexError)
        throw new Error(`Something went wrong: ${error.message}`);
    }
  },
});

export const changeCardBackgorundCover = mutation({
  args: { cardId: v.id("cards"), backgroundCover: v.string() },
  handler: async ({ db }, { cardId, backgroundCover }) => {
    try {
      await db.patch(cardId, { background_color: backgroundCover });
    } catch (error) {
      if (error instanceof ConvexError)
        throw new Error(`Something went wrong: ${error.message}`);
    }
  },
});

export const addImageToCard = mutation({
  args: { cardId: v.id("cards"), storageId: v.id("_storage") },
  handler: async ({ db }, { cardId, storageId }) => {
    try {
      const card = await db.get(cardId);
      await db.patch(cardId, {
        attachment: [...(card?.attachment ?? []), storageId],
      });
    } catch (error) {
      if (error instanceof ConvexError)
        throw new Error(`Something went wrong: ${error.message}`);
    }
  },
});

export const getCardImageById = query({
  args: { storageId: v.id("_storage") },
  handler: async ({ storage }, { storageId }) => {
    try {
      const cardImage = await storage.getUrl(storageId);

      return cardImage;
    } catch (error) {
      if (error instanceof ConvexError)
        throw new Error(`Something went wrong: ${error.message}`);
    }
  },
});
