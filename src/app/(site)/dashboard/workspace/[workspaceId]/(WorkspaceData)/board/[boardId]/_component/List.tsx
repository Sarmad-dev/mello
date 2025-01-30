"use client";
import React from "react";
import { Doc } from "../../../../../../../../../../convex/_generated/dataModel";
import { Menu } from "lucide-react";
import AddCard from "./AddCard";
import Card from "./Card";
import { CSS } from "@dnd-kit/utilities";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { useDndContext } from "@dnd-kit/core";

type Props = {
  list: Doc<"lists">;
  isOver?: boolean;
  overCardIndex?: number | null;
  activeCard?: JSX.Element;
};

const List = ({
  list,
  isOver,
  overCardIndex,
  activeCard: ActiveCard,
}: Props) => {
  const {
    attributes,
    listeners,
    transform,
    setNodeRef: setSortableRef,
    isDragging,
    transition,
    setActivatorNodeRef,
  } = useSortable({
    id: list._id,
    data: {
      type: "list",
    },
    animateLayoutChanges: ({ isDragging }) => !isDragging,
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.3 : 1,
    transition,
  };

  const { active, over } = useDndContext();

  return (
    <div
      className={`min-w-[300px] max-w-[300px] rounded-lg p-3 bg-black/90 h-fit flex flex-col gap-2 ${
        isOver ? "ring-2 ring-blue-500" : ""
      }`}
      style={style}
      ref={setSortableRef}
    >
      <div
        className="flex items-center justify-between"
        ref={setActivatorNodeRef}
        {...listeners}
        {...attributes}
      >
        <p>{list?.title}</p>
        <Menu />
      </div>
      <div className="flex flex-col-reverse gap-1">
        <AddCard listId={list._id} />
        <SortableContext
          items={list.cards!}
          strategy={verticalListSortingStrategy}
        >
          {list.cards && list.cards.length > 0
            ? list.cards.map((cardId, index) => (
                <React.Fragment key={cardId}>
                  {isOver &&
                    overCardIndex === index &&
                    active?.id !== over?.id &&
                    ActiveCard}
                  <Card cardId={cardId} key={cardId} />
                </React.Fragment>
              ))
            : null}
          {isOver &&
            overCardIndex === list.cards?.length &&
            active?.id !== over?.id &&
            ActiveCard}
        </SortableContext>
      </div>
    </div>
  );
};

export default List;
