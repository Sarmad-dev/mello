import React from "react";
import MyCalendar from "../../../../../../components/global/Calendar";
import { Id } from "../../../../../../../convex/_generated/dataModel";

type Props = {
  params: Promise<{ workspaceId: string }>
}

const CalendarPage = async ({ params }: Props) => {
  const { workspaceId } = await params;

  return <MyCalendar workspaceId={workspaceId as Id<"workspaces">} />;
};

export default CalendarPage;
