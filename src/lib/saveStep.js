import { supabase } from "./supabase";

/**
 * Сохраняет одну попытку (шаг)
 */
export async function saveStep({
  userId,
  taskId = null,
  totalSeconds,
  spentSeconds,
}) {
  const percentDone = Math.round(
    (spentSeconds / totalSeconds) * 100
  );

  let result = "abandoned";

  if (percentDone === 100) {
    result = "completed";
  } else if (percentDone >= 50) {
    result = "almost";
  }

  const { error } = await supabase
    .from("steps")
    .insert({
      user_id: userId,
      task_id: taskId,
      total_seconds: totalSeconds,
      spent_seconds: spentSeconds,
      percent_done: percentDone,
      result,
    });

  if (error) {
    console.error("❌ saveStep error:", error);
  }
}
