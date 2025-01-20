import React from "react";
import { Id } from "../../../../../../../../../../convex/_generated/dataModel";
import Image from "next/image";
import { useQuery } from "convex/react";
import { api } from "../../../../../../../../../../convex/_generated/api";

type Props = {
  memberId: Id<"users">;
};

const Member = ({ memberId }: Props) => {
  const member = useQuery(api.users.getUserById, { userId: memberId });
  return (
    <div className="flex items-center px-2 gap-3 w-full py-1 rounded-sm bg-white/10">
      <div className="h-8 w-8 rounded-full relative">
        <Image
          src={member?.image as string}
          alt="member image"
          fill
          className="rounded-full"
        />
      </div>
      <p className="text-white text-sm">{member?.name}</p>
    </div>
  );
};

export default Member;
