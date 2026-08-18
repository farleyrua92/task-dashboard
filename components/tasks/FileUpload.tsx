"use client";

import { TaskAttachment } from "@/lib/types";

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

export function FileUpload({
  attachment,
  error,
  disabled,
  onChange,
  onClear,
}: {
  attachment: TaskAttachment | null;
  error?: string;
  disabled?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onClear: () => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-gray-700">Attachment (optional)</label>

      {!attachment && (
        <label
          htmlFor="attachment"
          className={
            "flex items-center justify-center rounded-md border border-dashed px-3 py-4 text-sm " +
            (disabled
              ? "cursor-not-allowed border-gray-200 text-gray-400"
              : "cursor-pointer border-gray-300 text-gray-500 hover:border-teal-600 hover:text-teal-700")
          }
        >
          Click to select a file (max. 5MB)
          <input
            id="attachment"
            name="attachment"
            type="file"
            className="hidden"
            disabled={disabled}
            onChange={onChange}
          />
        </label>
      )}

      {attachment && (
        <div className="flex items-center gap-3 rounded-md border border-gray-200 p-3">
          {attachment.type.startsWith("image/") ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={attachment.dataUrl}
              alt={attachment.name}
              className="h-12 w-12 shrink-0 rounded object-cover"
            />
          ) : (
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded bg-gray-100 text-xs font-medium text-gray-500">
              FILE
            </div>
          )}
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-gray-900">{attachment.name}</p>
            <p className="text-xs text-gray-500">{formatSize(attachment.size)}</p>
          </div>
          <button
            type="button"
            onClick={onClear}
            disabled={disabled}
            className="text-xs font-medium text-red-600 hover:underline disabled:cursor-not-allowed disabled:opacity-50"
          >
            Remove
          </button>
        </div>
      )}

      {error && <span className="text-xs text-red-600">{error}</span>}
    </div>
  );
}
