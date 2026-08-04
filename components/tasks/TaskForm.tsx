"use client";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { FileUpload } from "@/components/tasks/FileUpload";
import { useTaskForm } from "@/hooks/useTaskForm";
import { useFileUpload } from "@/hooks/useFileUpload";
import { createTask } from "@/lib/api";
import { Task } from "@/lib/types";

export function TaskForm({ onCreate }: { onCreate: (task: Task) => void }) {
  const { attachment, error: fileError, handleFileChange, clear: clearFile } = useFileUpload();

  const { values, errors, submitted, loading, apiError, handleChange, handleSubmit } =
    useTaskForm(async (formValues) => {
      const task = await createTask({ ...formValues, attachment: attachment ?? undefined });
      onCreate(task);
      clearFile();
    });

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 rounded-lg border border-gray-200 bg-white p-5"
    >
      <h2 className="text-lg font-semibold text-gray-900">New task</h2>

      <Input
        id="title"
        name="title"
        label="Title"
        value={values.title}
        onChange={handleChange}
        error={errors.title}
        disabled={loading}
        placeholder="E.g.: Set up CI/CD pipeline"
      />

      <div className="flex flex-col gap-1">
        <label htmlFor="description" className="text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          id="description"
          name="description"
          value={values.description}
          onChange={handleChange}
          rows={3}
          disabled={loading}
          aria-invalid={!!errors.description}
          className={
            "rounded-md border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-teal-600 disabled:cursor-not-allowed disabled:bg-gray-50 " +
            (errors.description ? "border-red-500" : "border-gray-300")
          }
          placeholder="Optional details (max. 200 characters)"
        />
        {errors.description && (
          <span className="text-xs text-red-600">{errors.description}</span>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="status" className="text-sm font-medium text-gray-700">
          Status
        </label>
        <select
          id="status"
          name="status"
          value={values.status}
          onChange={handleChange}
          disabled={loading}
          className="rounded-md border border-gray-300 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-teal-600 disabled:cursor-not-allowed disabled:bg-gray-50"
        >
          <option value="pending">Pending</option>
          <option value="in-progress">In progress</option>
          <option value="done">Done</option>
        </select>
      </div>

      <FileUpload
        attachment={attachment}
        error={fileError}
        disabled={loading}
        onChange={handleFileChange}
        onClear={clearFile}
      />

      {apiError && (
        <p role="alert" className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
          {apiError}
        </p>
      )}

      <div className="flex items-center gap-3">
        <Button type="submit" disabled={loading} aria-busy={loading}>
          {loading ? "Saving..." : "Create task"}
        </Button>
        {submitted && !loading && (
          <span role="status" className="text-sm text-green-600">
            ✓ Task created
          </span>
        )}
      </div>
    </form>
  );
}
