import { Loader2 } from "lucide-react";
import React from "react";

const Loading = () => {
  return (
    <main className="h-screen w-full flex items-center justify-center">
      <Loader2 className="animate-spin" width={80} height={80} />
    </main>
  );
};

export default Loading;
