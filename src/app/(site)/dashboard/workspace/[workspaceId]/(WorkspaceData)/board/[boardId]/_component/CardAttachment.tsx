import React from "react";
import { Id } from "../../../../../../../../../../convex/_generated/dataModel";
import { api } from "../../../../../../../../../../convex/_generated/api";
import { useQuery } from "convex/react";
import CardImage from "./CardImage";

const CardAttachment = ({ storageId }: { storageId: Id<"_storage"> }) => {
  const image = useQuery(api.cards.getCardImageById, { storageId });

  return (
    <>{image && <CardImage image={image} width={16 | 9} height={9 | 16} />}</>
  );
};

export default CardAttachment;
