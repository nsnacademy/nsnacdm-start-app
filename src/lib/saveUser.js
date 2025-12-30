import { supabase } from "./supabase";

export async function saveUser(user) {
  if (!user || !user.telegram_id) return;

  const { data, error } = await supabase
    .from("users")
    .update({
      level: user.level,
      xp: user.xp,
      od: user.od,
      has_onboarded: user.has_onboarded ?? false
    })
    .eq("telegram_id", user.telegram_id);

  if (error) {
    console.error("Error saving user:", error);
  } else {
    console.log("User saved:", data);
  }
}
