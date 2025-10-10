"use client"

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
import { TaskItem } from "@/components/todo/task-item"
import { Separator } from "@/components/ui/separator"

export function TaskList({
  tasks,
  onToggleComplete,
  onDeleteTask,
  onClearAll,
}: {
  tasks: Task[]
  onToggleComplete: (id: string) => void
  onDeleteTask: (id: string) => void
  onClearAll: () => void
}) {
  const [open, setOpen] = React.useState(false)

  return (
    <div className="mt-4">
      <div className="mb-2 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">
          {tasks.length} {tasks.length === 1 ? "task" : "tasks"}
        </p>

        <AlertDialog open={open} onOpenChange={setOpen}>
          <AlertDialogTrigger asChild>
            <Button variant="outline" size="sm" disabled={tasks.length === 0}>
              Clear All
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Clear all tasks?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete all tasks. You cannot undo this action.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  onClearAll()
                  setOpen(false)
                }}
              >
                Clear
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>

      <Separator className="mb-3" />

      {tasks.length === 0 ? (
        <div className="rounded-md border bg-card p-6 text-center" aria-live="polite">
          <p className="text-pretty">No tasks to show. Add a task to get started!</p>
        </div>
      ) : (
        <ul className="grid gap-2">
          {tasks.map((t) => (
            <TaskItem key={t.id} task={t} onToggleComplete={onToggleComplete} onDelete={onDeleteTask} />
          ))}
        </ul>
      )}
    </div>
  )
}
