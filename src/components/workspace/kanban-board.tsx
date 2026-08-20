"use client";

import React, { useState, useMemo, startTransition, useOptimistic } from "react";
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragStartEvent,
  DragOverEvent,
  DragEndEvent,
  defaultDropAnimationSideEffects,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Plus } from "lucide-react";
import { initials } from "@/lib/format";
import { updateSectionStatus } from "@/lib/actions/work";
import type { SectionStatus } from "@/lib/supabase/types";

export type Task = {
  id: string;
  title: string;
  status: string;
  owner: string;
  due: string;
  summary: string;
};

type KanbanBoardProps = {
  initialTasks: Task[];
};

const COLUMNS: { id: string; label: string; colorClass: string; dbStatus: SectionStatus }[] = [
  { id: "Backlog", label: "Backlog", colorClass: "border-t-border", dbStatus: "not_started" },
  { id: "In progress", label: "In progress", colorClass: "border-t-primary", dbStatus: "not_started" }, // Schema does not have in_progress
  { id: "Review", label: "Review", colorClass: "border-t-warning", dbStatus: "ai_draft" },
  { id: "Done", label: "Done", colorClass: "border-t-success", dbStatus: "team_reviewed" },
];

export function KanbanBoard({ initialTasks }: KanbanBoardProps) {
  const [activeTask, setActiveTask] = useState<Task | null>(null);

  const [optimisticTasks, addOptimisticTaskAction] = useOptimistic(
    initialTasks,
    (state: Task[], update: { id: string; status: string; newIndex: number }) => {
      const { id, status, newIndex } = update;
      const oldIndex = state.findIndex((t) => t.id === id);
      if (oldIndex === -1) return state;

      const newState = [...state];
      newState[oldIndex].status = status;
      return arrayMove(newState, oldIndex, newIndex);
    }
  );



  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  function handleDragStart(event: DragStartEvent) {
    const { active } = event;
    const task = optimisticTasks.find((t) => t.id === active.id);
    if (task) setActiveTask(task);
  }

  function handleDragOver(event: DragOverEvent) {
    // Optimistic UI updates handle the visual movement during hover
    const { active, over } = event;
    if (!over) return;
    const activeId = active.id as string;
    const overId = over.id as string;

    if (activeId === overId) return;

    const isActiveTask = active.data.current?.type === "Task";
    const isOverTask = over.data.current?.type === "Task";
    const isOverColumn = over.data.current?.type === "Column";

    if (!isActiveTask) return;

    startTransition(() => {
      if (isActiveTask && isOverTask) {
        const overTask = optimisticTasks.find((t) => t.id === overId);
        if (overTask) {
          const overIndex = optimisticTasks.findIndex((t) => t.id === overId);
          addOptimisticTaskAction({ id: activeId, status: overTask.status, newIndex: overIndex });
        }
      } else if (isActiveTask && isOverColumn) {
        const activeIndex = optimisticTasks.findIndex((t) => t.id === activeId);
        addOptimisticTaskAction({ id: activeId, status: overId, newIndex: activeIndex });
      }
    });
  }

  async function handleDragEnd(event: DragEndEvent) {
    setActiveTask(null);
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id as string;

    // Determine what column we dropped into
    let newColumnId = "";
    if (over.data.current?.type === "Column") {
      newColumnId = over.id as string;
    } else if (over.data.current?.type === "Task") {
      const overTask = optimisticTasks.find((t) => t.id === over.id);
      if (overTask) newColumnId = overTask.status;
    }

    if (newColumnId) {
      const col = COLUMNS.find((c) => c.id === newColumnId);
      if (col) {
        const originalTask = initialTasks.find((t) => t.id === activeId);
        // Only call server if status actually changed
        if (originalTask && originalTask.status !== newColumnId) {
          await updateSectionStatus(activeId, col.dbStatus);
        }
      }
    }
  }

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <div className="-mx-4 flex overflow-x-auto px-4 pb-6 sm:-mx-5 sm:px-5 lg:-mx-6 lg:px-6">
        <div className="flex gap-6 min-w-max">
          {COLUMNS.map((col) => (
            <KanbanColumn
              key={col.id}
              column={col}
              tasks={optimisticTasks.filter((task) => task.status === col.id)}
            />
          ))}
        </div>
      </div>

      <DragOverlay dropAnimation={{ sideEffects: defaultDropAnimationSideEffects({ styles: { active: { opacity: "0.4" } } }) }}>
        {activeTask ? <TaskCard task={activeTask} /> : null}
      </DragOverlay>
    </DndContext>
  );
}

