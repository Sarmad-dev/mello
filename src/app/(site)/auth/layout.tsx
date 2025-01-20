import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const layout = async ({ children }: Props) => {
  const user = await currentUser()

  if (user?.id) {
    return redirect(`/dashboard/${user.username}`)
  }
  return (
    <main className="w-full h-screen flex items-center justify-center">
      {children}
    </main>
  );
};

export default layout;
