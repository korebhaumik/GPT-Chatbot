import { Message } from "ai";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";

import { CodeBlock } from "@/components/codeblock";
import { MemoizedReactMarkdown } from "@/components/markdown";

export interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message, ...props }: ChatMessageProps) {
  return (
    <div
      className={"relative  my-8 flex items-start md:-ml-12"}
      {...props}
    >
      <div
        className={`flex h-8 w-8 shrink-0 select-none items-center justify-center rounded-md border border-zinc-800 shadow ${
          
            message.role === "user" ? "bg-black" : "bg-emerald-800"
        }`}
      >
        {message.role === "user" ? <IconUser /> : <IconOpenAI />}
      </div>
      <div className="flex-1 px-1 ml-4 space-y-2 overflow-hidden">
        <MemoizedReactMarkdown
          className="prose break-words dark:prose-invert prose-p:leading-relaxed prose-pre:p-0"
          remarkPlugins={[remarkGfm, remarkMath]}
          components={{
            p({ children }) {
              return <p className="mb-2 last:mb-0">{children}</p>;
            },
            code({ node, inline, className, children, ...props }) {
              if (children.length) {
                if (children[0] == "▍") {
                  return (
                    <span className="mt-1 cursor-default animate-pulse">▍</span>
                  );
                }

                children[0] = (children[0] as string).replace("`▍`", "▍");
              }

              const match = /language-(\w+)/.exec(className || "");

              if (inline) {
                return (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              }

              return (
                <CodeBlock
                  key={Math.random()}
                  language={(match && match[1]) || ""}
                  value={String(children).replace(/\n$/, "")}
                  {...props}
                />
              );
            },
          }}
        >
          {message.content}
        </MemoizedReactMarkdown>
      </div>
    </div>
  );
}

function IconUser() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="w-5 h-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
      />
    </svg>
  );
}

function IconOpenAI() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className="text-black border-none rounded w-7 h-7 p-[5px] bg-slate-50"
    >
      <path
        d="M11.1348 1.01758C10.8718 1.00499 10.6068 1.00883 10.338 1.03321C8.1136 1.2339 6.33629 2.79408 5.60944 4.82031C3.89712 5.17684 2.43734 6.30485 1.67194 7.95703C0.734056 9.98406 1.19735 12.3008 2.58796 13.9434C2.04033 15.6052 2.28569 17.4345 3.3321 18.9219C4.61828 20.7478 6.85664 21.5047 8.97468 21.1211C10.1397 22.4276 11.8476 23.1305 13.6622 22.9668C15.8866 22.7661 17.6639 21.206 18.3907 19.1797C20.103 18.8231 21.5639 17.696 22.3301 16.043C23.2682 14.0163 22.8054 11.6971 21.4141 10.0547C21.9608 8.39344 21.714 6.56484 20.668 5.07813C19.3819 3.25224 17.1435 2.49531 15.0255 2.87891C14.033 1.766 12.6469 1.08998 11.1348 1.01758ZM11.0255 2.51367C11.922 2.54885 12.7551 2.87459 13.4317 3.42188C13.3186 3.47792 13.2002 3.51641 13.0899 3.58008L9.07624 5.89649C8.77024 6.07249 8.58024 6.39896 8.57624 6.75196L8.51765 12.2383L6.75007 11.1895V6.78516C6.75007 4.64916 8.30766 2.74225 10.4337 2.53125C10.633 2.5115 10.8305 2.50603 11.0255 2.51367ZM16.1251 4.25586C17.3987 4.26342 18.6399 4.82516 19.418 5.91016C20.0709 6.81959 20.3103 7.902 20.1466 8.94727C20.0415 8.87736 19.9482 8.79415 19.838 8.73047L15.8262 6.41406C15.5202 6.23806 15.144 6.23521 14.836 6.40821L10.0528 9.10352L10.0762 7.04883L13.8907 4.84766C14.5844 4.44716 15.3609 4.25133 16.1251 4.25586ZM5.28327 6.47266C5.27528 6.59853 5.25007 6.7204 5.25007 6.84766V11.4805C5.25007 11.8335 5.4363 12.1598 5.7403 12.3398L10.4649 15.1367L8.6739 16.1426L4.85944 13.9395C3.00944 12.8715 2.13665 10.5671 3.01765 8.6211C3.47963 7.60069 4.29644 6.85358 5.28327 6.47266ZM15.3262 7.85742L19.1407 10.0605C20.9907 11.1285 21.8654 13.4329 20.9844 15.3789C20.5224 16.3996 19.704 17.1465 18.7169 17.5273C18.7248 17.4017 18.7501 17.2794 18.7501 17.1523V12.5215C18.7501 12.1675 18.5638 11.8402 18.2598 11.6602L13.5352 8.86328L15.3262 7.85742ZM12.0255 9.71094L13.9942 10.8789L13.9669 13.168L11.9747 14.2871L10.0059 13.1211L10.0313 10.832L12.0255 9.71094ZM15.4825 11.7617L17.2501 12.8105V17.2148C17.2501 19.3508 15.6925 21.2578 13.5665 21.4688C12.45 21.5793 11.3922 21.2444 10.5684 20.5781C10.6815 20.5221 10.8 20.4836 10.9102 20.4199L14.9239 18.1035C15.2299 17.9275 15.4199 17.601 15.4239 17.248L15.4825 11.7617ZM13.9473 14.8965L13.9239 16.9512L10.1094 19.1523C8.25944 20.2203 5.8271 19.8258 4.5821 18.0898C3.92921 17.1804 3.68983 16.098 3.85358 15.0527C3.9588 15.1228 4.05174 15.2057 4.16218 15.2695L8.1739 17.5859C8.4799 17.7619 8.85613 17.7648 9.16413 17.5918L13.9473 14.8965Z"
        fill="currentColor"
      />
    </svg>
  );
}
