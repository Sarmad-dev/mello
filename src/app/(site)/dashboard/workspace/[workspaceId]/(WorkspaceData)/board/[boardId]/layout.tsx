import { fetchQuery } from "convex/nextjs";
import React from "react";
import { api } from "../../../../../../../../../convex/_generated/api";
import { Id } from "../../../../../../../../../convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { Lock } from "lucide-react";
import { BoardLinks } from "@/lib/constants";
import BoardLinkComponent from "./_component/BoardLinkComponent";

type BoardLayoutProps = {
  params: Promise<{ boardId: string; workspaceId: string }>;
  children: React.ReactNode;
};

const BoardLayout = async ({ params, children }: BoardLayoutProps) => {
  const { boardId, workspaceId } = await params;
  const board = await fetchQuery(api.boards.getBoardById, {
    boardId: boardId as Id<"boards">,
  });
  return (
    <div
      className="h-full w-screen"
      style={{
        background: `linear-gradient(to right, ${board?.background_colors[0]}, ${board?.background_colors[1]}, ${board?.background_colors[2]})`,
      }}
    >
      <div className="w-full h-[75px] bg-black/20 flex items-center justify-between px-6">
        <div className="flex items-center gap-5">
          <h2 className="text-white">{board?.title}</h2>
          <Button className="bg-transparent hover:bg-black/20 text-white rounded-sm">
            <Lock />
            <span>{board?.visibility === "public" ? "Public" : "Private"}</span>
          </Button>
          {BoardLinks.map((boardLink) => (
            <BoardLinkComponent
              key={boardLink.title}
              boardLink={boardLink}
              workspaceId={workspaceId}
              boardId={boardId}
            />
          ))}
        </div>
      </div>
      {children}
    </div>
  );
};

export default BoardLayout;
