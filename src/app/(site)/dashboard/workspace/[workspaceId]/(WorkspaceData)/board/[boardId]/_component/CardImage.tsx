import Image from "next/image";
import React from "react";

const CardImage = ({
  image,
  width,
  height,
}: {
  image: string;
  width: number;
  height: number;
}) => {
  return (
    <div className="w-full max-w-[500px]">
      <Image
        src={image}
        alt="preview"
        priority
        width={width}
        height={height}
        layout="responsive"
      />
    </div>
  );
};

export default CardImage;
