import { supabase } from "./supabase";

export async function saveTransaction({
  userId,
  type,
  product,
  amount,
}) {
  const { error } = await supabase.from("transactions").insert({
    user_id: String(userId),
    type,
    product,
    amount,
  });

  if (error) {
    console.error("❌ saveTransaction error:", error);
  }
}
