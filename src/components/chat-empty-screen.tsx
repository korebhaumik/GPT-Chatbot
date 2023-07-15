import React from "react";

type Props = {};

export default function EmptyMessage({}: Props) {
  return (
    <div className="px-8 border rounded py-9 border-zinc-800 bg-zinc-950">
      <h1 className="text-lg">Welcome to GPT-4 Lite Chatbot!</h1>
      <p className="pt-3 text-zinc-500">
        Experience the brilliance of GPT-4 in a
        lightweight package with our Lite GPT-4 Chatbot, offering advanced conversation capabilities, enhancing
        user engagement and satisfaction.
      </p>
      <p className="pt-3 text-zinc-500">
        You can start a conversation here or try the following examples:
      </p>
      <ul className="pt-3 text-slate-50">
        <li className="flex cursor-pointer hover:underline underline-offset-4">
          <RightArrowSVG />
          <span className="ml-2">What is the meaning of life?</span>
        </li>
        <li className="flex mt-2 cursor-pointer hover:underline underline-offset-4">
          <RightArrowSVG />
          <span className="ml-2">What is the best programming language?</span>
        </li>
        <li className="flex mt-2 cursor-pointer hover:underline underline-offset-4">
          <RightArrowSVG />
          <span className="ml-2">Draft an email </span>
        </li>
      </ul>
    </div>
  );
}

function RightArrowSVG() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
      />
    </svg>
  );
}
