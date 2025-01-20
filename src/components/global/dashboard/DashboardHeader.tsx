import React from "react";
import HeaderDropdown from "./HeaderDropdown";
import { Loader2 } from "lucide-react";
import UserProfile from "./UserProfile";
import { ClerkLoaded, ClerkLoading, SignedIn } from "@clerk/nextjs";
import WorkspaceDropdown from "./WorkspaceDropdown";
import { api } from "../../../../convex/_generated/api";
import StarredBoardItem from "./StarredBoardItem";
import DashboardHeaderSearchInput from "./DashboardHeaderSearchInput";
import { currentUser } from "@clerk/nextjs/server";
import { fetchQuery } from "convex/nextjs";
import Image from "next/image";
import Link from "next/link";

const DashboardHeader = async () => {
  const clerkUser = await currentUser();

  const loggedInUserId = await fetchQuery(api.users.getUserByClerkId, {
    clerkId: clerkUser?.id as string,
  });
  const user = await fetchQuery(api.users.getUserById, {
    userId: loggedInUserId!,
  });

  return (
    <header className="flex px-4 h-[60px] items-center gap-10 justify-between border-b border-b-primary-light dark:border-b-primary-dark">
      <div className="flex flex-row gap-1 items-center">
        <Link href="/">
          <Image src="/icons/kanban.svg" alt="svg" width={40} height={40} />
        </Link>

        <WorkspaceDropdown />
        <HeaderDropdown title="Starred">
          <div className="flex flex-col gap-2 px-2 py-3">
            {user?.starredBoards && user.starredBoards.length > 0 ? (
              user?.starredBoards?.map((starredBoard) => (
                <StarredBoardItem key={starredBoard} boardId={starredBoard} />
              ))
            ) : (
              <></>
            )}
          </div>
        </HeaderDropdown>
      </div>

      <div className={`flex items-center gap-3`}>
        <DashboardHeaderSearchInput />

        <SignedIn>
          <ClerkLoading>
            <div className="w-8 h8 rounded-full bg-gray-700 flex items-center justify-center">
              <Loader2 className="animate-spin text-gray-300" />
            </div>
          </ClerkLoading>
          <ClerkLoaded>
            <UserProfile />
          </ClerkLoaded>
        </SignedIn>
      </div>
    </header>
  );
};

export default DashboardHeader;
