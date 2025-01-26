import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { Doc, Id } from "../../../../convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { fetchMutation } from "convex/nextjs";
import { useParams, useSearchParams } from "next/navigation";
import { ConvexError } from "convex/values";

const CardMemberInvite = () => {
  const [name, setName] = useState("");
  const [users, setUsers] = useState<Doc<"users">[] | null>(null);

  const { workspaceId } = useParams();
  const cardId = useSearchParams().get("cardId");

  const members = useQuery(api.workspaces.getWorkspaceMembers, {
    workspaceId: workspaceId as Id<"workspaces">,
  });

  const card = useQuery(api.cards.getCardById, {
    cardId: cardId as Id<"cards">,
  });

  const handleInviteMembers = async (memberId: Id<"users">) => {
    try {
      await fetchMutation(api.cards.invteMembersToCard, {
        cardId: cardId as Id<"cards">,
        memberId,
      });
    } catch (error) {
      if (error instanceof ConvexError)
        throw new Error(`Something went wrong: ${error.message}`);
      else throw new Error("Something went wrong");
    }
  };
  return (
    <>
      <Input
        type="text"
        onChange={(e) => setName(e.target.value)}
        value={name}
        onKeyDown={async (e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            const foundUser = members?.find(
              (member) =>
                member?.name === name && !card?.members?.includes(member._id)
            );
            setUsers(foundUser ? [foundUser] : null);
          }
        }}
      />
      <div className="flex flex-col gap-3">
        {users?.map((user) => (
          <div
            key={user._id}
            onClick={() => handleInviteMembers(user._id)}
            className="px-3 py-2 rounded-sm text-white bg-white/10 hover:bg-white/20 cursor-pointer"
          >
            {user.name}
          </div>
        ))}
      </div>
    </>
  );
};

export default CardMemberInvite;
