import { supabase } from "./supabase";

export async function saveUser(tgUser) {
  const payload = {
    telegram_id: String(tgUser.id),
    username: tgUser.username || null,
    first_name: tgUser.first_name || null,
    created_at: new Date().toISOString(),
    level: 1,
    xp: 0
  };

  console.log("Sending to Supabase:", payload);

  const { data, error } = await supabase
    .from("users")
    .upsert(payload, { onConflict: "telegram_id" });

  if (error) {
    console.error("Supabase error:", error);
  } else {
    console.log("User saved:", data);
  }
}
