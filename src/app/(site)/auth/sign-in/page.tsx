"use client";
import AuthCard from "@/components/auth/AuthCard";
import AuthForm from "@/components/auth/AuthForm";
import { SignInFormSchema } from "@/lib/validations";
import React from "react";

const SignIn = () => {
  return (
    <AuthCard>
      <AuthForm
        formType="SIGN_IN"
        schema={SignInFormSchema}
        defaultValues={{ email: "", password: "" }}
      />
    </AuthCard>
  );
};

export default SignIn;
