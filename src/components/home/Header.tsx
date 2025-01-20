import Image from "next/image";
import Link from "next/link";
import React from "react";

const Header = ({ userId }: { userId: string | null }) => {
  return (
    <header className="w-full h-[80px] bg-primary-light border-b border-b-primary-dark">
      <div className="h-full w-[1250px] 3xl:w-[1500px] mx-auto flex items-center justify-between">
        <Link href={"/"} className="my-2 flex items-center gap-2">
          <Image src="/icons/kanban.svg" alt="logo" width={40} height={40} />
          <p className="font-bold text-2xl">MELLO</p>
        </Link>

        {userId ? (
          <Link
            href="/dashboard"
            className="h-full w-fit px-4 flex items-center justify-center bg-[#101f38] text-white text-lg 2xl:text-xl"
          >
            Go to your boards
          </Link>
        ) : (
          <Link
            href="/auth/sign-in"
            className="h-full w-fit px-6 flex items-center justify-center bg-[#101f38] text-white text-lg 2xl:text-xl"
          >
            Sign In
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
