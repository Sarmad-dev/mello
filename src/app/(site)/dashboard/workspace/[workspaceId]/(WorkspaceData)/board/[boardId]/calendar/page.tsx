import React from "react";
import BoardCalendar from "./_components/BoardCalendar";
import { Id } from "../../../../../../../../../../convex/_generated/dataModel";

type CalendarPageProps = {
  params: Promise<{ boardId: string }>;
};

const CalendarPage = async ({ params }: CalendarPageProps) => {
  const { boardId } = await params;
  return <BoardCalendar boardId={boardId as Id<"boards">} />;
};

export default CalendarPage;
