import { Loader2 } from "lucide-react";
import React from "react";

const Loading = () => {
  return (
    <main
      className="flex items-center justify-center"
      style={{
        height: "calc(100vh - 135px)",
        width: "calc(100vw - 300px)",
      }}
    >
      <Loader2 className="animate-spin" width={70} height={70} />
    </main>
  );
};

export default Loading;
