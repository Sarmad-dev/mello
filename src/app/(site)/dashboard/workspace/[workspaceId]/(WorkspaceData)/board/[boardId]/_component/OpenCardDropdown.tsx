import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Ellipsis } from "lucide-react";
import { useQueryState } from "nuqs";
import { Doc } from "../../../../../../../../../../convex/_generated/dataModel";

type OpenCardProps = {
  card: Doc<"cards">;
};

const OpenCardDropdown = ({ card }: OpenCardProps) => {
  const [cardId, setCardId] = useQueryState("cardId", {
    defaultValue: "",
    history: "push",
    clearOnDefault: true,
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="cursor-pointer">
        <Ellipsis />
      </DropdownMenuTrigger>
      <DropdownMenuContent side="right">
        <DropdownMenuLabel>Card Settings</DropdownMenuLabel>
        <DropdownMenuItem
          onClick={() => {
            setCardId(card._id);
          }}
        >
          Open Card
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default OpenCardDropdown;
