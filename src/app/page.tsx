import MessageSection from "@/components/chat-container";
import Navbar from "@/components/navbar";
import { createClient } from "@/utils/supabase-client";
import { Toaster } from "react-hot-toast";

export default async function Home() {
  const supabase = createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();
  return (
    <main>
      <Navbar />
      <MessageSection />
      <Toaster />
    </main>
  );
}
