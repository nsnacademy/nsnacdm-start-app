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
  };

  console.log("📡 SUPABASE UPDATE PAYLOAD:", payload);

  const { data, error } = await supabase
    .from("users")
    .update(payload)
    .eq("telegram_id", user.telegram_id);

  if (error) {
    console.error("❌ SUPABASE ERROR:", error);
  } else {
    console.log("✅ SUPABASE OK:", data);
  }
}
