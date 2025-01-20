"use client";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import { format } from "date-fns/format";
import { parse } from "date-fns/parse";
import { startOfWeek } from "date-fns/startOfWeek";
import { getDay } from "date-fns/getDay";
import { enUS } from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useEffect, useState } from "react";
import { CalendarEventProps } from "@/lib/types";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";
import { fetchQuery } from "convex/nextjs";
import { useQueryState } from "nuqs";
import CardDetailDialog from "@/app/(site)/dashboard/workspace/[workspaceId]/(WorkspaceData)/board/[boardId]/_component/CardDetailDialog";

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

type CalendarProps = {
  workspaceId: Id<"workspaces">;
};

const MyCalendar = ({ workspaceId }: CalendarProps) => {
  const [events, setEvents] = useState<CalendarEventProps[] | null>(null);
  const [cardId, setCardId] = useQueryState("cardId", {
    defaultValue: "",
    clearOnDefault: true,
  });

  useEffect(() => {
    const setCardEvents = async () => {
      const boardData = await fetchQuery(api.workspaces.getWorkspaceData, {
        workspaceId,
      });

      const cards = boardData
        ?.flatMap((board) => board.lists) // Extract all lists from each board
        .flatMap((list) => list.cards); // Extract all cards from each list

      const cardEvents = cards?.map((card) => ({
        id: card._id,
        title: card.title,
        start: new Date(card.date?.date as string),
        end: new Date(card.date?.date as string),
      }));

      setEvents(cardEvents!);
    };

    setCardEvents();
  }, [workspaceId]);

  return (
    <>
      {cardId && <CardDetailDialog />}
      <div className="h-[calc(100vh-60px)] p-3">
        <Calendar
          events={events ? events : []}
          step={60}
          popup={true}
          localizer={localizer}
          startAccessor="start"
          endAccessor="end"
          style={{ height: "100%", borderRadius: "12px" }}
          onSelectEvent={(event) => setCardId(event.id)}
          components={{
            day: {
              event: (props) => <div>{props.event.id}</div>,
            },
          }}
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

export default MyCalendar;
