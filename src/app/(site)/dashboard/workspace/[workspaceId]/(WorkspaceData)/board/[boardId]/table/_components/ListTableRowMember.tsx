import React from "react";
import { Id } from "../../../../../../../../../../../convex/_generated/dataModel";
import Hint from "@/components/global/Hint";
import Image from "next/image";
import { useQuery } from "convex/react";
import { api } from "../../../../../../../../../../../convex/_generated/api";

type Props = {
  memberId: Id<"users">;
};

const ListTableRowMember = ({ memberId }: Props) => {
  const member = useQuery(api.users.getUserById, { userId: memberId });
  return (
    <Hint
      side="bottom"
      hint={member?.name as string}
      className="bg-slate-600 text-white"
    >
      {member?.image ? (
        <Image
          src={member?.image as string}
          alt="user image"
          width={30}
          height={30}
          className="rounded-full"
        />
      ) : (
        <div className="h-[30px] w-[30px] rounded-full flex items-center justify-center text-black font-semibold text-lg bg-gray-300">
          {member?.name.charAt(0)}
        </div>
      )}
    </Hint>
  );
};

export default ListTableRowMember;
