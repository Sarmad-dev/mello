import { fetchQuery } from "convex/nextjs";
import React from "react";
import { api } from "../../../../../../../../../../convex/_generated/api";
import { Id } from "../../../../../../../../../../convex/_generated/dataModel";
import BoardListsTable from "./_components/BoardListsTable";

type TablePageProps = {
  params: Promise<{ boardId: string }>;
};

const TablePage = async ({ params }: TablePageProps) => {
  const { boardId } = await params;

  const lists = await fetchQuery(api.lists.getListsByBoardId, {
    boardId: boardId as Id<"boards">,
  });

  return (
    <div
      className="p-3"
      style={{
        height: "calc(100vh - 135px)",
        width: "calc(100vw - 300px)",
      }}
    >
      <BoardListsTable lists={lists!} />
    </div>
  );
};

export default TablePage;
