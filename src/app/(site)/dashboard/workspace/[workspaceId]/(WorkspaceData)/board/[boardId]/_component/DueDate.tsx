"use client"
import { Checkbox } from "@/components/ui/checkbox";
import { fetchMutation } from "convex/nextjs";
import React, { useState } from "react";
import { api } from "../../../../../../../../../../convex/_generated/api";
import { Id } from "../../../../../../../../../../convex/_generated/dataModel";
import { toast } from "sonner";

type Props = {
  date: {
    date: string;
    status: boolean;
  };
  cardId: Id<"cards">
};

const DueDate = ({ date: { date, status }, cardId }: Props) => {
  const [dateStatus, setDateStatus] = useState(status);

  const handleChangeDateStatus = async (status: boolean) => {
    try {
      await fetchMutation(api.cards.changeDateStatus, {
        cardId: cardId as Id<"cards">,
        status
      });

      toast.success("Status updated")
    } catch (error) {
      throw new Error("Something went wrong");
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Checkbox
        checked={dateStatus}
        onCheckedChange={() => {
          setDateStatus((prevStatus) => {
            handleChangeDateStatus(!prevStatus)

            return !prevStatus
          });
        }}
      />
      <div className="px-3 py-2 rounded-sm bg-white/10 flex items-center gap-3">
        <p>{date}</p>
        {status === false ? (
          <div className="bg-[#966316] text-white p-1 rounded-sm text-xs">
            <p>Due soon</p>
          </div>
        ) : (
          <div className="bg-[#478C5C] text-white p-1 rounded-sm text-xs">
            Completed
          </div>
        )}
      </div>
    </div>
  );
};

export default DueDate;
