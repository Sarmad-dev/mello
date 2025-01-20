import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

const MembersLoading = () => {
  return (
    <div className="flex flex-col gap-5 mx-72 max-xl:mx-96">
      <Skeleton className="h-[35px] w-[120px]" />
      <div className="w-full flex flex-col gap-4">
        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Skeleton className="w-[45px] h-[45px] rounded-full" />
            <Skeleton className="w-[100px] h-[30px]" />
          </div>
          <Skeleton className="rounded-sm w-[60px] h-[30px]" />
        </div>

        <Separator />

        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Skeleton className="w-[45px] h-[45px] rounded-full" />
            <Skeleton className="w-[100px] h-[30px]" />
          </div>
          <Skeleton className="rounded-sm w-[60px] h-[30px]" />
        </div>

        <Separator />

        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Skeleton className="w-[45px] h-[45px] rounded-full" />
            <Skeleton className="w-[100px] h-[30px]" />
          </div>
          <Skeleton className="rounded-sm w-[70px] h-[30px]" />
        </div>

        <Separator />

        <div className="w-full flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Skeleton className="w-[45px] h-[45px] rounded-full" />
            <Skeleton className="w-[100px] h-[30px]" />
          </div>
          <Skeleton className="rounded-sm w-[70px] h-[30px]" />
        </div>
      </div>
    </div>
  );
};

export default MembersLoading;
