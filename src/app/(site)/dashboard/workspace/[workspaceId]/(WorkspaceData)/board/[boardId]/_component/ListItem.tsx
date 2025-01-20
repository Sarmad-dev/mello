"use client";
import React, { useEffect, useState } from "react";
import { Doc } from "../../../../../../../../../../convex/_generated/dataModel";
import { Menu } from "lucide-react";
import AddCard from "./AddCard";
import { api } from "../../../../../../../../../../convex/_generated/api";
import Card from "./Card";
import { useQuery } from "convex/react";

type Props = {
  list: Doc<"lists">;
};

const ListItem = ({ list }: Props) => {
  const cards = useQuery(api.cards.getListCards, {
    listId: list._id,
  });

  const [listCards, setListCards] = useState<Doc<"cards">[] | null>(null);

  useEffect(() => {
    setListCards(cards!);
  }, [cards]);

  return (
    <div className="min-w-[300px] max-w-[300px] rounded-lg p-3 bg-black/90 h-fit flex flex-col gap-2">
      <div className="flex items-center justify-between">
        <p>{list?.title}</p>
        <Menu />
      </div>
      <div className="flex flex-col-reverse gap-1">
        <AddCard listId={list._id} />
        {listCards &&
          listCards.length > 0 &&
          listCards.map((card) => <Card card={card} key={card._id} />)}
      </div>
    </div>
  );
};

export default ListItem;
