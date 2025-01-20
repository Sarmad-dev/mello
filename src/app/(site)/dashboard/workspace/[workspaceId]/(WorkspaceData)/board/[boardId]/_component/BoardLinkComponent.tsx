
import { BoardLinkProps } from "@/lib/constants";
import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  boardLink: BoardLinkProps;
  workspaceId: string;
  boardId: string;
};

const BoardLinkComponent = ({ boardLink, workspaceId, boardId }: Props) => {
  const href = () => boardLink.href(workspaceId, boardId)
  
  return (
    <Link
      href={href()}
      className={`flex items-center gap-1 text-white hover:bg-black/20 px-4 py-1.5 rounded-sm`}
    >
      <Image src={boardLink.icon} alt="icon" width={15} height={15} />
      <span>{boardLink.title}</span>
    </Link>
  );
};

export default BoardLinkComponent;
