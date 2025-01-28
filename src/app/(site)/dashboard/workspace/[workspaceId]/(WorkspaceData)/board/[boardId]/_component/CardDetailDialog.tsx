import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useQueryState } from "nuqs";
import React, { useState } from "react";
import { api } from "../../../../../../../../../../convex/_generated/api";
import { useQuery } from "convex/react";
import { Id } from "../../../../../../../../../../convex/_generated/dataModel";
import {
  AlignLeft,
  Calendar,
  Check,
  Eye,
  Paperclip,
  Plus,
  Proportions,
  Ticket,
  User,
  Wallpaper,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Hint from "@/components/global/Hint";
import { TextEditor } from "@/components/global/Editor";
import { Cross1Icon } from "@radix-ui/react-icons";
import { fetchMutation } from "convex/nextjs";
import ParseHTML from "@/components/global/ParseHTML";
import { updateCardProps } from "@/lib/types";
import InviteMembersDropdown from "@/components/global/invite/InviteDropdown";
import CardMember from "./CardMember";
import { toast } from "sonner";
import { ConvexError } from "convex/values";
import MembersDropdown from "./MembersDropdown";
import LabelDropdown from "./LabelDropdown";
import DatesDropdown from "./DatesDropdown";
import DueDate from "./DueDate";
import CoverDropdown from "./CoverDropdown";
import AttachmentDropdown from "./AttachmentDropdown";
import CardAttachment from "./CardAttachment";

const CardDetailDialog = () => {
  const [cardId, setCardId] = useQueryState("cardId", {
    defaultValue: "",
    clearOnDefault: true,
  });

  const [value, setValue] = useState("");

  const [isEditor, setIsEditor] = useState(false);

  const card = useQuery(api.cards.getCardById, {
    cardId: cardId as Id<"cards">,
  });
  const list = useQuery(api.lists.getListById, {
    listId: card?.list as Id<"lists">,
  });

  const handleCardUpdate = async ({
    description,
    background_color,
    label,
    watch,
  }: updateCardProps) => {
    try {
      await fetchMutation(api.cards.updateCardDetails, {
        cardId: card?._id as Id<"cards">,
        description,
        background_color,
        labels: label ? [...(card?.labels ?? []), label] : card?.labels ?? [],
        watch,
      });

      toast.success("Card updated");
    } catch (error) {
      if (error instanceof ConvexError) toast.error(error.message);
    }
  };

  return (
    <Dialog open={true}>
      <DialogContent className="px-0 py-0 min-w-[850px] overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-transparent max-h-screen overflow-x-hidden">
        <DialogHeader className="hidden">
          <DialogTitle>Card Details</DialogTitle>
          <DialogDescription>Card Description</DialogDescription>
        </DialogHeader>
        <div className="w-full absolute">
          <Cross1Icon
            className={`relative top-2 left-[800px] cursor-pointer ${card?.background_color === undefined ? "text-white" : "text-black"}`}
            height={35}
            width={35}
            onClick={() => setCardId("")}
          />
        </div>
        {card?.background_color && (
          <div
            className="w-full h-[100px] rounded-tl-sm rounded-tr-sm"
            style={{ backgroundColor: card.background_color }}
          />
        )}

        <div className="flex flex-col gap-3 px-4 py-5 text-[#C7C7C7]">
          <div className="flex items-center gap-4">
            <Proportions />
            <div className="flex flex-col">
              <p className="text-xl font-semibold">{card?.title}</p>
              <span className="text-sm">in list {list?.title}</span>
            </div>
          </div>

          <div className="flex gap-3">
            <div className="flex-1">
              <div className="ml-9">
                <div className="flex flex-col gap-1">
                  <p className="text-sm mt-3">Members</p>

                  <div className="flex gap-2 items-center">
                    {card?.members &&
                      card.members.length > 0 &&
                      card.members.map((member) => (
                        <CardMember member={member} key={member} />
                      ))}
                    <InviteMembersDropdown>
                      <Button className="bg-white/10 text-white hover:bg-white/20 rounded-full px-0 py-0 flex items-center justify-center h-8 w-8">
                        <Plus />
                      </Button>
                    </InviteMembersDropdown>
                  </div>
                </div>

                <div className="flex flex-col mt-5 gap-1">
                  <p className="text-sm">Labels</p>
                  <div className="flex gap-2 items-center flex-wrap">
                    {card?.labels?.map((label) => (
                      <div
                        className="py-2 px-4 rounded-sm text-white text-sm"
                        key={label.title}
                        style={{
                          backgroundColor: label.color,
                        }}
                      >
                        {label.title}
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3 mt-5">
                  <div className="flex flex-col gap-1">
                    <p className="text-sm">Notifications</p>
                    <Hint
                      hint={
                        card?.watch
                          ? "Stop watching card"
                          : "Start watching card"
                      }
                      side="right"
                      className="bg-gray-500 text-black/90"
                    >
                      <Button
                        className="flex gap-1 items-center rounded-sm bg-white/10 hover:bg-white/20 text-white px-5 w-fit"
                        onClick={() => {
                          if (card?.watch) {
                            handleCardUpdate({
                              ...card,
                              watch: false,
                            });
                          } else {
                            handleCardUpdate({
                              ...card,
                              watch: true,
                            });
                          }
                        }}
                      >
                        <Eye />
                        <p>{card?.watch ? "Watching" : "Watch"}</p>
                        {card?.watch && <Check />}
                      </Button>
                    </Hint>
                  </div>

                  {!!card?.date && (
                    <div className="flex flex-col gap-1 text-sm">
                      <p>Due Date</p>
                      <DueDate date={card.date} cardId={card._id} />
                    </div>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between mt-5">
                <div className="flex items-center gap-3">
                  <AlignLeft />
                  <p className="text-lg font-normal">Description</p>
                </div>

                <Button
                  className="rounded-sm bg-white/10 hover:bg-white/20 text-white"
                  onClick={() => {
                    if (isEditor) {
                      handleCardUpdate({ description: value, ...card });
                      setIsEditor(false);
                    } else {
                      setIsEditor(true);
                    }
                  }}
                >
                  {isEditor ? "Save" : card?.description ? "Edit" : "Add"}
                </Button>
              </div>

              <div className="mt-3 ml-9">
                {card?.description && !isEditor && (
                  <ParseHTML data={card.description} />
                )}
                {isEditor && (
                  <TextEditor
                    onValueChange={setValue}
                    description={card?.description}
                  />
                )}
              </div>

              <div className="flex gap-3 flex-wrap mt-10">
                {card?.attachment &&
                  card.attachment.length > 0 &&
                  card.attachment.map((attachment) => (
                    <CardAttachment key={attachment} storageId={attachment} />
                  ))}
              </div>
            </div>

            <div className="w-[250px] flex flex-col gap-3">
              <MembersDropdown card={card!}>
                <Button className="bg-white/10 hover:bg-white/20 text-white rounded-sm w-full flex gap-4 items-center justify-start">
                  <User />
                  <p>Members</p>
                </Button>
              </MembersDropdown>

              {!card?.background_color && (
                <CoverDropdown cardId={card?._id as Id<"cards">}>
                  <Button className="bg-white/10 hover:bg-white/20 text-white rounded-sm w-full flex gap-4 items-center justify-start">
                    <Wallpaper />
                    <p>Cover</p>
                  </Button>
                </CoverDropdown>
              )}

              <LabelDropdown
                card={card!}
                handleCardLabelsUpdate={handleCardUpdate}
              >
                <Button className="bg-white/10 hover:bg-white/20 text-white rounded-sm w-full flex gap-4 items-center justify-start">
                  <Ticket />
                  <p>Labels</p>
                </Button>
              </LabelDropdown>

              <DatesDropdown card={card!}>
                <Button className="bg-white/10 hover:bg-white/20 text-white rounded-sm w-full flex gap-4 items-center justify-start">
                  <Calendar />
                  <p>Dates</p>
                </Button>
              </DatesDropdown>

              <AttachmentDropdown cardId={card?._id as Id<"cards">}>
                <Button className="bg-white/10 hover:bg-white/20 text-white rounded-sm w-full flex gap-4 items-center justify-start">
                  <Paperclip />
                  <p>Attachment</p>
                </Button>
              </AttachmentDropdown>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CardDetailDialog;
