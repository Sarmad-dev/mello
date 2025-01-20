"use client";
import React from "react";
import { z, ZodType } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  DefaultValues,
  FieldValues,
  Path,
  SubmitHandler,
  useForm,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import Link from "next/link";
import { Button } from "../ui/button";
import OAuthForm from "./OAuthForm";

type AuthFormProps<T extends FieldValues> = {
  schema: ZodType<T>;
  defaultValues: T;
  onSubmit: (data: T) => Promise<{ success: boolean; data: T }>;
  formType: "SIGN_IN" | "SIGN_UP";
};

const AuthForm = <T extends FieldValues>({
  schema,
  defaultValues,
  onSubmit,
  formType,
}: AuthFormProps<T>) => {
  const form = useForm<z.infer<typeof schema>>({
    mode: "onSubmit",
    resolver: zodResolver(schema),
    defaultValues: defaultValues as DefaultValues<T>,
  });

  const handleSubmit: SubmitHandler<T> = async (values: T) => {
    await onSubmit(values);
  };

  const buttonText = formType === "SIGN_IN" ? "Sign In" : "Sign Up";

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        {Object.keys(defaultValues).map((field) => (
          <FormField
            key={field}
            control={form.control}
            name={field as Path<T>}
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-1 mt-2">
                <FormLabel className="paragraph-medium text-dark400_light700">
                  {field.name === "email"
                    ? "Email Address"
                    : field.name.charAt(0).toUpperCase() + field.name.slice(1)}
                </FormLabel>
                <FormControl>
                  <Input
                    type={
                      field.name === "password" ||
                      field.name === "confirmPassword"
                        ? "password"
                        : "text"
                    }
                    {...field}
                    className="min-h-12 rounded-sm border-none text-primary-light dark:text-primary-dark focus-visible:ring-0 bg-slate-900/50"
                  />
                </FormControl>
                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
        ))}

        <Button
          disabled={form.formState.isSubmitting}
          className="min-h-12 text-lg mt-3 w-full rounded-sm px-4 py-3 bg-blue-500 hover:bg-blue-500/90"
        >
          {form.formState.isSubmitting
            ? buttonText === "Sign In"
              ? "Signing In..."
              : "Signing Up..."
            : buttonText}
        </Button>

        <OAuthForm />

        {formType === "SIGN_IN" ? (
          <p>
            Dont&apos;t have an account?{" "}
            <Link href="/auth/sign-up" className="">
              Sign up
            </Link>
          </p>
        ) : (
          <p>
            Already have an account?{" "}
            <Link href="/auth/sign-in" className="">
              Sign in
            </Link>
          </p>
        )}
      </form>
    </Form>
  );
};

export default AuthForm;
