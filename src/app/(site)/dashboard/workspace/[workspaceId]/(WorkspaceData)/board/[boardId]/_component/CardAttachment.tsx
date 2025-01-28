import React from "react";
import { Id } from "../../../../../../../../../../convex/_generated/dataModel";
import { api } from "../../../../../../../../../../convex/_generated/api";
import Image from "next/image";
import { fetchQuery } from "convex/nextjs";
import probe from "probe-image-size";

const CardAttachment = async ({ storageId }: { storageId: Id<"_storage"> }) => {
  const image = await fetchQuery(api.cards.getCardImageById, { storageId });
  const dimensions = probe(image!);

  return (
    <>
      {image && (
        <div className="w-full max-w-[500px]">
          <Image
            src={image}
            alt="preview"
            priority
            width={(await dimensions).width}
            height={(await dimensions).height}
            layout="responsive"
          />
        </div>
      )}
    </>
  );
};

export default CardAttachment;
