"use client";
import React, { useState } from "react";
import { Doc } from "../../../../../../../../../../convex/_generated/dataModel";
import { Button } from "@/components/ui/button";
import { Loader2, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { addListToBoard } from "@/actions/action";

type AddListProps = {
  lists: Doc<"lists">[];
  board: Doc<"boards">;
};

const AddList = ({ lists, board }: AddListProps) => {
  const [addList, setAddList] = useState(true);
  const [listValue, setListValue] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAddListToBoard = async (title: string) => {
    setLoading(true);
    try {
      await addListToBoard(title, board);

      toast.success("List added to board");

      setAddList(true);
      setListValue("");
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      {addList && (
        <Button
          className="flex gap-3 items-center justify-start min-w-[300px] bg-white/30 hover:bg-white/40 order-last"
          onClick={() => setAddList(false)}
        >
          <Plus />
          <span>
            {lists?.length === 0 || lists?.length === undefined
              ? "Add a list"
              : "Add another list"}
          </span>
        </Button>
      )}

      {!addList && (
        <div className="min-w-[300px] rounded-md p-3 bg-black/90 h-fit flex flex-col gap-4 order-last">
          <Input
            type="text"
            placeholder="enter list name"
            value={listValue}
            onChange={(e) => setListValue(e.target.value)}
          />
          <div className="flex gap-3">
            <Button
              className="bg-blue-500 hover:bg-blue-500/90 text-white"
              onClick={() => handleAddListToBoard(listValue)}
            >
              {loading ? <Loader2 className="animate-spin" /> : "Save"}
            </Button>
            <Button
              className="bg-white/50 hover:bg-white/60"
              onClick={() => setAddList(true)}
            >
              Cancel
            </Button>
          </div>
        </div>
      )}
    </>
  );
};

export default AddList;
