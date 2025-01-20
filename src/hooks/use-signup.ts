import { useSignUp } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { ClerkAPIError } from "@clerk/types";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";
import { useState } from "react";

interface SignupProps {
  username: string;
  email: string;
  password: string;
}

export const useSignup = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [verifying, setVerifying] = useState(false);
  const [errors, setErrors] = useState<ClerkAPIError[]>();
  const router = useRouter();

  const handleSubmit = async ({ username, email, password }: SignupProps) => {
    if (!isLoaded) return;

    try {
      await signUp.create({
        username,
        emailAddress: email,
        password,
      });

      await signUp.prepareEmailAddressVerification({
        strategy: "email_code",
      });

      setVerifying(true);
    } catch (err) {
      if (isClerkAPIResponseError(err)) setErrors(err.errors);
      console.error(JSON.stringify(err, null, 2));
    }
  };

  const handleVerify = async (code: string) => {
    if (!isLoaded) return;

    try {
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        router.push(`/dashboard/${signUpAttempt.username}`);
      } else {
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err) {
      if (isClerkAPIResponseError(err)) setErrors(err.errors);
      console.error("Error:", JSON.stringify(err, null, 2));
    }
  };

  return {
    handleSubmit,
    handleVerify,
    verifying,
    errors,
  };
};
