import { AuthenticateWithRedirectCallback } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";

export default async function SSOCallback() {

  return (
    <>
      <Loader2 className="size-14 animate-spin" />
      <AuthenticateWithRedirectCallback />
    </>
  );
}