function KanbanColumn({ column, tasks }: { column: { id: string; label: string; colorClass: string }; tasks: Task[] }) {
  const taskIds = useMemo(() => tasks.map((t) => t.id), [tasks]);

  // Use useDroppable to make the column droppable when empty
  const { setNodeRef } = useSortable({
    id: column.id,
    data: {
      type: "Column",
      column,
    },
  });

  return (
    <div
      ref={setNodeRef}
      className={`w-[320px] flex shrink-0 flex-col gap-3 rounded-t-lg border-t-2 ${column.colorClass} pt-3`}
    >
      <div className="flex items-center justify-between px-1">
        <span className="font-medium text-text-primary">{column.label}</span>
        <span className="text-sm font-medium text-text-muted">{tasks.length}</span>
      </div>

      <div className="flex flex-col gap-3 min-h-[150px]">
        <SortableContext items={taskIds} strategy={verticalListSortingStrategy}>
          {tasks.map((task) => (
            <SortableTaskCard key={task.id} task={task} />
          ))}
        </SortableContext>
        <button className="flex w-full items-center gap-2 rounded-xl border border-dashed border-border p-3 text-sm text-text-muted transition-colors hover:border-primary hover:text-text-primary hover:bg-surface-muted justify-center">
          <Plus className="h-4 w-4" /> Add task
        </button>
      </div>
    </div>
  );
}

function SortableTaskCard({ task }: { task: Task }) {
  const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
    id: task.id,
    data: {
      type: "Task",
      task,
    },
  });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };

  if (isDragging) {
    return (
      <div
        ref={setNodeRef}
        style={style}
        className="opacity-30 rounded-xl border-2 border-dashed border-primary bg-surface p-4 min-h-[120px]"
      />
    );
  }

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners} className="touch-none cursor-grab active:cursor-grabbing">
      <TaskCard task={task} />
    </div>
  );
}

function TaskCard({ task }: { task: Task }) {
  return (
    <div className="group flex flex-col items-start gap-3 rounded-xl border border-transparent bg-surface p-4 text-left shadow-sm transition-all duration-200 hover:border-border hover:shadow-md hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary focus-visible:ring-offset-2 focus-visible:ring-offset-bg">
      <div>
        <p className="font-medium text-white transition-colors group-hover:text-primary">{task.title}</p>
        <p className="mt-1.5 line-clamp-2 text-sm text-text-muted">{task.summary}</p>
      </div>

      <div className="mt-2 flex w-full items-center justify-between border-t border-border/50 pt-3">
        <div className="flex items-center gap-2">
          <span
            className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-soft text-[10px] font-semibold text-primary shadow-sm"
            title={task.owner}
          >
            {initials(task.owner)}
          </span>
          <span className="text-xs text-text-muted">{task.due}</span>
        </div>
        <div className="flex items-center gap-1.5 rounded-full border border-border bg-input-bg px-2 py-0.5" title="Priority">
          <span className={`h-1.5 w-1.5 rounded-full ${task.due === "Today" ? "bg-error" : "bg-success"}`} />
          <span className="text-[10px] uppercase tracking-wider text-text-muted">
            {task.due === "Today" ? "High" : "Normal"}
          </span>
        </div>
      </div>
    </div>
  );
}
