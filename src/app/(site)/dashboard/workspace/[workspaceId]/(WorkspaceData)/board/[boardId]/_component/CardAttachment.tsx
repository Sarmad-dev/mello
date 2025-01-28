import React from "react";
import { Id } from "../../../../../../../../../../convex/_generated/dataModel";
import { api } from "../../../../../../../../../../convex/_generated/api";
import { useQuery } from "convex/react";
import CardImage from "./CardImage";

const CardAttachment = ({ storageId }: { storageId: Id<"_storage"> }) => {
  const image = useQuery(api.cards.getCardImageById, { storageId });

  return <>{image && <CardImage image={image} width={800} height={500} />}</>;
};

export default CardAttachment;
