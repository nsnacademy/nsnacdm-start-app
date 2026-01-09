import { supabase } from "./supabase";

export async function saveFounderRequest({ user, form }) {
  if (!user?.telegram_id) {
    console.error("No telegram_id");
    return;
  }

  const payload = {
    telegram_id: String(user.telegram_id),
    username: user.username || null,
    first_name: user.first_name || null,
    free: form.free || null,
    feeling: form.feeling || null,
    tried: form.tried || null,
    status: "new",
  };

  const { error } = await supabase
    .from("founder_requests")
    .insert(payload);

  if (error) {
    console.error("❌ saveFounderRequest error:", error);
    throw error;
  }
}
