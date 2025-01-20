import { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";

type TextEditorProps = {
  onValueChange: (value: string) => void
  description?: string;
}

export function TextEditor({ onValueChange, description }: TextEditorProps) {
  const editorRef = useRef(null); 

  return (
    <>
      <Editor
        apiKey={process.env.NEXT_PUBLIC_TINY_EDITOR_API_KEY}
        onInit={(evt, editor) => {
          // @ts-ignore
          editorRef.current = editor;
        }}
        onBlur={() => {}}
        onEditorChange={onValueChange}
        initialValue={description || ""}
        init={{
          height: 350,
          menubar: false,
          plugins: "codesample",
          toolbar:
            "undo redo codesample | blocks | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px, border: 0px; outline: 0px; }",
          skin: "oxide-dark",
          content_css: "dark",
        }}
      />
    </>
  );
}
