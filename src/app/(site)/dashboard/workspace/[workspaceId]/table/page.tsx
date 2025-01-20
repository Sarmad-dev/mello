import React from "react";
import { api } from "../../../../../../../convex/_generated/api";
import { Id } from "../../../../../../../convex/_generated/dataModel";
import { fetchQuery } from "convex/nextjs";
import WorkspaceBoard from "../(WorkspaceData)/board/[boardId]/table/_components/WorkspaceBoard";

type TableProps = {
  params: Promise<{ workspaceId: string }>;
};

const Table = async ({ params }: TableProps) => {
  const { workspaceId } = await params;
  const workspace = await fetchQuery(api.workspaces.getWorkspaceById, {
    workspaceId: workspaceId as Id<"workspaces">,
  });
  return (
    <div className="bg-gradient-to-r from-[#f87171] via-[#ef4444] to-[#dc2626] h-full p-3">
      {workspace?.boards &&
        workspace.boards.length > 0 &&
        workspace.boards.map((boardId) => (
          <WorkspaceBoard boardId={boardId} key={boardId} />
        ))}
    </div>
  );
};

export default Table;
