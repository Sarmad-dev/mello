"use client";
import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { toast } from "sonner";
import Image from "next/image";

const HeroSecton = () => {
  const [emailValue, setEmailValue] = useState<string>("");
  const handleSubscription = () => {
    console.log(emailValue);
    if (emailValue === "") {
      toast.error("Please provide valid email");

      return;
    }
    toast.success(
      `You have subscribed to our newsletter with '${emailValue}' email address`
    );
  };
  return (
    <section className="w-full h-[80vh] 3xl:h-[60vh] bg-gradient-to-t from-[#6244ab] via-[#9649ae] to-[#d54eb2]">
      <div className="w-[1100px] 3xl:w-[1350px] mx-auto h-full flex items-center gap-20">
        <div className="flex flex-col gap-5 w-[550px]">
          <h1 className="text-5xl text-white font-bold leading-snug">
            Mello brings all your tasks, teammates, and tools together
          </h1>
          <p className="text-white text-xl 2xl:text-2xl">
            Keep everything in the same place—even if your team isn’t.
          </p>

          <div className="w-full flex items-center justify-between gap-10">
            <Input
              type="email"
              value={emailValue}
              onChange={(e) => setEmailValue(e.target.value)}
              placeholder="Email"
              className="bg-white text-gray-500 h-14"
            />
            <Button
              className="h-14 bg-button hover:bg-button/40 text-white w-[250px]"
              onClick={handleSubscription}
            >
              Sign up - it&apos;s free
            </Button>
          </div>
        </div>

        <div className="relative w-[700px] 3xl:h-[600px] h-[500px]">
          <Image src="/images/Illustration.png" alt="illustration" fill />
        </div>
      </div>
    </section>
  );
};

export default HeroSecton;
