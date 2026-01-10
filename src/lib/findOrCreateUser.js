import { supabase } from "./supabase";

export async function findOrCreateUser(tgUser) {
  if (!tgUser || !tgUser.id) {
    console.error("Telegram user is missing");
    return null;
  }

  const telegram_id = String(tgUser.id);

  // 1 — ищем пользователя
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
  // 👇 если username / first_name пустые — обновляем
  if (!existing.username || !existing.first_name) {
    const updates = {
      username: tgUser.username || existing.username,
      first_name: tgUser.first_name || existing.first_name,
    };

    const { data: updated, error: updateError } = await supabase
      .from("users")
      .update(updates)
      .eq("telegram_id", telegram_id)
      .select()
      .single();

    if (updateError) {
      console.error("Supabase update error:", updateError);
      return existing;
    }

    console.log("User updated with Telegram data:", updated);
    return updated;
  }

  return existing;
}


  // 2 — создаём нового
  const newUser = {
    telegram_id,
    username: tgUser.username || "",
    first_name: tgUser.first_name || "",
    created_at: new Date().toISOString(),
    level: 1,
    xp: 0,
    od: 0,
    has_onboarded: false,
    has_accepted_policy: false,
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
