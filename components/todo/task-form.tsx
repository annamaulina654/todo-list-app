"use client";

import { Plus } from "lucide-react";
import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function TaskForm({
  onAdd,
}: {
  onAdd: (title: string, dueDate?: string) => void;
}) {
  const [title, setTitle] = React.useState("");
  const [dueDate, setDueDate] = React.useState<string>("");
  const [touched, setTouched] = React.useState<{
    title: boolean;
    due: boolean;
  }>({ title: false, due: false });

  const today = new Date();
  const yyyy = today.getFullYear();
  const mm = String(today.getMonth() + 1).padStart(2, "0");
  const dd = String(today.getDate()).padStart(2, "0");
  const minDate = `${yyyy}-${mm}-${dd}`;

  const errors = {
    title:
      title.trim().length === 0
        ? "Title is required"
        : title.trim().length > 120
        ? "Keep titles under 120 characters"
        : "",
    due: dueDate && dueDate < minDate ? "Due date cannot be in the past" : "",
  };

  const isValid = !errors.title && !errors.due;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched({ title: true, due: true });
    if (!isValid) return;
    onAdd(title, dueDate || undefined);
    setTitle("");
    setDueDate("");
    setTouched({ title: false, due: false });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid grid-cols-1 gap-3 md:grid-cols-12"
    >
      <div className="grid gap-1.5 md:col-span-7">
        <Label htmlFor="title">Task Title</Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g., Prepare project update"
          onBlur={() => setTouched((s) => ({ ...s, title: true }))}
          aria-invalid={touched.title && !!errors.title}
          aria-describedby="title-error"
        />
        <div className="h-5">
          {touched.title && errors.title ? (
            <p
              id="title-error"
              className="text-destructive text-sm"
              role="alert"
              aria-live="polite"
            >
              {errors.title}
            </p>
          ) : null}
        </div>
      </div>

      <div className="grid gap-1.5 md:col-span-3">
        <Label htmlFor="due">Due Date</Label>
        <Input
          id="due"
          type="date"
          value={dueDate}
          min={minDate}
          onChange={(e) => setDueDate(e.target.value)}
          onBlur={() => setTouched((s) => ({ ...s, due: true }))}
          aria-invalid={!!errors.due}
          aria-describedby="due-error"
        />
        <div className="h-5">
          {touched.due && errors.due ? (
            <p
              id="due-error"
              className="text-destructive text-sm"
              role="alert"
              aria-live="polite"
            >
              {errors.due}
            </p>
          ) : null}
        </div>
      </div>

      <div className="flex items-end pb-6.5 md:col-span-2">
        <Button type="submit" className="w-full" disabled={!isValid}>
          <Plus className="size-4 mr-2" />
          Add Task
        </Button>
      </div>
    </form>
  );
}
