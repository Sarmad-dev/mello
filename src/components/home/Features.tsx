"use client";
import { features, featuresImages } from "@/lib/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import React, { useState } from "react";

const Features = () => {
  const [activeCard, setActiveCard] = useState(0);
  return (
    <section className="mt-[150px] mx-auto w-[1100px] 3xl:w-[1350px]">
      <h2 className="text-primary-dark text-3xl">A productive Powerhouse</h2>
      <p className="mt-8 w-[500px] text-lg text-white/80">
        Simple, flexible, and powerful. All it takes are boards, lists, and
        cards to get a clear view of who’s doing what and what needs to get done
      </p>

      <div className="mt-8 flex gap-10 items-center w-full">
        <div className="flex flex-col gap-8 3xl:gap-14">
          {features.map((feature) => (
            <div
              className={cn(
                "flex flex-col gap-2 w-[350px] cursor-pointer pl-5 border-l-[5px] border-transparent",
                activeCard === feature.id &&
                  "border-blue-700 shadow-md shadow-white/10"
              )}
              key={feature.id}
              onClick={() => setActiveCard(feature.id)}
            >
              <h3 className="font-semibold">{feature.title}</h3>
              <p className="text-white/80">{feature.description}</p>
            </div>
          ))}
        </div>
        <div className="w-full h-[500px] relative">
          <Image
            src={featuresImages[activeCard]}
            alt="feature image"
            fill
            className="rounded-md transition-transform ease-linear duration-75"
          />
        </div>
      </div>
    </section>
  );
};

export default Features;
