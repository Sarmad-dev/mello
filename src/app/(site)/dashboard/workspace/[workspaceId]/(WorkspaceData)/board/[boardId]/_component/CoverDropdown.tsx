import React, { ReactNode, useState } from "react";
import { Id } from "../../../../../../../../../../convex/_generated/dataModel";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CardBackgroundColors } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { fetchMutation } from "convex/nextjs";
import { api } from "../../../../../../../../../../convex/_generated/api";
import { Loader2 } from "lucide-react";

interface CoverDropdownProps {
  cardId: Id<"cards">;
  children: ReactNode;
}

const CoverDropdown = ({ cardId, children }: CoverDropdownProps) => {
  const [activeColor, setActiveColor] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const handleCardCover = async () => {
    try {
      setLoading(true);
      await fetchMutation(api.cards.changeCardBackgorundCover, {
        cardId,
        backgroundCover: activeColor!,
      });

      toast.success("Background Changed");
      setLoading(false);
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent side="right">
        <DropdownMenuLabel className="mb-[10px]">
          Change Card Cover
        </DropdownMenuLabel>
        <div className="flex flex-col gap-5">
          <div className="flex gap-3 items-center flex-wrap">
            {CardBackgroundColors.map((background) => (
              <div
                className="w-[70px] h-[50px] rounded-sm cursor-pointer"
                key={background.id}
                style={{
                  backgroundColor: `${background.color}`,
                  border:
                    activeColor === background.color
                      ? "2px solid white"
                      : "none",
                }}
                onClick={() => setActiveColor(background.color)}
              />
            ))}
          </div>

          <Button
            onClick={handleCardCover}
            className="w-full bg-blue-500 text-white hover:bg-blue-500/90"
          >
            {loading ? <Loader2 className="animate-spin" /> : "Save"}
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CoverDropdown;
