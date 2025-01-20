import { Skeleton } from "@/components/ui/skeleton";

const InviteMemberToWorkspaceLoading = () => {
  return (
    <div className="flex gap-40 py-8 items-center justify-center">
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <Skeleton className="w-14 h-14 rounded-md lex items-center justify-center" />
          <div className="flex flex-col justify-center gap-1">
            <Skeleton className="h-[30px] w-[150px]" />
            <Skeleton className="h-[20px] w-[50px]" />
          </div>
        </div>
        <Skeleton className="text-sm w-[450px] h-[20px]" />
      </div>

        <Skeleton className="rounded-sm w-[250px] h-[40px]" />
    </div>
  );
};

export default InviteMemberToWorkspaceLoading;
