"use client";
import { useChat } from "ai/react";
import { ChatMessage } from "./chat-message";
import EmptyMessage from "./chat-empty-screen";
import ChatInput from "./chat-input";
import { toast } from "react-hot-toast";
import { useAuth } from "@/context/supabase-auth-provider";

type Props = {};

export default function MessageSection({}: Props) {
  const { promptCount } = useAuth();
  const { messages, setInput, append, input, isLoading } = useChat({
    body: {
      promptCount: promptCount,
    },
    api: "/api/chat",
    onResponse(response) {
      if (response.status === 401) {
        toast.error(response.statusText);
      }
    },
  });
  return (
    <div className="pb-[160px] pt-4 md:pt-8">
      <div className="relative max-w-2xl px-4 mx-auto">
        {messages.map((message, index) => (
          <div key={index}>
            <ChatMessage message={message} />
            {index < messages.length - 1 && (
              <hr className="border-zinc-800" />
            )}
          </div>
        ))}
        {messages.length === 0 && <EmptyMessage />}
      </div>
      <ChatInput
        append={append}
        input={input}
        setInput={setInput}
        isLoading={isLoading}
      />
    </div>
  );
}
