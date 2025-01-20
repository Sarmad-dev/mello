"use client";
import React from "react";
import { useParams } from "next/navigation";
import CreateBoard from "@/components/global/board/CreateBoard";
import { useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { Id } from "../../../../../convex/_generated/dataModel";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { EllipsisIcon, Plus } from "lucide-react";
import { useAuth } from "@clerk/nextjs";
import { StarFilledIcon, StarIcon } from "@radix-ui/react-icons";
import DeleteBoardDropdown from "./DeleteBoardDropdown";
import { fetchMutation } from "convex/nextjs";
import { toast } from "sonner";

const WorkspaceBoards = () => {
  const { workspaceId } = useParams();
  const clerkUser = useAuth();

  const boards = useQuery(api.boards.getBoardsByWorkspaceId, {
    workspaceId: workspaceId as Id<"workspaces">,
  });

  const workspaceSettings = useQuery(
    api.workspaceSettings.getWorkspaceSettingsByWorkspaceId,
    { workspaceId: workspaceId as Id<"workspaces"> }
  );

  const loggedInUser = useQuery(api.users.getUserByClerkId, {
    clerkId: clerkUser.userId!,
  });

  const user = useQuery(api.users.getUserById, { userId: loggedInUser! });

  const workspace = useQuery(api.workspaces.getWorkspaceById, {
    workspaceId: workspaceId as Id<"workspaces">,
  });

  const handleStarredBoard = async (boardId: Id<"boards">) => {
    try {
      if (user?.starredBoards?.includes(boardId)) {
        await fetchMutation(api.boards.removeWorkspaceFromStarred, {
          clerkId: clerkUser.userId!,
          boardId,
        });

        toast.success("Board removed from starred");
      } else {
        await fetchMutation(api.boards.addWorkspaceToStarred, {
          clerkId: clerkUser.userId!,
          boardId,
        });

        toast.success("Board added to starred");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between px-5 py-1">
        <span className="font-semibold">Your boards</span>
        {(workspaceSettings?.create_board === "admin" &&
          loggedInUser === workspace?.admin) ||
        workspaceSettings?.create_board === "member" ? (
          <CreateBoard>
            <Button className="px-0 h-[90%] aspect-square py-0 bg-transparent hover:bg-white/10">
              <Plus className="text-primary-dark" />
            </Button>
          </CreateBoard>
        ) : null}
      </div>
      <div className="flex flex-col gap-2">
        {boards?.map((board) => {
          const [startColor, midColor, endColor] = board.background_colors;
          return (
            <div
              className="px-5 flex items-center gap-1 rounded-sm hover:bg-white/10 group"
              key={board._id}
            >
              <Link
                href={`/dashboard/workspace/${workspaceId}/board/${board._id}`}
                className="flex-1"
              >
                <div className="flex items-center justify-start gap-3">
                  <div
                    className={`w-[30px] h-[20px] rounded-sm`}
                    style={{
                      background: `linear-gradient(to right, ${startColor}, ${midColor}, ${endColor})`,
                    }}
                  />
                  <span className="text-sm">{board.title}</span>
                </div>
              </Link>

              <Button
                size="sm"
                className="p-0 bg-transparent hover:bg-transparent group-hover:block hidden"
                onClick={() => handleStarredBoard(board._id)}
              >
                {user?.starredBoards?.includes(board._id) ? (
                  <StarFilledIcon color="#808080" />
                ) : (
                  <StarIcon color="#808080" />
                )}
              </Button>

              {(workspaceSettings?.delete_board === "admin" &&
                loggedInUser === workspace?.admin) ||
              workspaceSettings?.delete_board === "member" ? (
                <DeleteBoardDropdown board={board}>
                  <Button
                    size="sm"
                    className="p-0 bg-transparent hover:bg-transparent opacity-0 group-hover:opacity-100"
                  >
                    <EllipsisIcon color="#808080" />
                  </Button>
                </DeleteBoardDropdown>
              ) : undefined}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WorkspaceBoards;
