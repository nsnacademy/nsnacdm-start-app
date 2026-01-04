import { create } from "zustand";

export const useUserStore = create((set, get) => ({
  user: null,

  /**
   * Нормализация пользователя с нуля
   */
  setUser: (userData) =>
    set(() => ({
      user: {
        telegram_id: userData.telegram_id,
        level: userData.level && userData.level >= 1 ? userData.level : 1,

        xp: userData.xp ?? 0,
        od: userData.od ?? 0,
        hp: userData.hp ?? 0,
        has_onboarded: userData.has_onboarded ?? false,

        // 🔒 для защиты от дублей
        _lastRewardSource: null,
      },
    })),

  /**
   * Безопасное частичное обновление
   */
  updateUser: (patch) =>
    set((state) => ({
      user: {
        ...(state.user ?? {}),
        ...patch,
      },
    })),

  /**
   * Применение награды (ЕДИНСТВЕННОЕ МЕСТО ИЗМЕНЕНИЯ ЭКОНОМИКИ)
   * @param {Object} reward { od, xp, hp }
   * @param {string} sourceId уникальный id (например task.id)
   */
  applyReward: (reward, sourceId) =>
    set((state) => {
      const user = state.user;
      if (!user) return state;

      // 🔒 защита от повторного начисления
      if (user._lastRewardSource === sourceId) {
        return state;
      }

      const totalXp = user.xp + (reward.xp ?? 0);
      const levelUp = Math.floor(totalXp / 100);

      return {
        user: {
          ...user,
          od: user.od + (reward.od ?? 0),
          hp: user.hp + (reward.hp ?? 0),
          xp: totalXp % 100,
          level: user.level + levelUp,

          _lastRewardSource: sourceId,
        },
      };
    }),

  /**
   * ⚠️ ВРЕМЕННО (оставляем для совместимости)
   * Будет удалено после полного перехода на applyReward
   */
  addXp: (amount) =>
  set((state) => {
    if (!state.user) return {};

    const totalXp = state.user.xp + amount;

    const newLevel = state.user.level + Math.floor(totalXp / 100);
    const newXp = totalXp % 100;

    return {
      user: {
        ...state.user,
        level: newLevel,
        xp: newXp,
      },
    };
  }),

}));
