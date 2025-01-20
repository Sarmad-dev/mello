import React, { useState } from "react";
import { Doc } from "../../../../../../../../../../convex/_generated/dataModel";
import Calendar from "react-calendar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import "react-calendar/dist/Calendar.css";
import { formateDate } from "@/lib/utils";
import { fetchMutation } from "convex/nextjs";
import { api } from "../../../../../../../../../../convex/_generated/api";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

type Props = {
  card: Doc<"cards">;
  children: React.ReactNode;
};

const DatesDropdown = ({ card, children }: Props) => {
  const [value, onChange] = useState(new Date());
  const [loading, setLaoding] = useState(false);
  const date = new Date(value);

  const handleCardDate = async () => {
    setLaoding(true);
    try {
      const formatedDate = formateDate(date);
      await fetchMutation(api.cards.addDateToCard, {
        cardId: card._id,
        date: {
          date: formatedDate,
          status: false,
        },
      });

      toast.success("Date added to card");
      setLaoding(false);
    } catch {
      throw new Error("Something went wrong");
    } finally {
      setLaoding(false);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent side="right">
        <div className="flex flex-col gap-3">
          <Calendar
            className="!bg-black"
            onChange={(value) => {
              if (value instanceof Date) {
                onChange(value);
              }
            }}
            value={value}
          />

          <Button
            onClick={handleCardDate}
            className="w-full rounded-sm bg-blue-500 hover:bg-blue-500/90 text-white"
            disabled={loading}
          >
            {loading ? "Saving..." : "Save"}
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default DatesDropdown;
