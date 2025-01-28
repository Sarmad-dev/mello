import React from "react";
import Board from "./_component/Board";
import {
  Doc,
  Id,
} from "../../../../../../../../../convex/_generated/dataModel";
import { getBoard, getLists } from "@/actions/action";

interface Props {
  params: Promise<{ boardId: string }>;
}

const BoardPage = async ({ params }: Props) => {
  const { boardId } = await params;
  const board = await getBoard(boardId as Id<"boards">);

  const lists = await getLists(boardId as Id<"boards">);

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
