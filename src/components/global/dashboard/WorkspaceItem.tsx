import React from "react";

type Props = {
    workspaceName: string;
    className?: string;
};

const WorkspaceItem = ({ workspaceName, className }: Props) => {
  return (
    <div className={`flex items-center gap-3 px-2 ${className}`}>
      <p className="w-10 h-10 rounded-md text-white flex items-center justify-center text-xl bg-gradient-to-r from-orange-400 to-red-400">
        {workspaceName.charAt(0).toUpperCase()}
      </p>
      <span className="text-sm">{workspaceName}</span>
    </div>
  );
};

export default WorkspaceItem;
