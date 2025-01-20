import React from "react";
import { Button } from "../ui/button";
import { useOAuth } from "@/hooks/use-oauth";
import Image from "next/image";

const OAuthForm = () => {
  const { handleSignIn } = useOAuth();
  return (
    <div className="w-full flex items-center gap-3 mt-4 mb-2">
      <Button
        type="button"
        className="flex items-center justify-center gap-3 min-h-12 flex-1 bg-transparent border border-primary-light dark:border-primary-dark hover:bg-transparent text-primary-light dark:text-primary-dark"
        onClick={() => handleSignIn("oauth_google")}
      >
        <Image src='/icons/google-logo.svg' alt="google logo" width={40} height={40} />
        <span className="text-lg">Google</span>
      </Button>
      <Button
        type="button"
        className="flex items-center justify-center gap-3 min-h-12 flex-1 bg-transparent border border-primary-light dark:border-primary-dark hover:bg-transparent text-primary-light dark:text-primary-dark"
        onClick={() => handleSignIn("oauth_github")}
      >
        <Image src='/icons/github-logo.svg' alt="github logo" width={30} height={30} />
        <span className="text-lg">Github</span>
      </Button>
    </div>
  );
};

export default OAuthForm;
