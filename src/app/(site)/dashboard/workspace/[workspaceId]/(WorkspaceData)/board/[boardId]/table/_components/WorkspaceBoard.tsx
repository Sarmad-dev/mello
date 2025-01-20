import React from "react";
import { Id } from "../../../../../../../../../../../convex/_generated/dataModel";
import { fetchQuery } from "convex/nextjs";
import { api } from "../../../../../../../../../../../convex/_generated/api";
import BoardListsTable from "./BoardListsTable";

const WorkspaceBoard = async ({ boardId }: { boardId: Id<"boards"> }) => {
  const lists = await fetchQuery(api.lists.getBoardLists, { boardId });
  return <BoardListsTable lists={lists!} />;
};

export default WorkspaceBoard;
