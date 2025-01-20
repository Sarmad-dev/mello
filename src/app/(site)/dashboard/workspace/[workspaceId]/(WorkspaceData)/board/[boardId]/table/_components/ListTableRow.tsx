import React from "react";
import {
  Doc,
} from "../../../../../../../../../../../convex/_generated/dataModel";
import ListTableRowData from "./ListTableRowData";

type Props = {
  list: Doc<"lists">;
};

const ListTableRow = ({ list }: Props) => {
  return (
    <>
      {list.cards?.map((cardId) => {
        return <ListTableRowData key={cardId} list={list} cardId={cardId} />;
      })}
    </>
  );
};

export default ListTableRow;
