import React from "react";
import { Doc } from "../../../../../convex/_generated/dataModel";
import Link from "next/link";
import Image from "next/image";
import { currentUser } from "@clerk/nextjs/server";
import { fetchQuery } from "convex/nextjs";
import { api } from "../../../../../convex/_generated/api";

type Props = {
  workspace: Doc<"workspaces">;
};

const WorkspaceFields = async ({ workspace }: Props) => {
  const clerkUser = await currentUser();
  const loggedInUser = await fetchQuery(api.users.getUserByClerkId, {
    clerkId: clerkUser?.id as string,
  });

  return (
    <div className="flex flex-col gap-2">
      <Link
        href={`/dashboard/workspace/${workspace._id}/boards`}
        className="hover:bg-white/10 px-5 py-1 flex items-center gap-2"
      >
        <Image
          src="/icons/kanban.svg"
          alt="kanban board"
          width={15}
          height={15}
          className="text-primary-dark"
        />
        <span className="text-sm">Boards</span>
      </Link>

      <Link
        href={`/dashboard/workspace/${workspace._id}/members`}
        className="hover:bg-white/10 px-5 py-1 flex items-center gap-2"
      >
        <Image
          src="/icons/member-list.svg"
          alt="kanban board"
          width={15}
          height={15}
          className="text-primary-dark"
        />
        <span className="text-sm">Members</span>
      </Link>

      {workspace.admin === loggedInUser && (
        <Link
          href={`/dashboard/workspace/${workspace._id}/settings`}
          className="hover:bg-white/10 px-5 py-1 flex items-center gap-2"
        >
          <Image
            src="/icons/settings.svg"
            alt="kanban board"
            width={15}
            height={15}
            className="text-primary-dark"
          />
          <span className="text-sm">Workspace Settings</span>
        </Link>
      )}
    </div>
  );
};

export default WorkspaceFields;
