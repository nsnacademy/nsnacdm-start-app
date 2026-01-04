import { supabase } from "./supabase";

export async function saveUser(user) {
  if (!user?.telegram_id) return;

  const payload = {
    level: user.level,
    xp: user.xp,
    od: user.od,
    hp: user.hp,
    has_onboarded: user.has_onboarded ?? false,
  };

  const { error } = await supabase
    .from("users")
    .update(payload)
    .eq("telegram_id", user.telegram_id);

  if (error) {
    console.error("Error saving user:", error);
  }
}
