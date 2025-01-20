import { fetchQuery } from "convex/nextjs";
import React from "react";
import { api } from "../../../../../../../../convex/_generated/api";
import { Id } from "../../../../../../../../convex/_generated/dataModel";
import Image from "next/image";
import WorkspaceMember from "./_component/WorkspaceMember";
import { getWorkspace, getWorkspaceMembers } from "@/actions/action";
import { Separator } from "@/components/ui/separator";

type Props = {
  params: Promise<{ workspaceId: string }>;
};

const Members = async ({ params }: Props) => {
  const { workspaceId } = await params;

  const workspace = await getWorkspace({
    workspaceId: workspaceId as Id<"workspaces">,
  });

  const members = await getWorkspaceMembers({
    workspaceId: workspace?._id as Id<"workspaces">,
  });

  const admin = await fetchQuery(api.users.getUserById, {
    userId: workspace?.admin as Id<"users">,
  });

  return (
    <div className="flex flex-col gap-5 mx-72 max-xl:mx-96">
      <h3 className="text-lg font-semibold">Members</h3>
      <div className="w-full flex flex-col gap-4">
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            {admin?.image ? (
              <Image
                src={admin.image}
                alt="member image"
                width={35}
                height={35}
                className="rounded-full"
              />
            ) : (
              <div className="w-[25px] h-[25px] rounded-full bg-orange-300 text-white">
                <p className="font-semibold text-lg">{admin?.name.charAt(0)}</p>
              </div>
            )}

            <div className="flex flex-col">
              <p>{admin?.name}</p>
            </div>
          </div>

          <div className="px-3 py-1 bg-white/10 hover:bg-white/20 text-white rounded-sm">
            Admin
          </div>
        </div>

        <Separator />

        {members &&
          members.length > 0 &&
          members.map((member) => (
            <WorkspaceMember
              member={member!}
              key={member?._id}
              workspace={workspace!}
            />
          ))}
      </div>
    </div>
  );
};

export default Members;
