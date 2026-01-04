// src/lib/applyTaskReward.js

/**
 * Единая функция расчёта награды за задачу
 * ❗ Здесь ВСЯ экономика — больше нигде
 */
export function applyTaskReward(task) {
  if (!task) {
    return { od: 0, xp: 0, hp: 0 };
  }

  const minutes = task.time ?? 0;

  // ===== ФОРМУЛЫ (можно балансить в одном месте) =====

  // Очки действия — ресурс (тратится)
  const od = Math.max(1, Math.round(minutes));

  // Опыт — влияет на уровень
  const xp = Math.round(minutes * 1.5);

  // ХП — энергия / состояние
  const hp = Math.round(minutes * 2.5);

  return {
    od,
    xp,
    hp,
  };
}
