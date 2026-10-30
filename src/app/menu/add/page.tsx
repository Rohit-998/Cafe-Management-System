import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import AddMenuItemForm from "./AddMenuItemForm";

// /menu/add page — runs on the server.
// Bug CMS-24 fix: if nobody is logged in, send them to /login
// before the form is ever shown.
export default async function AddMenuItemPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return <AddMenuItemForm />;
}
