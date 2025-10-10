"use client"

import { Button } from "@/components/ui/button"

type Filter = "all" | "pending" | "completed"

export function TaskFilters({
  filter,
  setFilter,
  counts,
}: {
  filter: Filter
  setFilter: (f: Filter) => void
  counts: { all: number; pending: number; completed: number }
}) {
  const tabs: { key: Filter; label: string; count: number }[] = [
    { key: "all", label: "All", count: counts.all },
    { key: "pending", label: "Pending", count: counts.pending },
    { key: "completed", label: "Completed", count: counts.completed },
  ]

  return (
    <div className="flex items-center gap-2">
      {tabs.map((t) => (
        <Button
          key={t.key}
          type="button"
          variant={filter === t.key ? "default" : "secondary"}
          onClick={() => setFilter(t.key)}
          aria-pressed={filter === t.key}
        >
          {t.label} ({t.count})
        </Button>
      ))}
    </div>
  )
}
