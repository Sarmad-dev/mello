import React from "react";
import { Id } from "../../../../../../../../../../convex/_generated/dataModel";
import { AlignLeft, Eye } from "lucide-react";
import OpenCardDropdown from "./OpenCardDropdown";
import { useQuery } from "convex/react";
import { api } from "../../../../../../../../../../convex/_generated/api";

type Props = {
  cardId: Id<"cards">;
};

const CardItem = ({ cardId }: Props) => {
  const card = useQuery(api.cards.getCardById, { cardId });
  return (
    <>
      <div className="bg-[#2f333a] rounded-lg h-fit relative">
        <div>
          {card?.background_color && (
            <div
              className="w-full h-[30px] rounded-tl-lg rounded-tr-lg"
              style={{
                backgroundColor: card.background_color,
              }}
            />
          )}
          <div className="flex flex-col gap-2 px-2 my-2 text-white/80 text-sm">
            {card?.labels && card.labels.length > 0 && (
              <div className="flex gap-2">
                {card.labels.map((label) => (
                  <div
                    className="rounded-full h-2 w-10"
                    key={label.title}
                    style={{
                      backgroundColor: label.color,
                    }}
                  />
                ))}
              </div>
            )}
            <div>
              <h4 className="font-semibold text-lg line-clamp-2">
                {card?.title}
              </h4>
            </div>

            {card?.watch || !!card?.description ? (
              <div className="flex items-center justify-between">
                <div className="flex gap-4">
                  {card.watch && <Eye size={15} />}
                  {!!card.description && <AlignLeft size={15} />}
                </div>
              </div>
            ) : undefined}
          </div>
        </div>

        <div className="absolute top-1 right-1 z-50">
          <OpenCardDropdown card={card!} />
        </div>
      </div>
    </>
  );
};

export default CardItem;
