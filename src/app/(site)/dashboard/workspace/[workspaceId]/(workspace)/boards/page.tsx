import React from "react";
import CreateBoard from "@/components/global/board/CreateBoard";
import Link from "next/link";
import { fetchQuery } from "convex/nextjs";
import { api } from "../../../../../../../../convex/_generated/api";
import { Id } from "../../../../../../../../convex/_generated/dataModel";

type Props = {
  params: Promise<{ workspaceId: string }>;
};
const Boards = async ({ params }: Props) => {
  const { workspaceId } = await params;

  const workspaceBoards = await fetchQuery(api.boards.getBoardsByWorkspaceId, {
    workspaceId: workspaceId as Id<"workspaces">,
  });

  return (
    <div className="flex flex-col gap-10 mx-72 max-xl:mx-96">
      <h3 className="text-xl">Boards</h3>
      <div className="w-full flex items-center flex-wrap gap-5">
        <CreateBoard>
          <div className="flex items-center justify-center w-[250px] h-[90px] rounded-md bg-white/10 hover:bg-white/20 cursor-pointer">
            <p>Create new board</p>
          </div>
        </CreateBoard>

        {workspaceBoards?.map((board) => {
          const [startColor, midColor, endColor] = board.background_colors;
          return (
            <Link
              href={`/dashboard/workspace/${workspaceId}/board/${board._id}`}
              key={board._id}
              className="w-[250px] h-[90px] rounded-md p-2"
              style={{
                background: `linear-gradient(to right, ${startColor}, ${midColor}, ${endColor})`,
              }}
            >
              <p className="text-white text-lg font-semibold">{board.title}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Boards;
