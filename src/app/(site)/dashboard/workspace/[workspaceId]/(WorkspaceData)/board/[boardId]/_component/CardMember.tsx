import Image from "next/image";
import React from "react";
import { Id } from "../../../../../../../../../../convex/_generated/dataModel";
import { api } from "../../../../../../../../../../convex/_generated/api";
import { useQuery } from "convex/react";
import Hint from "@/components/global/Hint";

type Props = {
  member: Id<"users">;
};

const CardMember = ({ member }: Props) => {
  const user = useQuery(api.users.getUserById, {
    userId: member,
  });
  return (
    <Hint side="bottom" hint={user?.name as string}>
      <div className="h-8 w-8 rounded-full bg-gray-400 relative" key={member}>
        {user?.image ? (
          <Image
            src={user?.image as string}
            alt="user image"
            fill
            className="rounded-full"
          />
        ) : undefined}
      </div>
    </Hint>
  );
};

export default CardMember;
