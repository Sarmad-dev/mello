"use client";
import React, { useState } from "react";
import { Doc } from "../../../../../convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

type Props = {
  workspace: Doc<"workspaces">;
};

const LeftsidebarWorkspaceItem = ({ workspace }: Props) => {
  const [extend, setExtend] = useState(false);
  return (
    <div className="flex flex-col">
      <Button
        className="bg-transparent hover:bg-gray-700 text-white/80 flex items-center justify-between"
        onClick={() => setExtend((prev) => !prev)}
      >
        {workspace.name}
        {extend ? <ChevronUp /> : <ChevronDown />}
      </Button>
    </div>
  );
};

export default LeftsidebarWorkspaceItem;
