"use client"

import useSWR from "swr"

export type Task = {
  id: string
  title: string
  dueDate?: string
  completed: boolean
  createdAt: string
}

type Filter = "all" | "pending" | "completed"

const STORAGE_KEY = "todo.tasks.v1"
const FILTER_KEY = "todo.filter.v1"

const readJSON = <T,>(key: string, fallback: T): T => {
  if (typeof window === "undefined") return fallback
  try {
    const raw = window.localStorage.getItem(key)
    if (!raw) return fallback
    return JSON.parse(raw) as T
  } catch {
    return fallback
  }
}

const writeJSON = (key: string, value: unknown) => {
  if (typeof window === "undefined") return
  try {
    window.localStorage.setItem(key, JSON.stringify(value))
  } catch {
    // no-op
  }
}

const fetchTasks = async (): Promise<Task[]> => {
  return readJSON<Task[]>(STORAGE_KEY, [])
}

export function useTasks() {
  const { data, mutate } = useSWR<Task[]>(STORAGE_KEY, fetchTasks, {
    fallbackData: [],
  })

  const tasks = data ?? []

  const save = async (next: Task[]) => {
    writeJSON(STORAGE_KEY, next)
    await mutate(next, { revalidate: false })
  }

  const initialFilter =
    (typeof window !== "undefined" && (window.localStorage.getItem(FILTER_KEY) as Filter | null)) || "all"
  const [filter, setFilterState] = React.useState<Filter>(initialFilter)

  const setFilter = (f: Filter) => {
    setFilterState(f)
    if (typeof window !== "undefined") {
      window.localStorage.setItem(FILTER_KEY, f)
    }
  }

  const addTask = (title: string, dueDate?: string) => {
    const newTask: Task = {
      id: typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : String(Date.now()),
      title: title.trim(),
      dueDate: dueDate || undefined,
      completed: false,
      createdAt: new Date().toISOString(),
    }
    const next = [newTask, ...tasks]
    void save(next)
  }

  const toggleComplete = (id: string) => {
    const next = tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
    void save(next)
  }

  const deleteTask = (id: string) => {
    const next = tasks.filter((t) => t.id !== id)
    void save(next)
  }

  const clearAll = () => {
    void save([])
  }

  const filteredTasks =
    filter === "all"
      ? tasks
      : filter === "pending"
        ? tasks.filter((t) => !t.completed)
        : tasks.filter((t) => t.completed)

  const counts = {
    all: tasks.length,
    pending: tasks.filter((t) => !t.completed).length,
    completed: tasks.filter((t) => t.completed).length,
  }

  return {
    tasks,
    filteredTasks,
    filter,
    setFilter,
    addTask,
    toggleComplete,
    deleteTask,
    clearAll,
    counts,
  }
}

import React from "react"
