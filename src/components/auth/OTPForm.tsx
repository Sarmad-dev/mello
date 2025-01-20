import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

import React, { useState } from "react";
import { Button } from "../ui/button";

type Props = {
  onVerify: (code: string) => Promise<void>;
};

const OTPForm = ({ onVerify }: Props) => {
  const [otpValue, setOtpValue] = useState("");
  return (
    <div>
      <p>Enter code sent to your email address</p>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          onVerify(otpValue);
        }}
      >
        <InputOTP
          maxLength={6}
          value={otpValue}
          onChange={(v) => setOtpValue(v)}
          className="border-primary-light dark:border-primary-dark mt-2"
        >
          <InputOTPGroup className="mt-2 w-full">
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
        <Button
          type="submit"
          className="min-h-12 text-lg mt-3 w-full rounded-sm px-4 py-3 bg-blue-500 hover:bg-blue-500/90"
        >
          Continue
        </Button>
      </form>
    </div>
  );
};

export default OTPForm;
