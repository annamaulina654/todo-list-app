"use client"

import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useTasks } from "@/hooks/use-tasks"
import { TaskForm } from "@/components/todo/task-form"
import { TaskFilters } from "@/components/todo/task-filters"
import { TaskList } from "@/components/todo/task-list"
import { ThemeToggle } from "@/components/todo/theme-toggle"

export default function Page() {
  const { tasks, filteredTasks, filter, setFilter, addTask, toggleComplete, deleteTask, clearAll, counts } = useTasks()

  return (
    <main className="mx-auto max-w-3xl p-4 md:p-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-pretty text-2xl font-semibold tracking-tight md:text-3xl">To-Do List</h1>
          <p className="text-muted-foreground text-sm">Manage tasks with due dates, filters, and persistence.</p>
        </div>
        <ThemeToggle />
      </header>

      <section className="mt-4">
        <Card className="p-4 md:p-6">
          <TaskForm onAdd={addTask} />
          <Separator className="my-4" />
          <TaskFilters filter={filter} setFilter={setFilter} counts={counts} />
          <TaskList
            tasks={filteredTasks}
            onToggleComplete={toggleComplete}
            onDeleteTask={deleteTask}
            onClearAll={clearAll}
          />
        </Card>
      </section>
    </main>
  )
}
