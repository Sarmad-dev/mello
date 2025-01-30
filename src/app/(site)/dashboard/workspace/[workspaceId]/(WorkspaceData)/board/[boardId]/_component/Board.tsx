"use client";
import { useState } from "react";
import {
  Doc,
  Id,
} from "../../../../../../../../../../convex/_generated/dataModel";
import AddList from "./AddList";
import List from "./List";
import {
  closestCorners,
  DragEndEvent,
  DragOverEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  horizontalListSortingStrategy,
  SortableContext,
  sortableKeyboardCoordinates,
} from "@dnd-kit/sortable";
import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";
import { api } from "../../../../../../../../../../convex/_generated/api";
import { useMutation } from "convex/react";
import CardItem from "./CardItem";

const DNDContextDynamic = dynamic(
  () => import("@dnd-kit/core").then((mod) => mod.DndContext),
  { ssr: false }
);

interface Props {
  board: Doc<"boards">;
  lists: Doc<"lists">[];
}

const Board = ({ board, lists }: Props) => {
  const [boardLists, setBoardLists] = useState<Doc<"lists">[] | null>(lists!);
  const [activeItem, setActiveItem] = useState<JSX.Element | null>(null);
  const [overListId, setOverListId] = useState<Id<"lists"> | null>(null);
  const [overCardIndex, setOverCardIndex] = useState<number | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    if (active) {
      if (active.data.current?.type === "list") {
        const activeList = boardLists?.find((list) => list._id === active.id);
        setActiveItem(<List list={activeList!} />);
      } else {
        const activeCard = boardLists
          ?.flatMap((list) => list.cards)
          .find((card) => card === (active.id as Id<"cards">));
        setActiveItem(<CardItem cardId={activeCard!} />);
      }
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!active || !over) return;

    // Visual feedback only - no state updates
    const overType = over.data.current?.type;

    if (overType === "list") {
      setOverListId(over.id as Id<"lists">);
    } else if (overType === "card") {
      const overList = boardLists?.find((list) =>
        list.cards?.includes(over.id as Id<"cards">)
      );
      const index = overList?.cards?.findIndex((card) => card === over.id);
      setOverCardIndex(index ?? null);
      setOverListId(overList?._id ?? null);
    }
  };

  const updateBoardLists = useMutation(api.lists.updateBoardLists);
  const updateListCards = useMutation(api.cards.updateListCards);
  const updateDifferentListCards = useMutation(api.lists.updateListCards);
  // const addCardToEmptyList = useMutation(api.lists.addCardToEmptyList);

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    setOverListId(null);
    setOverCardIndex(null);

    if (!active || !over || !boardLists) return;

    const activeType = active.data.current?.type;
    const overType = over.data.current?.type;

    // Handle list reordering
    if (activeType === "list" && overType === "list") {
      if (active.id !== over.id) {
        const oldIndex = boardLists.findIndex((list) => list._id === active.id);
        const newIndex = boardLists.findIndex((list) => list._id === over.id);

        const newLists = arrayMove(boardLists, oldIndex, newIndex);
        setBoardLists(newLists);

        await updateBoardLists({
          boardId: board._id,
          activeListId: active.id as Id<"lists">,
          overListIndex: newIndex,
        });
      }
    }

    // Handle card movements
    if (activeType === "card" && (overType === "card" || overType === "list")) {
      const activeList = boardLists.find((list) =>
        list.cards?.includes(active.id as Id<"cards">)
      );
      const overList = boardLists.find((list) =>
        overType === "card"
          ? list.cards?.includes(over.id as Id<"cards">)
          : list._id === over.id
      );

      if (!activeList || !overList) return;

      const activeCardIndex = activeList.cards?.indexOf(
        active.id as Id<"cards">
      );
      const overCardIndex =
        overType === "card"
          ? overList.cards?.indexOf(over.id as Id<"cards">)
          : 0;

      if (activeList._id === overList._id) {
        // Same list movement
        const newCards = arrayMove(
          activeList.cards!,
          activeCardIndex!,
          overCardIndex!
        );

        const newLists = boardLists.map((list) =>
          list._id === activeList._id ? { ...list, cards: newCards } : list
        );

        setBoardLists(newLists);
        await updateListCards({
          activeCardId: active.id as Id<"cards">,
          listId: activeList._id,
          overCardIndex: overCardIndex!,
        });
      } else {
        // Different list movement
        const newSourceCards = activeList.cards?.filter(
          (card) => card !== active.id
        );
        const newDestinationCards = [
          ...(overList.cards?.slice(0, overCardIndex!) ?? []),
          active.id as Id<"cards">,
          ...(overList.cards?.slice(overCardIndex!) ?? []),
        ];

        const newLists = boardLists.map((list) => {
          if (list._id === activeList._id) {
            return { ...list, cards: newSourceCards };
          }
          if (list._id === overList._id) {
            return { ...list, cards: newDestinationCards };
          }
          return list;
        });

        setBoardLists(newLists);
        await updateDifferentListCards({
          activeListId: activeList._id,
          overListId: overList._id,
          activeCardId: active.id as Id<"cards">,
          overCardIndex: overCardIndex!,
        });
      }
    }
  };

  if (board === undefined || lists === undefined) {
    return (
      <div className="flex items-center justify-center h-screen w-full">
        <Loader2 className="animate-spin" width={70} height={70} />
      </div>
    );
  }

  return (
    <DNDContextDynamic
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={boardLists?.map((list) => list._id) || []}
        strategy={horizontalListSortingStrategy}
      >
        <div className="overflow-x-auto h-full w-full max-w-[87%] pl-4 py-4 flex gap-3">
          <AddList board={board!} lists={boardLists!} />
          {boardLists &&
            boardLists.map((list) => (
              <List
                key={list._id}
                list={list}
                isOver={list._id === overListId}
                overCardIndex={overCardIndex!}
                activeCard={activeItem!}
              />
            ))}
        </div>
      </SortableContext>

      {activeItem && <DragOverlay>{activeItem}</DragOverlay>}
    </DNDContextDynamic>
  );
};

export default Board;
