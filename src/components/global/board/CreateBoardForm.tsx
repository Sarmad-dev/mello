"use client"
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { BoardBackgroundColors, Visibility } from "@/lib/constants";
import { CreateBoardFormSchema } from "@/lib/validations";
import { zodResolver } from "@hookform/resolvers/zod";
import { fetchMutation } from "convex/nextjs";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const CreateBoardForm = () => {
  const { workspaceId } = useParams();
  const [activeColor, setActiveColor] = useState([""]);

  const form = useForm<z.infer<typeof CreateBoardFormSchema>>({
    mode: "onSubmit",
    resolver: zodResolver(CreateBoardFormSchema),
    defaultValues: {
      colors: [""],
      title: "",
      visibility: "public",
    },
  });

  const onSubmit = async (values: z.infer<typeof CreateBoardFormSchema>) => {
    try {
      await fetchMutation(api.boards.createBoard, {
        title: values.title,
        visibility: values.visibility,
        backgroundColors: values.colors,
        workspaceId: workspaceId as Id<"workspaces">,
      });

      toast.success("Board created successfully");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  const isSubmitting = form.formState.isSubmitting;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-[350px] px-5">
        <div className="w-full flex items-center justify-center my-10">
          <span className="text-primary-dark">Create Board</span>
        </div>
        <FormField
          name="colors"
          control={form.control}
          render={() => (
            <FormItem>
              <FormLabel>Background</FormLabel>
              <FormControl>
                <div className="flex gap-3">
                  {BoardBackgroundColors.map((colors) => (
                    <div
                      key={colors[0]}
                      className={`cursor-pointer w-[60px] h-[35px] rounded-md ${activeColor === colors && "border border-white"}`}
                      style={{
                        background: `linear-gradient(to right, ${colors[0]}, ${colors[1]}, ${colors[2]})`,
                      }}
                      onClick={() => {
                        form.setValue("colors", [...colors]);
                        setActiveColor(colors);
                      }}
                    />
                  ))}
                </div>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          name="title"
          control={form.control}
          render={({ field }) => (
            <FormItem className="mt-5">
              <FormLabel>Board Title</FormLabel>
              <FormControl>
                <Input type="text" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          name="visibility"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Visibility</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a workspace option" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Visibility.map(
                    ({ icon: Icon, title, description, value }) => (
                      <SelectItem value={value} key={value}>
                        <div className="flex flex-row items-center gap-3">
                          <Icon className="text-primary-dark" size={25} />
                          <div className="w-[250px] flex flex-col gap-1 text-primary-dark">
                            <h4 className="font-semibold">{title}</h4>
                            <p className="w-full text-xs">{description}</p>
                          </div>
                        </div>
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
            </FormItem>
          )}
        />
        <Button className="bg-blue-500 hover:bg-blue-500/90 text-white my-5 w-full">
          {isSubmitting ? <Loader2 className="animate-spin" /> : "Create"}
        </Button>
      </form>
    </Form>
  );
};

export default CreateBoardForm;
