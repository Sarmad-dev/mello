import InviteForm from "@/components/global/invite/InviteForm";
import React from "react";
import { Id } from "../../../../../../../../convex/_generated/dataModel";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type Props = {
  children: React.ReactNode;
  workspaceId: Id<"workspaces">;
};

const InviteWorkspaceMembersDialog = ({ children, workspaceId }: Props) => {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite Members</DialogTitle>
          <DialogDescription>Invite members to workspace</DialogDescription>
        </DialogHeader>
        <InviteForm workspaceId={workspaceId} />
      </DialogContent>
    </Dialog>
  );
};

export default InviteWorkspaceMembersDialog;
