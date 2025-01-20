import React from "react";
import { Id } from "../../../../../../convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { api } from "../../../../../../convex/_generated/api";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";

const UserWorkspaceBoard = ({
  boardId,
  workspaceId,
}: {
  boardId: Id<"boards">;
  workspaceId: Id<"workspaces">;
}) => {
  const board = useQuery(api.boards.getBoardById, { boardId });
  const [startColor, midColor, endColor] = board?.background_colors || [];
  return (
    <div className="px-5 flex items-center gap-1 rounded-sm hover:bg-white/10 group">
      {board === undefined ? (
        <Skeleton className="h-[20px] flex-1 rounded-sm" />
      ) : (
        <Link
          href={`/dashboard/workspace/${workspaceId}/board/${board?._id}`}
          className="flex-1"
        >
          <div className="flex items-center justify-start gap-3">
            <div
              className={`w-[30px] h-[20px] rounded-sm`}
              style={{
                background: `linear-gradient(to right, ${startColor}, ${midColor}, ${endColor})`,
              }}
            />
            <span className="text-sm">{board?.title}</span>
          </div>
        </Link>
      )}
    </div>
  );
};

export default UserWorkspaceBoard;
