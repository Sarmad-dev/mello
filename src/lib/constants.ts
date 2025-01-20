import { Earth, Lock, LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export const workspaceSelectItem = [
  { title: "Business", value: "business" },
  { title: "Web Development", value: "web-development" },
  { title: "Data Science", value: "data-science" },
];

export const BoardBackgroundColors = [
  ["#fbd808", "#ff9005", "#f9530b"],
  ["#16a34a", "#15803d", "#166534"],
  ["#f87171", "#ef4444", "#dc2626"],
  ["#1d4ed8", "#1e40af", "#1e3a8a"],
  ["#e11d48", "#be123c", "#9f1239"],
  ["#c026d3", "#a21caf", "#86198f"],
];

type VisibilityParams = {
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  title: "Private" | "Public";
  description: string;
  value: "private" | "public";
};

export const Visibility: VisibilityParams[] = [
  {
    icon: Lock,
    title: "Private",
    description: "Board members and admin can see and edit this board",
    value: "private",
  },
  {
    icon: Earth,
    title: "Public",
    description:
      "Anyone one the internet can see this board. Only board members can edit.",
    value: "public",
  },
];

export type LabelProps = {
  id: number;
  title: string;
  color: string;
};

export const CardBackgroundColors = [
  { id: 1, color: "#ff5733" },
  { id: 2, color: "#A0E7E5" },
  { id: 3, color: "#FFAEBC" },
  { id: 4, color: "#BD97CB" },
  { id: 5, color: "#FBC740" },
];

export const Labels: LabelProps[] = [
  { id: 1, title: "Copy Request", color: "#FFA500" },
  { id: 2, title: "One more step", color: "#E55B13" },
  { id: 3, title: "Priority", color: "#DF362D" },
  { id: 4, title: "Design Team", color: "#9d00ff" },
  { id: 5, title: "Product Marketing", color: "#003060" },
  { id: 6, title: "Mello Tip", color: "#ADA7A7" },
  { id: 7, title: "Help", color: "#0A7029" },
];

type BoardParams = {
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  title: "Private" | "Public";
  description: string;
  value: "admin" | "member";
};

export const BoardCreation: BoardParams[] = [
  {
    icon: Lock,
    title: "Private",
    description: "Only admin can create boards in this workspace.",
    value: "admin",
  },
  {
    icon: Earth,
    title: "Public",
    description: "All workspace members can create boards in this workspace.",
    value: "member",
  },
];

export const BoardDeletion: BoardParams[] = [
  {
    icon: Lock,
    title: "Private",
    description: "Only admin can delete boards in this workspace.",
    value: "admin",
  },
  {
    icon: Earth,
    title: "Public",
    description: "All workspace members can delete boards in this workspace.",
    value: "member",
  },
];

export const BoardSharing: BoardParams[] = [
  {
    icon: Lock,
    title: "Private",
    description: "Only admin can share boards in this workspace.",
    value: "admin",
  },
  {
    icon: Earth,
    title: "Public",
    description: "All workspace members can share boards in this workspace.",
    value: "member",
  },
];

export type BoardLinkProps = {
  title: string;
  icon: string;
  href: (workspaceId: string, boardId: string) => string;
};

export const BoardLinks: BoardLinkProps[] = [
  {
    title: "Board",
    icon: "/icons/kanban-white.svg",
    href: (workspaceId, boardId) =>
      `/dashboard/workspace/${workspaceId}/board/${boardId}`,
  },
  {
    title: "Table",
    icon: "/icons/table-white.svg",
    href: (workspaceId: string, boardId: string) =>
      `/dashboard/workspace/${workspaceId}/board/${boardId}/table`,
  },
  {
    title: "Calendar",
    icon: "/icons/calendar-white.svg",
    href: (workspaceId: string, boardId: string) =>
      `/dashboard/workspace/${workspaceId}/board/${boardId}/calendar`,
  },
];

export const featuresImages = [
  "/images/Board.png",
  "/images/List.png",
  "/images/Card.png",
];

export const features = [
  {
    id: 0,
    title: "Boards",
    description:
      "Trello boards keep tasks organized and work moving forward. In a glance, see everything from “things to do” to “aww yeah, we did it!”",
  },
  {
    id: 1,
    title: "Lists",
    description:
      "The different stages of a task. Start as simple as To Do, Doing or Done—or build a workflow custom fit to your team’s needs. There’s no wrong way to Trello.",
  },
  {
    id: 2,
    title: "Cards",
    description:
      "Cards represent tasks and ideas and hold all the information to get the job done. As you make progress, move cards across lists to show their status.",
  },
];
