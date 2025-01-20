import { Doc } from "./_generated/dataModel.d";
import { ConvexError, v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const addListToBoard = mutation({
  args: { boardId: v.id("boards"), title: v.string() },
  handler: async ({ db }, { boardId, title }) => {
    try {
      const list = await db.insert("lists", {
        board: boardId,
        title: title,
        cards: [],
      });

      const board = await db.get(boardId);
      if (!board) throw new Error("Board not found");

      const lists = board.lists ?? [];

      await db.patch(boardId, {
        lists: [...lists, list],
      });
    } catch (error) {
      if (error instanceof ConvexError)
        throw new Error(`Something went wrong: ${error.message}`);
    }
  },
});

export const getListById = query({
  args: { listId: v.id("lists") },
  handler: async ({ db }, { listId }) => {
    try {
      const list = await db.get(listId);

      if (!list) throw new Error("List not found");

      return list;
    } catch (error) {
      if (error instanceof ConvexError)
        throw new Error(`Something went wrong: ${error.message}`);
    }
  },
});

export const getListsByBoardId = query({
  args: { boardId: v.id("boards") },
  handler: async ({ db }, { boardId }) => {
    try {
      const board = await db.get(boardId);

      const lists = board?.lists
        ? await Promise.all(
            board.lists.map(async (listId) => await db.get(listId))
          )
        : [];

      return lists;

      // const lists = await db
      //   .query("lists")
      //   .filter((q) => q.eq(q.field("board"), boardId))
      //   .collect();

      // return lists;
    } catch (error) {
      if (error instanceof ConvexError)
        throw new Error(`Something went wrong: ${error.message}`);
    }
  },
});

export const getBoardLists = query({
  args: { boardId: v.id("boards") },
  handler: async ({ db }, { boardId }) => {
    try {
      const board = await db.get(boardId);

      const lists: Doc<"lists">[] = [];

      if (board?.lists) {
        for (const listId of board.lists) {
          const list = await db.get(listId);
          if (list) {
            lists.push(list);
          }
        }
      }

      return lists;
    } catch (error) {
      if (error instanceof ConvexError)
        throw new Error(`Something went wrong: ${error}`);
    }
  },
});

export const updateBoardLists = mutation({
  args: {
    boardId: v.id("boards"),
    activeListId: v.id("lists"),
    overListIndex: v.number(),
  },
  handler: async ({ db }, { boardId, activeListId, overListIndex }) => {
    try {
      const board = await db.get(boardId);

      const boardLists = board?.lists;
      if (!boardLists) return;

      const newLists = [...boardLists];
      const listsWithoutActiveListId = newLists.filter(
        (list) => list !== activeListId
      );

      const updatedLists = [
        ...listsWithoutActiveListId.slice(0, overListIndex),
        activeListId,
        ...listsWithoutActiveListId.slice(overListIndex),
      ];

      await db.patch(boardId, { lists: updatedLists });
    } catch (error) {
      if (error instanceof ConvexError)
        throw new Error(`Something went wrong: ${error.message}`);
    }
  },
});

export const getListByCardId = query({
  args: { cardId: v.id("cards") },
  handler: async ({ db }, { cardId }) => {
    try {
      const lists = await db.query("lists").collect();

      const cardList = lists.find((list) => list.cards?.includes(cardId));

      return cardList;
    } catch (error) {
      if (error instanceof ConvexError)
        throw new Error(`Something went wrong: ${error.message}`);
    }
  },
});

export const updateListCards = mutation({
  args: {
    activeListId: v.id("lists"),
    activeCardId: v.id("cards"),
    overListId: v.id("lists"),
    overCardIndex: v.number(),
  },
  async handler(
    { db },
    { activeCardId, activeListId, overListId, overCardIndex }
  ) {
    // Get both lists
    const activeList = await db.get(activeListId);
    const overList = await db.get(overListId);

    if (!activeList || !overList) {
      throw new Error("List not found");
    }

    // Remove card from active list
    const newActiveCards = [...(activeList.cards || [])];
    const updatedActiveCards = newActiveCards.filter(
      (card) => card !== activeCardId
    );

    await db.patch(activeListId, {
      cards: updatedActiveCards,
    });

    // Insert card into over list at specific index
    const updatedOverCards = [...(overList.cards || [])];
    updatedOverCards.splice(overCardIndex, 0, activeCardId);

    await db.patch(overListId, {
      cards: updatedOverCards,
    });
  },
});

export const addCardToEmptyList = mutation({
  args: {
    activeListId: v.id("lists"),
    activeCardId: v.id("cards"),
    overListId: v.id("lists"),
  },
  handler: async ({ db }, { activeCardId, activeListId, overListId }) => {
    console.log("Active List ID: ", activeListId);
    const activeList = await db.get(activeListId);

    const updateActiveListCards = activeList?.cards?.filter(
      (card) => card !== activeCardId
    );

    await db.patch(activeListId, { cards: updateActiveListCards });

    await db.patch(overListId, { cards: [activeCardId] });
  },
});
