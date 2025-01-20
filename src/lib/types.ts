import { Id } from "../../convex/_generated/dataModel";

export type updateCardProps = {
  description?: string;
  background_color?: string;
  label?: { id: number; color: string; title: string };
  watch?: boolean;
};

export type BoardData = {
  _id: Id<"boards">;
  _creationTime: number;
  title: string;
  visibility: "private" | "public";
  background_colors: string[];
  workspace: Id<"workspaces">;
  lists: Array<{
    _id: Id<"lists">;
    _creationTime: number;
    title: string;
    board: Id<"boards">;
    cards: Array<{
      _id: Id<"cards">;
      _creationTime: number;
      title: string;
      background_color?: string;
      list: Id<"lists">;
      description?: string;
      labels?: Array<{
        id: number;
        title: string;
        color: string;
      }>;
      watch: boolean;
      members?: Id<"users">[];
      date?: {
        date: string;
        status: boolean;
      };
      attachment?: Id<"_storage">[];
    }>;
  }>;
};

export type CalendarEventProps = {
  id: Id<"cards">;
  title: string;
  start: Date;
  end: Date;
};
