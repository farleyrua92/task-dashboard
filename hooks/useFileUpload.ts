import { useState } from "react";
import { TaskAttachment } from "@/lib/types";

const MAX_SIZE_BYTES = 5 * 1024 * 1024;

export function useFileUpload() {
  const [attachment, setAttachment] = useState<TaskAttachment | null>(null);
  const [error, setError] = useState<string | undefined>();

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    if (file.size > MAX_SIZE_BYTES) {
      setError("File is too large (max. 5MB).");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setError(undefined);
      setAttachment({
        name: file.name,
        size: file.size,
        type: file.type,
        dataUrl: reader.result as string,
      });
    };
    reader.onerror = () => setError("Could not read the file.");
    reader.readAsDataURL(file);
  }

  function clear() {
    setAttachment(null);
    setError(undefined);
  }

  return { attachment, error, handleFileChange, clear };
}
