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
import CardItem from "./CardItem";
import { Loader2 } from "lucide-react";
import { fetchMutation } from "convex/nextjs";
import { api } from "../../../../../../../../../../convex/_generated/api";

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
  const [activeListId, setActiveListId] = useState<Id<"lists"> | null>(null);
  const [overListId, setOverListId] = useState<Id<"lists"> | null>(null);
  const [overIndex, setOverIndex] = useState<number | null>(null);
  const [activeItem, setActiveItem] = useState<JSX.Element | null>(null);

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

    const activeType = active.data.current?.type;
    const overType = over.data.current?.type;

    if (activeType === "list" && overType === "list") {
      if (active.id !== over.id) {
        setActiveListId(active.id as Id<"lists">);
        setOverListId(over.id as Id<"lists">);

        const activeListIndex = boardLists?.findIndex(
          (lists) => lists._id === active.id
        );
        const overListIndex = boardLists?.findIndex(
          (lists) => lists._id === over.id
        );

        setOverIndex(overListIndex!);
        setBoardLists((prevLists) => {
          return arrayMove(prevLists!, activeListIndex!, overListIndex!);
        });
      }
    }

    if (activeType === "card" && overType === "card") {
      if (active.id === over.id) return;
      const activeList = boardLists?.find((list) =>
        list.cards?.includes(active.id as Id<"cards">)
      );
      const overList = boardLists?.find((list) =>
        list.cards?.includes(over.id as Id<"cards">)
      );

      setActiveListId(activeList?._id as Id<"lists">);
      setOverListId(overList?._id as Id<"lists">);

      const overCardIndex = overList?.cards?.findIndex(
        (card) => card === over.id
      );
      setOverIndex(overCardIndex!);

      if (activeList?._id === overList?._id) {
        setBoardLists((prevLists) => {
          if (!prevLists) return null;

          const updatedLists = prevLists.map((list) => {
            if (list._id === activeList?._id && list._id === overList?._id) {
              const listWitoutActiveCard = list.cards?.filter(
                (card) => card !== active.id
              );
              return {
                ...list,
                cards: [
                  ...(listWitoutActiveCard?.slice(0, overCardIndex!) ?? []),
                  active.id as Id<"cards">,
                  ...(listWitoutActiveCard?.slice(overCardIndex!) ?? []),
                ] as Id<"cards">[],
              };
            }

            return list;
          });

          return updatedLists;
        });
      } else {
        setBoardLists((prevLists) => {
          if (!prevLists) return null;
          const updatedLists = prevLists.map((list) => {
            if (list._id === activeList?._id) {
              const updatedCards = list.cards?.filter(
                (card) => card !== active.id
              );
              return {
                ...list,
                cards: updatedCards,
              };
            } else if (list._id === overList?._id) {
              const updatedCards = [
                ...(list.cards?.slice(0, overCardIndex) ?? []),
                active.id as Id<"cards">,
                ...(list.cards?.slice(overCardIndex) ?? []),
              ] as Id<"cards">[];
              return {
                ...list,
                cards: updatedCards,
              };
            }
            return list;
          });
          return updatedLists;
        });
      }
    }

    if (activeType === "card" && overType === "list") {
      const overList = boardLists?.find((list) => list._id === over.id);
      const activeList = boardLists?.find((list) =>
        list.cards?.includes(active.id as Id<"cards">)
      );

      if (over.id === activeListId) return;

      if (over.id !== overListId) {
        setActiveListId(activeList?._id as Id<"lists">);
        setOverListId(over.id as Id<"lists">);

        console.log("Active Over List ID: ", activeList?._id);
        console.log("Over Over List ID: ", overList?._id);

        if (overList?.cards?.length === 0 && activeList?._id !== over.id) {
          setBoardLists((prevLists) => {
            if (!prevLists) return null;

            const updatedLists = prevLists.map((list) => {
              if (list._id === activeList?._id) {
                return {
                  ...list,
                  cards: list.cards?.filter(
                    (card) => card !== active.id
                  ) as Id<"cards">[],
                };
              } else if (list._id === over?.id) {
                return {
                  ...list,
                  cards: [active.id as Id<"cards">],
                };
              }

              return list;
            });

            return updatedLists;
          });
        }

        return;
      }
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (!active || !over) return;

    const activeType = active.data.current?.type;
    const overType = over.data.current?.type;

    if (activeType === "list" && overType === "list") {
      await fetchMutation(api.lists.updateBoardLists, {
        boardId: board._id,
        activeListId: activeListId as Id<"lists">,
        overListIndex: overIndex!,
      });
    }

    if (activeType === "card" && overType === "card") {
      const overList = boardLists?.find((list) => list._id === overListId);

      if (overList?.cards?.length === 1) {
        console.log("Active End List ID: ", activeListId);
        console.log("Over End List ID: ", overListId);

        await fetchMutation(api.lists.addCardToEmptyList, {
          activeCardId: active.id as Id<"cards">,
          activeListId: activeListId!,
          overListId: overListId!,
        });

        return;
      }
      if (activeListId === overListId) {
        await fetchMutation(api.cards.updateListCards, {
          activeCardId: active.id as Id<"cards">,
          listId: activeListId!,
          overCardIndex: overIndex!,
        });
      }

      if (activeListId !== overListId) {
        await fetchMutation(api.lists.updateListCards, {
          activeListId: activeListId!,
          overListId: overListId!,
          activeCardId: active.id as Id<"cards">,
          overCardIndex: overIndex!,
        });
      }
    }

    if (activeType === "card" && overType === "list") {
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
            boardLists.length > 0 &&
            boardLists.map((list) => <List key={list._id} list={list} />)}
        </div>
      </SortableContext>

      {activeItem && <DragOverlay>{activeItem}</DragOverlay>}
    </DNDContextDynamic>
  );
};

export default Board;
