"use client";
import { CalendarEventProps } from "@/lib/types";
import { useQueryState } from "nuqs";
import React, { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import {
  Doc,
  Id,
} from "../../../../../../../../../../../convex/_generated/dataModel";
import { fetchQuery } from "convex/nextjs";
import { api } from "../../../../../../../../../../../convex/_generated/api";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { format } from "date-fns/format";
import { parse } from "date-fns/parse";
import { startOfWeek } from "date-fns/startOfWeek";
import { getDay } from "date-fns/getDay";
import { enUS } from "date-fns/locale/en-US";
import CardDetailDialog from "../../_component/CardDetailDialog";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

type Props = {
  boardId: Id<"boards">;
};

const BoardCalendar = ({ boardId }: Props) => {
  const [events, setEvents] = useState<CalendarEventProps[] | null>(null);
  const [cardId, setCardId] = useQueryState("cardId", {
    defaultValue: "",
    clearOnDefault: true,
  });

  useEffect(() => {
    const setCardEvents = async () => {
      const lists = await fetchQuery(api.lists.getListsByBoardId, {
        boardId,
      });

      const cardIds = lists?.flatMap((list) => list?.cards); // Extract all cards from each list

      const cards: Doc<"cards">[] = [];

      if (cardIds) {
        for (const cardId of cardIds) {
          const card = await fetchQuery(api.cards.getCardById, {
            cardId: cardId as Id<"cards">,
          });
          cards.push(card!);
        }
      }

      const cardEvents = cards?.map((card) => ({
        id: card?._id,
        title: card?.title,
        start: new Date(card.date?.date as string),
        end: new Date(card.date?.date as string),
      }));

      console.log("Card Events: ", cardEvents);
      setEvents(cardEvents!);
    };

    setCardEvents();
  }, [boardId]);

  return (
    <>
      {cardId && <CardDetailDialog />}
      <div
        className="p-3"
        style={{
          height: "calc(100vh - 135px)",
          width: "calc(100vw - 300px)",
        }}
      >
        <Calendar
          events={events ? events : []}
          popup={true}
          localizer={localizer}
          startAccessor="start"
          endAccessor="end"
          style={{ height: "100%", width: "100%", borderRadius: "12px" }}
          onSelectEvent={(event) => setCardId(event.id)}
          eventPropGetter={() => {
            const backgroundColor = "#ff5722";
            return {
              style: {
                backgroundColor,
                color: "white",
                width: "200px",
                marginInline: "auto",
                borderRadius: "3px",
              },
            };
          }}
        />
      </div>
    </>
  );
};

export default BoardCalendar;
