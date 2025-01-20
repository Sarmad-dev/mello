"use client";
import AuthCard from "@/components/auth/AuthCard";
import AuthForm from "@/components/auth/AuthForm";
import OTPForm from "@/components/auth/OTPForm";
import { useSignup } from "@/hooks/use-signup";
import { SignUpFormSchema } from "@/lib/validations";
import React from "react";

const SignUp = () => {
  const { verifying, handleVerify, handleSubmit } = useSignup();
  return (
    <AuthCard>
      {verifying ? (
        <OTPForm onVerify={handleVerify} />
      ) : (
        <AuthForm
          formType="SIGN_UP"
          schema={SignUpFormSchema}
          defaultValues={{
            email: "",
            username: "",
            password: "",
            confirmPassword: "",
          }}
          onSubmit={(data) =>
            handleSubmit({
              username: data.username,
              email: data.email,
              password: data.password,
            })
          }
        />
      )}
    </AuthCard>
  );
};

export default SignUp;
