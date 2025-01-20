import { Skeleton } from "@/components/ui/skeleton";

const BoardsLoading = () => {
  return (
    <div className="flex flex-col gap-10 mx-72 max-xl:mx-96">
      <Skeleton className="w-[80px] h-[30px]" />
    <div className="w-full flex items-center flex-wrap gap-5">
      <Skeleton className="w-[250px] h-[90px] rounded-md" />
      <Skeleton className="w-[250px] h-[90px] rounded-md " />
      <Skeleton className="w-[250px] h-[90px] rounded-md " />
      <Skeleton className="w-[250px] h-[90px] rounded-md " />
    </div>
    </div>
  );
};

export default BoardsLoading;
