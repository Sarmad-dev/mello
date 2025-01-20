import { currentUser } from "@clerk/nextjs/server";
import { fetchQuery } from "convex/nextjs";
import { redirect } from "next/navigation";
import { api } from "../../../../../convex/_generated/api";
import Image from "next/image";
import UserWorkspaces from "./_components/UserWorkspaces";

interface UserPageProps {
  params: Promise<{ username: string }>;
}
const User = async ({ params }: UserPageProps) => {
  const { username } = await params;
  const clerkUser = await currentUser();

  const userId = await fetchQuery(api.users.getUserByClerkId, {
    clerkId: clerkUser?.id as string,
  });

  const user = await fetchQuery(api.users.getUserById, { userId: userId! });

  if (clerkUser?.username !== username) {
    return redirect(`/dashboard/${clerkUser?.username}`);
  }

  return (
    <main className="w-[1100px] 3xl:w-[1600px] mx-auto mt-20">
      <div className="flex flex-row gap-4 items-center">
        <div className="relative h-[80px] w-[80px] 3xl:w-[110px] 3xl:h-[110px]">
          <Image
            src={user?.image as string}
            alt="user image"
            fill
            priority
            className="rounded-full"
          />
        </div>
        <div className="flex flex-col">
          <h2 className="text-lg font-semibold">{user?.name}</h2>
          <p className="text-sm">{user?.username}</p>
          <p className="text-sm">{user?.email}</p>
        </div>
      </div>

      <div className="flex gap-10 mt-10">
        <UserWorkspaces user={user!} />
      </div>
    </main>
  );
};

export default User;
