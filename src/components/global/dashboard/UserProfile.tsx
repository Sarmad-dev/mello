"use client";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useClerk, useUser } from "@clerk/nextjs";
import Image from "next/image";
import React from "react";
import CreateWorkspaceModal from "../workspace/CreateWorkspaceModal";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const UserProfile = () => {
  const user = useUser();
  const { signOut } = useClerk();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="h-8 w-8 rounded-full relative">
          {user.user?.imageUrl && (
            <Image
              src={user?.user?.imageUrl as string}
              alt="profile"
              fill
              className="rounded-full"
            />
          )}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="dark:bg-gray-800 bg-gray-400 mt-2 mr-3 w-[300px]">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-sm text-primary-dark">
            WORKSPACE
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-primary-dark" />
          <CreateWorkspaceModal clerkId={user.user?.id as string} />
        </DropdownMenuGroup>
        <DropdownMenuGroup className="mt-5">
          <DropdownMenuLabel className="text-sm text-primary-dark">
            ACCOUNT
          </DropdownMenuLabel>
          <DropdownMenuSeparator className="bg-primary-dark" />
          <DropdownMenuItem className="focus:bg-white/10 text-primary-light dark:text-primary-dark">
            <Link href={`/dashboard/${user.user?.username}`}>Profile</Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <Button
          className="px-2 py-1.5 h-fit flex justify-start w-full bg-transparent hover:bg-white/10 text-primary-light dark:text-primary-dark"
          onClick={() => signOut({ redirectUrl: "/" })}
        >
          Sign out
        </Button>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserProfile;
