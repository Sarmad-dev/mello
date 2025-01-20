import DashboardHeader from "@/components/global/dashboard/DashboardHeader";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const DashbaordLayout = ({ children }: Props) => {
  return (
    <main className="w-full h-screen overflow-x-hidden flex flex-col">
      <DashboardHeader />
      <div className="flex-1 overflow-y-hidden">{children}</div>
    </main>
  );
};

export default DashbaordLayout;
