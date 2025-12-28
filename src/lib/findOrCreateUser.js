import { supabase } from "./supabase";

export async function findOrCreateUser(tgUser) {
  if (!tgUser || !tgUser.id) {
    console.error("Telegram user is missing");
    return null;
  }

  const telegram_id = String(tgUser.id);

  // 1. Проверяем — есть ли такой пользователь в Supabase
  const { data: existing, error: selectError } = await supabase
    .from("users")
    .select("*")
    .eq("telegram_id", telegram_id)
    .single();

  if (selectError && selectError.code !== "PGRST116") {
    console.error("Supabase select error:", selectError);
    return null;
  }

  if (existing) {
    console.log("User already exists:", existing);
    return existing;
  }

  // 2. Если нет — создаём
  const newUser = {
    telegram_id,
    username: tgUser.username || "",
    first_name: tgUser.first_name || "",
    created_at: new Date().toISOString(),
    level: 1,
    xp: 0,
  };

  const { data: inserted, error: insertError } = await supabase
    .from("users")
    .insert(newUser)
    .select()
    .single();

  if (insertError) {
    console.error("Supabase insert error:", insertError);
    return null;
  }

  console.log("Created new user:", inserted);
  return inserted;
}
