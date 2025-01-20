import React from "react";
import { BoardData } from "@/lib/types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";
import { fetchQuery } from "convex/nextjs";
import { api } from "../../../convex/_generated/api";
import Hint from "./Hint";
import DueDate from "@/app/(site)/dashboard/workspace/[workspaceId]/(WorkspaceData)/board/[boardId]/_component/DueDate";

type Props = {
  boards: BoardData[];
};

const ListTable = ({ boards }: Props) => {
  return (
    <div className="bg-black rounded-md h-full p-2">
      <Table>
        <TableHeader>
          <TableRow className="flex items-center">
            <TableHead className="flex-1">Card</TableHead>
            <TableHead className="flex-1">List</TableHead>
            <TableHead className="flex-1">Labels</TableHead>
            <TableHead className="flex-1">Members</TableHead>
            <TableHead className="flex-1">Due date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="min-w-full overflow-auto">
          {boards.map((board) =>
            board.lists.map((list) =>
              list.cards.map((card) => (
                <TableRow key={card._id} className="flex items-center">
                  <TableCell className="flex-1">{card.title}</TableCell>
                  <TableCell className="flex-1">{list.title}</TableCell>
                  <TableCell className="flex-1">
                    {card.labels && card.labels.length > 0 ? (
                      <div className="flex items-center gap-1 flex-wrap max-w-full">
                        {card.labels.map((label) => (
                          <div
                            className="px-2 rounded-md text-white"
                            key={label.id}
                            style={{
                              backgroundColor: label.color,
                            }}
                          >
                            {label.title}
                          </div>
                        ))}
                      </div>
                    ) : (
                      "-"
                    )}
                  </TableCell>
                  <TableCell className="flex-1">
                    <div className="flex items-center gap-1 flex-wrap">
                      {card.members && card.members.length > 0
                        ? card.members.map(async (memberId) => {
                            const member = await fetchQuery(
                              api.users.getUserById,
                              { userId: memberId }
                            );

                            return (
                              <Hint
                                side="bottom"
                                hint={member?.name as string}
                                className="bg-slate-600 text-white"
                                key={member?._id}
                              >
                                <Image
                                  src={member?.image as string}
                                  alt="user image"
                                  width={30}
                                  height={30}
                                  className="rounded-full"
                                />
                              </Hint>
                            );
                          })
                        : "-"}
                    </div>
                  </TableCell>
                  <TableCell className="flex-1">
                    {card.date ? (
                      <DueDate date={card.date} cardId={card._id} />
                    ) : (
                      "-"
                    )}
                  </TableCell>
                </TableRow>
              ))
            )
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default ListTable;
