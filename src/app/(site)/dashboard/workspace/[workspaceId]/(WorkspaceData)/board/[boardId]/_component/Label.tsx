import React, { useEffect, useState } from "react";
import { Doc } from "../../../../../../../../../../convex/_generated/dataModel";
import { Checkbox } from "@/components/ui/checkbox";
import { updateCardProps } from "@/lib/types";
import { fetchMutation } from "convex/nextjs";
import { api } from "../../../../../../../../../../convex/_generated/api";
import { toast } from "sonner";
import { ConvexError } from "convex/values";

type Props = {
  card: Doc<"cards">;
  label: {
    id: number;
    title: string;
    color: string;
  };
  handleCardLabelsUpdate: ({
    description,
    background_color,
    label,
    watch,
  }: updateCardProps) => void;
};

const Label = ({ card, label, handleCardLabelsUpdate }: Props) => {
  const [checkedState, setCheckedState] = useState<boolean | null>(null);

  useEffect(() => {
    const changeCheckedState = () => {
      const cardState = card.labels?.map((cardLabel) => {
        if (cardLabel.id === label.id) return true;
      });

      if (cardState?.includes(true)) {
        setCheckedState(true);
        return;
      }

      setCheckedState(false);
    };

    changeCheckedState();
  }, [label, card.labels]);

  const handleRemoveLabel = async () => {
    try {
      await fetchMutation(api.cards.removeLabelFromCard, {
        cardId: card._id,
        id: label.id,
      });

      toast.success("Label removed from cart");
    } catch (error) {
      if (error instanceof ConvexError)
        throw new Error(`Something went wrong: ${error.message}`);
      else throw new Error("Something went wrong");
    }
  };

  return (
    <div className="w-full flex items-center space-x-2 justify-start">
      <Checkbox
        id={label.title}
        checked={checkedState!}
        onCheckedChange={(prevCheckedState) => {
          setCheckedState((prevState) => {
            return !prevState;
          });

          if (prevCheckedState === true) {
            handleCardLabelsUpdate({ label: label, ...card });
          } else {
            handleRemoveLabel();
          }
        }}
      />

      <div
        className="w-full rounded-sm text-sm text-white p-2"
        style={{
          backgroundColor: label.color,
        }}
      >
        {label.title}
      </div>
    </div>
  );
};

export default Label;
