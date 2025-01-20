import React from "react";
import { Id } from "../../../../../../../../../../convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { api } from "../../../../../../../../../../convex/_generated/api";

const CardAttachment = ({ storageId }: { storageId: Id<"_storage"> }) => {
  const image = useQuery(api.cards.getCardImageById, { storageId });
  return <>{image && <img src={image} alt="preview" />}</>;
};

export default CardAttachment;
