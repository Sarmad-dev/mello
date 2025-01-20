import React from "react";
import Board from "./_component/Board";
import { fetchQuery } from "convex/nextjs";
import { api } from "../../../../../../../../../convex/_generated/api";
import {
  Doc,
  Id,
} from "../../../../../../../../../convex/_generated/dataModel";

interface Props {
  params: Promise<{ boardId: string }>;
}

const BoardPage = async ({ params }: Props) => {
  const { boardId } = await params;
  const board = await fetchQuery(api.boards.getBoardById, {
    boardId: boardId as Id<"boards">,
  });
  const lists = await fetchQuery(api.lists.getListsByBoardId, {
    boardId: boardId as Id<"boards">,
  });

  if (board !== undefined && lists !== undefined) {
    return (
      <Board
        board={board!}
        lists={lists?.filter((list) => list !== null) as Doc<"lists">[]}
      />
    );
  }
};

export default BoardPage;
