import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

export async function saveUser(user) {
  if (!user) return;

  const userToSave = {
    telegram_id: String(user.id),          // твоя таблица использует telegram_id
    username: user.username || null,
    first_name: user.first_name || null,
    created_at: new Date().toISOString(),
    level: 1,
    xp: 0
  };

  console.log("Saving user to Supabase:", userToSave);

  const { error } = await supabase
    .from("users")
    .upsert(userToSave, { onConflict: "telegram_id" });

  if (error) {
    console.error("Supabase error:", error);
  } else {
    console.log("User saved successfully!");
  }
}
