import React from "react";
import {
  Doc,
  Id,
} from "../../../../../../../../../../../convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { api } from "../../../../../../../../../../../convex/_generated/api";
import { TableCell, TableRow } from "@/components/ui/table";
import DueDate from "../../_component/DueDate";
import ListTableRowMember from "./ListTableRowMember";

type Props = {
  cardId: Id<"cards">;
  list: Doc<"lists">;
};

const ListTableRowData = ({ cardId, list }: Props) => {
  const card = useQuery(api.cards.getCardById, { cardId });

  return (
    <TableRow className="flex items-center">
      <TableCell className="flex-1">{card?.title}</TableCell>
      <TableCell className="flex-1">{list.title}</TableCell>
      <TableCell className="flex-1">
        {card?.labels && card?.labels.length > 0 ? (
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
          {card?.members && card.members.length > 0
            ? card.members.map((memberId) => {
                return <ListTableRowMember memberId={memberId} key={memberId} />;
              })
            : "-"}
        </div>
      </TableCell>
      <TableCell className="flex-1">
        {card?.date ? <DueDate date={card.date} cardId={card._id} /> : "-"}
      </TableCell>
    </TableRow>
  );
};

export default ListTableRowData;
