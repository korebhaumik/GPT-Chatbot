import { useAuth } from "@/context/supabase-auth-provider";
import { Message, CreateMessage, ChatRequestOptions } from "ai";
import React from "react";

type Props = {
  append: (
    message: Message | CreateMessage,
    chatRequestOptions?: ChatRequestOptions | undefined
  ) => Promise<string | null | undefined>;
  input: string;
  setInput: (value: React.SetStateAction<string>) => void;
  isLoading: boolean;
};

export default function ChatInput({
  append,
  input,
  setInput,
  isLoading,
}: Props) {
  const { getPromptCount } = useAuth();
  const [temp, setTemp] = React.useState<string>("");
  return (
    <div className="fixed inset-x-0 bottom-0 bg-gradient-to-b w-full h-52 flex from-black/5 from-10% to-black/30 to-50%">
      <form
        className="fixed bottom-0 pb-8 w-full md:w-[40rem] bg-zinc-950  left-1/2 -translate-x-1/2 border rounded-t border-zinc-800"
        onSubmit={async (e) => {
          e.preventDefault();
          if (!input) return;
          setTemp("");
          await getPromptCount();
          await append({
            content: `${input}`,
            role: "user",
          });
          setInput("");
        }}
      >
        <div className="flex items-center py-2 m-5 border rounded border-zinc-800">
          <input
            type="text"
            placeholder="Eg: How to make a sandwich?"
            value={temp}
            className="w-full px-4 py-2 text-sm text-white border-none rounded-none outline-none placeholder-zinc-600 bg-inherit"
            onChange={(e) => {
              setTemp(e.target.value);
              setInput(e.target.value);
            }}
          />
          <button
            className="px-5 py-2 text-white w-fit "
            type="submit"
            disabled={isLoading}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6 rotate-180"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        </div>
        <p className="mx-auto text-sm text-zinc-500 w-fit">
          GPT-4 Lite AI Chatbot developed by{" "}
          <span className="underline cursor-pointer text-zinc-400">
            @korebhaumik
          </span>
        </p>
      </form>
    </div>
  );
}
