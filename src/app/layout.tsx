import SupabaseProvider from "@/context/supabase-provider";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import SupabaseAuthProvider from "@/context/supabase-auth-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  icons: "EdgeBot.svg",
  title: "AI Chatbot",
  description:
    "Lite AI Chatbot optimised built with OpenAI GPT-4 , NextJS and Supabase.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SupabaseProvider>
      <SupabaseAuthProvider>
        <html lang="en">
          <body className={inter.className}>{children}</body>
        </html>
      </SupabaseAuthProvider>
    </SupabaseProvider>
  );
}
