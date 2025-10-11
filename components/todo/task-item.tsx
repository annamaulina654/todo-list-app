"use client"

import { Trash2 } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import type { Task } from "@/hooks/use-tasks"
import { Badge } from "@/components/ui/badge"

export function TaskItem({
  task,
  onToggleComplete,
  onDelete,
}: {
  task: Task
  onToggleComplete: (id: string) => void
  onDelete: (id: string) => void
}) {
  const [open, setOpen] = React.useState(false)
  const dueLabel = task.dueDate ? new Date(task.dueDate + "T00:00:00").toLocaleDateString() : null

  return (
        <li
      className="flex items-center justify-between rounded-md border bg-card p-3 transition-all hover:bg-accent animate-in fade-in"
      aria-label={task.title}
    >   <div className="flex min-w-0 items-center gap-3">
<Checkbox
  id={`chk-${task.id}`}
  checked={task.completed}
  onCheckedChange={() => onToggleComplete(task.id)}
  aria-label={task.completed ? "Mark as pending" : "Mark as completed"}
  className="dark:border-white data-[state=checked]:bg-white data-[state=checked]:text-black"
/>
        <div className="min-w-0">
          <label
            htmlFor={`chk-${task.id}`}
            className={`block truncate text-sm md:text-base ${task.completed ? "line-through opacity-60" : ""}`}
          >
            {task.title}
          </label>
          <div className="mt-1 flex items-center gap-2">
            {dueLabel ? <Badge variant="secondary">Due {dueLabel}</Badge> : null}
            {task.completed ? <Badge>Completed</Badge> : <Badge variant="outline">Pending</Badge>}
          </div>
        </div>
      </div>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogTrigger asChild>
          <Button variant="ghost" size="icon-sm" aria-label="Delete task">
            <Trash2 className="size-4 text-muted-foreground transition-colors hover:text-destructive" />
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete this task?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. The task "{task.title}" will be permanently removed.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                onDelete(task.id)
                setOpen(false)
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </li>
  )
}
