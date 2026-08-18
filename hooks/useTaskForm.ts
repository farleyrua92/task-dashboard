import { useState } from "react";

export interface TaskFormValues {
  title: string;
  description: string;
  status: "pending" | "in-progress" | "done";
}

type Errors = Partial<Record<keyof TaskFormValues, string>>;

const INITIAL: TaskFormValues = {
  title: "",
  description: "",
  status: "pending",
};

export function useTaskForm(onValidSubmit: (values: TaskFormValues) => Promise<void>) {
  const [values, setValues] = useState<TaskFormValues>(INITIAL);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  }

  function validate(v: TaskFormValues): Errors {
    const next: Errors = {};
    if (!v.title.trim()) next.title = "Title is required.";
    else if (v.title.trim().length < 3) next.title = "Minimum 3 characters.";
    if (v.description.length > 200) next.description = "Maximum 200 characters.";
    return next;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    setSubmitted(false);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setLoading(true);
    setApiError(null);

    try {
      await onValidSubmit(values);
      setValues(INITIAL);
      setSubmitted(true);
    } catch (err) {
      setApiError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  return { values, errors, submitted, loading, apiError, handleChange, handleSubmit };
}
