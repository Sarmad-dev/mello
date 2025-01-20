import React, { useState } from "react";
import { Doc } from "../../../../../convex/_generated/dataModel";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { fetchMutation } from "convex/nextjs";
import { api } from "../../../../../convex/_generated/api";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";

type Props = {
  board: Doc<"boards">;
  children: React.ReactNode;
};

const DeleteBoardDialog = ({ board, children }: Props) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleDeleteBoard = async () => {
    setLoading(true);
    try {
      await fetchMutation(api.boards.deleteBoard, { boardId: board._id });

      toast.success("Board deleted");
      setLoading(false);
      setOpen(false);

      if (pathname.includes(board._id)) {
        router.back();
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure to delete {board.title} board?</DialogTitle>
          <DialogDescription>
            Deleting this board will also delete all of the lists and cards
            inside this board.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <DialogClose>Cancel</DialogClose>
          <Button
            className="bg-red-500 hover:bg-red-400 text-white"
            onClick={handleDeleteBoard}
            disabled={loading}
          >
            {loading ? <Loader2 className="animate-spin" /> : "Confirm"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteBoardDialog;
