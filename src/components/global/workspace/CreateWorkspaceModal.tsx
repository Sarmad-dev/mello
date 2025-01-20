"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import React, { useState } from "react";
import CreateWorkspaceForm from "./CreateWorkspaceForm";
import Image from "next/image";

const CreateWorkspaceModal = ({ clerkId }: { clerkId: string }) => {
  const [open, setOpen] = useState(false);
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="px-2 py-1.5 h-fit flex justify-start w-full bg-transparent hover:bg-white/10 text-primary-light dark:text-primary-dark">
          Create a workspace
        </Button>
      </DialogTrigger>
      <DialogContent className="2xl:min-w-[1366px] min-w-[1000px] px-20 py-10">
        <div className="flex gap-10">
          <div className="flex-1">
            <DialogHeader>
              <DialogTitle className="text-2xl">
                Let&apos;s build a Workspace
              </DialogTitle>
              <DialogDescription className="text-lg font-light">
                Boost your productivity by making it easier for everyone to
                access boards in one location.
              </DialogDescription>
            </DialogHeader>
            <CreateWorkspaceForm setOpen={setOpen} clerkId={clerkId} />
          </div>

          <div className="flex-1 relative">
            <Image
              src="/icons/kanban-board.jpg"
              alt="kanban board image"
              fill
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreateWorkspaceModal;
