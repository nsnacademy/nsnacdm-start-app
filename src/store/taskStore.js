import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useTaskStore = create(
  persist(
    (set) => ({
      tasks: [],

      addTask: (task) =>
        set((state) => ({
          tasks: [...state.tasks, task],
        })),

      removeTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((t) => t.id !== id),
        })),

      clearTasks: () =>
        set(() => ({
          tasks: [],
        })),
    }),
    {
      name: "tasks-storage", // ← имя хранилища в localStorage
    }
  )
);
