import LeftSidebar from "../../_components/LeftSidebar";
import { fetchQuery } from "convex/nextjs";
import { api } from "../../../../../../convex/_generated/api";
import { Id } from "../../../../../../convex/_generated/dataModel";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

type Props = {
  children: React.ReactNode;
  params: Promise<{ workspaceId: string }>;
};

const WorkspaceLayout = async ({ children, params }: Props) => {
  const { workspaceId } = await params;
  const workspace = await fetchQuery(api.workspaces.getWorkspaceById, {
    workspaceId: workspaceId as Id<"workspaces">,
  });

  const workspaceSettings = await fetchQuery(
    api.workspaceSettings.getWorkspaceSettingsByWorkspaceId,
    { workspaceId: workspace?._id as Id<"workspaces"> }
  );

  const clerkUser = await currentUser();
  const loggedInUser = await fetchQuery(api.users.getUserByClerkId, {
    clerkId: clerkUser?.id as string,
  });

  if (
    !workspace?.members?.includes(loggedInUser!) &&
    workspace?.admin !== loggedInUser &&
    workspaceSettings?.visibility === "private"
  ) {
    return redirect(`/dashboard`);
  }

  return (
    <section className="flex flex-row h-full w-screen overflow-hidden">
      <div className="w-[300px] max-lg:w-[350px]">
        <LeftSidebar workspace={workspace!} />
      </div>
      <div className="flex-1 h-full">{children}</div>
    </section>
  );
};

export default WorkspaceLayout;
