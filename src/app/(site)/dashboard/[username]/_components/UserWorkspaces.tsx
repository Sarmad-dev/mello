import React from "react";
import { Doc } from "../../../../../../convex/_generated/dataModel";
import UserWorkspace from "./UserWorkspace";

const UserWorkspaces = ({ user }: { user: Doc<"users"> }) => {
  return (
    <section>
      <h3 className="text-lg font-semibold">All Workspaces</h3>
      <div className="flex flex-col">
        {user.workspaces &&
          user.workspaces.length > 0 &&
          user.workspaces.map((workspaceId) => (
            <UserWorkspace workspaceId={workspaceId} key={workspaceId} />
          ))}
      </div>
    </section>
  );
};

export default UserWorkspaces;
