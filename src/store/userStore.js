import { create } from "zustand";

export const useUserStore = create((set) => ({
  user: null,

  setUser: (userData) =>
    set(() => ({ user: userData })),

  updateUser: (patch) =>
    set((state) => ({
      user: { ...state.user, ...patch }
    })),

  addXp: (amount) =>
    set((state) => {
      const newXp = state.user.xp + amount;
      let newLevel = state.user.level;

      if (newXp >= 100) {
        newLevel += 1;
      }

      return {
        user: {
          ...state.user,
          xp: newXp % 100,
          level: newLevel,
        },
      };
    }),
}));
