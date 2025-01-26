"use client";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { CreateWorkspaceFormSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { workspaceSelectItem } from "@/lib/constants";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { api } from "../../../../convex/_generated/api";
import { useRouter } from "next/navigation";
import { fetchMutation } from "convex/nextjs";

const CreateWorkspaceForm = ({
  setOpen,
  clerkId,
}: {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  clerkId: string;
}) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof CreateWorkspaceFormSchema>>({
    mode: "onSubmit",
    resolver: zodResolver(CreateWorkspaceFormSchema),
    defaultValues: {
      name: "",
      description: "",
      type: "web-development",
    },
  });

  const onSubmit = async ({
    name,
    description,
    type,
  }: z.infer<typeof CreateWorkspaceFormSchema>) => {
    try {
      const workspaceId = await fetchMutation(api.workspaces.createWorkspace, {
        name,
        description,
        type,
        clerkId,
      });

      router.push(`/dashboard/workspace/${workspaceId}`);
      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="mt-5 space-y-4">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Workspace name</FormLabel>
              <FormControl>
                <Input placeholder="Taco's co." type="text" {...field} />
              </FormControl>
              <FormDescription>
                This is the name of your company, team or organization.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Workspace type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose..." />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {workspaceSelectItem.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Workspace description (optional)</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Our team organizes everything here."
                  className="min-h-[150px] resize-none"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          className="w-full bg-blue-400 hover:bg-blue-400/90"
          disabled={form.formState.isSubmitting}
        >
          {form.formState.isSubmitting ? (
            <Loader2 className="animate-spin" />
          ) : (
            "Continue"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default CreateWorkspaceForm;
