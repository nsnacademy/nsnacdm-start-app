import { create } from "zustand";

export const useUserStore = create((set, get) => ({
  user: null,

  /**
   * ЕДИНАЯ безопасная инициализация пользователя
   * НИЧЕГО не затирает
   */
  setUser: (userData) => {
    console.log("🔥 setUser CALLED WITH:", userData);

    set((state) => {
      const prev = state.user ?? {};

      return {
        user: {
          // сохраняем всё, что уже есть
          ...prev,

          // накладываем новые данные
          ...userData,

          // строгие гарантии
          telegram_id: userData.telegram_id ?? prev.telegram_id,
          level:
            userData.level && userData.level >= 1
              ? userData.level
              : prev.level ?? 1,

          xp: userData.xp ?? prev.xp ?? 0,
          od: userData.od ?? prev.od ?? 0,
          hp: userData.hp ?? prev.hp ?? 0,

          has_help_access:
            userData.has_help_access ??
            prev.has_help_access ??
            false,

          has_onboarded:
            userData.has_onboarded ?? prev.has_onboarded ?? false,

          has_accepted_policy:
            userData.has_accepted_policy ??
            prev.has_accepted_policy ??
            false,

          accepted_policy_at:
            userData.accepted_policy_at ??
            prev.accepted_policy_at ??
            null,

          _lastRewardSource: null,
        },
      };
    });
  },

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
   * Применение награды (ЕДИНСТВЕННОЕ МЕСТО ЭКОНОМИКИ)
   */
  applyReward: (reward, sourceId) =>
    set((state) => {
      const user = state.user;
      if (!user) return state;

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
   * Списание Од (покупка)
   */
  spendOd: (amount, sourceId) =>
    set((state) => {
      const user = state.user;
      if (!user) return state;

      if (user._lastRewardSource === sourceId) return state;
      if (user.od < amount) return state;

      return {
        user: {
          ...user,
          od: user.od - amount,
          _lastRewardSource: sourceId,
        },
      };
    }),

  /**
   * Открытие доступа к помощи (ПОКУПКА)
   */
  unlockHelpAccess: (sourceId) =>
    set((state) => {
      const user = state.user;
      if (!user) return state;
      if (user.has_help_access) return state;

      return {
        user: {
          ...user,
          has_help_access: true,
          _lastRewardSource: sourceId,
        },
      };
    }),

  /**
   * ⚠️ legacy
   */
  addXp: (amount) =>
    set((state) => {
      if (!state.user) return state;

      const totalXp = state.user.xp + amount;

      return {
        user: {
          ...state.user,
          level: state.user.level + Math.floor(totalXp / 100),
          xp: totalXp % 100,
        },
      };
    }),
}));
