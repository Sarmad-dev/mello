import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const SkeleltonItems = [1, 2, 3, 4];

const SettingsLoading = () => {
  return (
    <div className="flex flex-col gap-10 mx-72 max-xl:mx-96">
      <Skeleton className="w-[200px] h-[40px] rounded-sm" />
      <div className="flex flex-col gap-3">
        {SkeleltonItems.map((item) => (
          <React.Fragment key={item}>
            <div className="flex flex-col gap-2">
              <Skeleton className="w-[170px] h-[25px] rounded-sm" />
              <div className="w-full flex items-center justify-between">
                <Skeleton className="w-[450px] h-[25px] rounded-sm" />
                <Skeleton className="w-[90px] h-[40px] rounded-sm" />
              </div>
            </div>
            <Separator />
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default SettingsLoading;
