import { create } from "zustand";

export const useTaskStore = create((set) => ({
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
}));
