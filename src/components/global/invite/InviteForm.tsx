"use client";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { api } from "../../../../convex/_generated/api";
import { Doc, Id } from "../../../../convex/_generated/dataModel";
import { fetchQuery } from "convex/nextjs";
import { addMemberFromWorkspace } from "@/actions/action";
import { toast } from "sonner";
import { ConvexError } from "convex/values";

const InviteForm = ({ workspaceId }: { workspaceId: Id<"workspaces"> }) => {
  const [name, setName] = useState("");
  const [users, setUsers] = useState<Doc<"users">[] | null>(null);

  const handleAddMemberToWorkspace = async (memberId: Id<"users">) => {
    try {
      await addMemberFromWorkspace({
        workspaceId,
        memberId,
        path: `/dashboard/workspace/${workspaceId}`,
      });

      toast.success("Member added");
    } catch (error) {
      if (error instanceof ConvexError)
        throw new Error(`Something went wrong: ${error.message}`);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <Input
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={name}
        onKeyDown={async (e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            const users = await fetchQuery(api.users.getUserByName, { name });
            setUsers(users);
          }
        }}
      />
      <div className="flex flex-col gap-3 w-full">
        {users?.map((user) => (
          <div
            key={user._id}
            onClick={() => handleAddMemberToWorkspace(user._id)}
            className="w-full px-3 py-2 rounded-sm text-white bg-white/10 hover:bg-white/20"
          >
            {user.name}
          </div>
        ))}
      </div>
    </div>
  );
};

export default InviteForm;
