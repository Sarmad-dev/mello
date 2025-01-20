"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Loader2, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { fetchMutation } from "convex/nextjs";
import { toast } from "sonner";
import { Id } from "../../../../../../../../../../convex/_generated/dataModel";
import { api } from "../../../../../../../../../../convex/_generated/api";

type AddCardProps = {
  listId: Id<"lists">;
};

const AddCard = ({ listId }: AddCardProps) => {
  const [addCard, setAddCard] = useState(true);
  const [cardValue, setcardValue] = useState("");
  const [loading, setLoading] = useState(false);

  const addCardToList = async (title: string) => {
    setLoading(true);
    try {
      await fetchMutation(api.cards.addCardToList, {
        title,
        listId,
      });
      toast.success("Card added to board");
      setLoading(false);
      setAddCard(true);
      setcardValue("")
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {addCard && (
        <Button
          className="flex gap-3 items-center justify-start w-full bg-white/30 hover:bg-white/40"
          onClick={() => setAddCard(false)}
        >
          <Plus />
          <span>Add card</span>
        </Button>
      )}

      {!addCard && (
        <div className="w-full rounded-md p-3 bg-transparent h-fit flex flex-col gap-4">
          <Input
            type="text"
            placeholder="enter card title"
            value={cardValue}
            onChange={(e) => setcardValue(e.target.value)}
            className="w-full"
          />
          <div className="flex gap-3">
            <Button
              className="bg-blue-500 hover:bg-blue-500/90 text-white"
              onClick={() => addCardToList(cardValue)}
            >
              {loading ? <Loader2 className="animate-spin" /> : "Save"}
            </Button>
            <Button
              className="bg-white/50 hover:bg-white/60"
              onClick={() => setAddCard(true)}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default AddCard;
