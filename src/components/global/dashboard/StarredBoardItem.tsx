"use client"
import React from "react";
import { Id } from "../../../../convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { StarFilledIcon } from "@radix-ui/react-icons";

type Props = {
  boardId: Id<"boards">;
};

const StarredBoardItem = ({ boardId }: Props) => {
  const board = useQuery(api.boards.getBoardById, { boardId });
  const workspace = useQuery(api.workspaces.getWorkspaceByBoardId, { boardId });
  return (
    <div className="flex items-center gap-1">
      <Link
        href={`/dashboard/workspace/${workspace?._id}/board/${boardId}`}
        className="flex-1"
      >
        <div className="flex items-center gap-1">
          <div
            className="w-[40px] h-[30px] rounded-sm"
            style={{
              background: `linear-gradient(to right, ${board?.background_colors[0]}, ${board?.background_colors[1]}, ${board?.background_colors[2]})`,
            }}
          />
          <div className="flex flex-col">
            <p className="text-sm font-semibold text-primary-dark">
              {board?.title}
            </p>
            <p className="text-xs text-primary-dark">{workspace?.name}</p>
          </div>
        </div>
      </Link>
      <Button size="sm" className="p-0 bg-transparent hover:bg-transparent">
        <StarFilledIcon width={25} height={25} color="#808080" />
      </Button>
    </div>
  );
};

export default StarredBoardItem;
