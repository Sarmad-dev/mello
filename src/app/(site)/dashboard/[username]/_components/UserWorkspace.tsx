"use client";
import React, { useState } from "react";
import { Id } from "../../../../../../convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { api } from "../../../../../../convex/_generated/api";
import { ChevronDown, ChevronUp } from "lucide-react";
import UserWorkspaceBoard from "./UserWorkspaceBoard";
import { Skeleton } from "@/components/ui/skeleton";

const UserWorkspace = ({ workspaceId }: { workspaceId: Id<"workspaces"> }) => {
  const [showBoards, setShowBoards] = useState(false);
  const workspace = useQuery(api.workspaces.getWorkspaceById, { workspaceId });

  return (
    <div className="flex flex-col gap-2 w-[250px] 3xl:w-[350px] mt-3">
      <div
        className="w-full flex items-center justify-between gap-3 hover:bg-white/5 cursor-pointer p-1"
        onClick={() => setShowBoards((prev) => !prev)}
      >
        {workspace === undefined ? (
          <Skeleton className="h-[20px] flex-1 rounded-sm" />
        ) : (
          <p className="">{workspace?.name}</p>
        )}
        {showBoards ? <ChevronUp /> : <ChevronDown />}
      </div>
      {showBoards && (
        <div className="p-1 flex flex-col gap-1">
          {workspace?.boards &&
            workspace.boards.length > 0 &&
            workspace.boards.map((boardId) => {
              return (
                <UserWorkspaceBoard
                  workspaceId={workspaceId}
                  boardId={boardId}
                  key={boardId}
                />
              );
            })}
        </div>
      )}
    </div>
  );
};

export default UserWorkspace;
