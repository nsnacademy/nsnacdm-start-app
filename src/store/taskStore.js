import { create } from "zustand";

export const useTaskStore = create((set) => ({
  tasks: [],
  activeTask: null,

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
      activeTask: null,
    })),

  // ===== TIMER FLOW =====
  startTask: (task) =>
    set(() => ({
      activeTask: task,
    })),

  clearActiveTask: () =>
    set(() => ({
      activeTask: null,
    })),

  // ✅ ДОБАВИТЬ ВОТ ЭТО
  finishTask: () =>
    set(() => ({
      activeTask: null,
    })),
}));
