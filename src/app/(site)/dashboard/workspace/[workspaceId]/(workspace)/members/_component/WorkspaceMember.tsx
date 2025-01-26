"use client";
import React from "react";
import { Doc } from "../../../../../../../../../convex/_generated/dataModel";
import Image from "next/image";
import { api } from "../../../../../../../../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import { useQuery } from "convex/react";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { removeMemberFromWorkspace } from "@/actions/action";
import { Separator } from "@/components/ui/separator";
import { ConvexError } from "convex/values";

type Props = {
  member: Doc<"users">;
  workspace: Doc<"workspaces">;
};

const WorkspaceMember = ({ member, workspace }: Props) => {
  const clerkUser = useUser();
  const loggedInUser = useQuery(api.users.getUserByClerkId, {
    clerkId: clerkUser?.user?.id as string,
  });

  const handleRemoveMember = async () => {
    try {
      await removeMemberFromWorkspace({
        workspaceId: workspace._id,
        memberId: member._id,
        path: `/dashboard/workspace/${workspace._id}`,
      });

      toast.success("Member Removed");
    } catch (error) {
      if (error instanceof ConvexError)
        throw new Error(`Something went wrong: ${error.message}`);
    }
  };

  return (
    <>
      <div className="w-full rounded-sm flex justify-between items-center">
        <div className="flex items-center gap-2">
          {member?.image ? (
            <Image
              src={member.image}
              alt="member image"
              width={35}
              height={35}
              className="rounded-full"
            />
          ) : (
            <div className="w-[25px] h-[25px] rounded-full bg-orange-300 text-white">
              <p className="font-semibold text-lg">{member?.name.charAt(0)}</p>
            </div>
          )}

          <div className="flex flex-col">
            <p>{member.name}</p>
          </div>
        </div>

        {member._id === loggedInUser && (
          <Button
            className="bg-white/10 hover:bg-white/20 text-white rounded-sm"
            onClick={handleRemoveMember}
          >
            Leave
          </Button>
        )}

        {workspace.admin === member._id && (
          <div className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white rounded-sm">
            Admin
          </div>
        )}

        {workspace.admin === loggedInUser && (
          <Button
            className="bg-white/10 hover:bg-white/20 text-white rounded-sm"
            onClick={handleRemoveMember}
          >
            Remove
          </Button>
        )}
      </div>
      <Separator />
    </>
  );
};

export default WorkspaceMember;
