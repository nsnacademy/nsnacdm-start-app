import { supabase } from "./supabase";

export async function saveUser(user) {
  console.log("➡️ saveUser CALLED WITH:", user);

  if (!user || !user.telegram_id) {
    console.log("❌ saveUser ABORT: no user or telegram_id");
    return;
  }

  const payload = {
    level: user.level,
    xp: user.xp,
    od: user.od,
    hp: user.hp,
    has_onboarded: user.has_onboarded ?? false,

    // 🔒 ВАЖНО:
    // передаём has_help_access ТОЛЬКО если он есть в user
    ...(typeof user.has_help_access === "boolean"
      ? { has_help_access: user.has_help_access }
      : {}),
  };

  console.log("📡 SUPABASE UPDATE PAYLOAD:", payload);

  const { data, error } = await supabase
    .from("users")
    .update(payload)
    .eq("telegram_id", String(user.telegram_id))
    .select();

  if (error) {
    console.error("❌ SUPABASE ERROR:", error);
  } else {
    console.log("✅ SUPABASE UPDATED ROWS:", data);
  }
}
