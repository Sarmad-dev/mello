import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import React from "react";

const Dashboard = async () => {
  const user = await currentUser();

  if (user) {
    return redirect(`/dashboard/${user.username}`);
  }
  return <div>Dashboard</div>;
};

export default Dashboard;
