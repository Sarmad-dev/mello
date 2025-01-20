"use client";
import React from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Doc } from "../../../../../../../../../../../convex/_generated/dataModel";
import ListTableRow from "./ListTableRow";

type Props = {
  lists: Doc<"lists">[];
};

const BoardListsTable = ({ lists }: Props) => {
  return (
    <div
      className="bg-black rounded-md h-full p-2"
    >
      <Table>
        <TableHeader>
          <TableRow className="flex items-center">
            <TableHead className="flex-1 font-semibold">Card</TableHead>
            <TableHead className="flex-1 font-semibold">List</TableHead>
            <TableHead className="flex-1 font-semibold">Labels</TableHead>
            <TableHead className="flex-1 font-semibold">Members</TableHead>
            <TableHead className="flex-1 font-semibold">Due date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="w-full max-w-full overflow-auto">
          {lists.map((list) => (
            <ListTableRow list={list} key={list._id} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default BoardListsTable;
