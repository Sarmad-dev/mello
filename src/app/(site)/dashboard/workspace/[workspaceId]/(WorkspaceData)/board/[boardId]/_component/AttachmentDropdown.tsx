import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useMutation } from "convex/react";
import Image from "next/image";
import React, { ReactNode, useRef, useState } from "react";
import { api } from "../../../../../../../../../../convex/_generated/api";
import { fetchMutation } from "convex/nextjs";
import { Id } from "../../../../../../../../../../convex/_generated/dataModel";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

interface AttachmentDropdownProps {
  children: ReactNode;
  cardId: Id<"cards">;
}

const AttachmentDropdown = ({ children, cardId }: AttachmentDropdownProps) => {
  const fileRef = useRef<HTMLInputElement | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const generateUploadUrl = useMutation(api.cards.generateUploadUrl);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageSrc(e.target?.result as string); // Get the base64-encoded image
      };
      reader.readAsDataURL(file); // Convert file to base64
    }
  };

  const handleFileUpload = async () => {
    try {
      setLoading(true);
      // Step 1: Get a short-lived upload URL
      const postUrl = await generateUploadUrl();
      // Step 2: POST the file to the URL
      const result = await fetch(postUrl, {
        method: "POST",
        headers: { "Content-Type": selectedImage!.type },
        body: selectedImage,
      });
      const { storageId } = await result.json();
      // Step 3: Save the newly allocated storage id to the database
      await fetchMutation(api.cards.addImageToCard, { cardId, storageId });

      toast.success("Image Uploaded");
      setSelectedImage(null);
      fileRef.current!.value = "";
      setLoading(false);
    } catch {
      toast.error("Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent side="right" className="w-[350px]">
        <DropdownMenuLabel className="text-center">Attach</DropdownMenuLabel>
        <div className="mt-5 flex flex-col gap-3">
          <Input
            type="file"
            className="hidden"
            accept="image/*"
            ref={fileRef}
            onChange={handleFileChange}
            disabled={selectedImage !== null}
          />
          <Button
            className="w-full bg-white/10 text-white hover:bg-white/20"
            onClick={() => fileRef.current?.click()}
          >
            Choose a File
          </Button>
          {imageSrc && (
            <div className="w-full h-[190px] flex items-center justify-center">
              <div className="h-full w-[150px] relative">
                <Image src={imageSrc!} alt="preview Image" fill />
              </div>
            </div>
          )}

          {selectedImage && (
            <Button
              className="w-full bg-white/10 text-white hover:bg-white/20"
              onClick={handleFileUpload}
              disabled={loading}
            >
              {loading ? <Loader2 className="animate-spin" /> : "Upload"}
            </Button>
          )}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AttachmentDropdown;
