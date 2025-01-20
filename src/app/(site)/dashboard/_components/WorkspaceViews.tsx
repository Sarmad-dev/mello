import React from "react";
import { Doc } from "../../../../../convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

type Props = {
  workspace: Doc<"workspaces">;
};

const WorkspaceViews = ({ workspace }: Props) => {
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between px-5 py-1">
        <span className="font-semibold">Workspace Views</span>
        <Button className="px-0 h-[90%] aspect-square py-0 bg-transparent hover:bg-white/10">
          <Plus className="text-primary-dark" />
        </Button>
      </div>

      <div className="flex flex-col gap-2">
        <Link
          href={`/dashboard/workspace/${workspace._id}/table`}
          className="hover:bg-white/10 px-5 py-1 flex items-center gap-2"
        >
          <Image
            src="/icons/table.svg"
            alt="kanban board"
            width={15}
            height={15}
            className="text-primary-dark"
          />
          <span className="text-sm">Table</span>
        </Link>

        <Link
          href={`/dashboard/workspace/${workspace._id}/calendar`}
          className="hover:bg-white/10 px-5 py-1 flex items-center gap-2"
        >
          <Image
            src="/icons/calender.svg"
            alt="kanban board"
            width={15}
            height={15}
            className="text-primary-dark"
          />
          <span className="text-sm">Calender</span>
        </Link>
      </div>
    </div>
  );
};

export default WorkspaceViews;
