"use client";
import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { ConvexReactClient } from "convex/react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const convex = new ConvexReactClient(
  process.env.NEXT_PUBLIC_CONVEX_URL as string
);

const Sitelayout = ({ children }: Props) => {
  
  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
      afterSignOutUrl="/auth/sign-in"
    >
      <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
        <NuqsAdapter>{children}</NuqsAdapter>
      </ConvexProviderWithClerk>
    </ClerkProvider>
  );
};

export default Sitelayout;
