"use client";
import { useAuth } from "@/context/supabase-auth-provider";
import { useRef, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

type Props = {};

export default function Navbar({}: Props) {
  const { signInWithGithub, user } = useAuth();

  const handleSignInGithub = async () => {
    toast.loading("Just a moment while we log you in...", {
    });
    await signInWithGithub();
  };
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between w-full h-16 px-6 border-b border-zinc-800 shrink-0 bg-gradient-to-b from-black/10 via-black/50 to-black/80 backdrop-blur-xl">
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            className="text-black rounded w-7 h-7 p-[5px] bg-slate-50"
          >
            <path
              d="M11.1348 1.01758C10.8718 1.00499 10.6068 1.00883 10.338 1.03321C8.1136 1.2339 6.33629 2.79408 5.60944 4.82031C3.89712 5.17684 2.43734 6.30485 1.67194 7.95703C0.734056 9.98406 1.19735 12.3008 2.58796 13.9434C2.04033 15.6052 2.28569 17.4345 3.3321 18.9219C4.61828 20.7478 6.85664 21.5047 8.97468 21.1211C10.1397 22.4276 11.8476 23.1305 13.6622 22.9668C15.8866 22.7661 17.6639 21.206 18.3907 19.1797C20.103 18.8231 21.5639 17.696 22.3301 16.043C23.2682 14.0163 22.8054 11.6971 21.4141 10.0547C21.9608 8.39344 21.714 6.56484 20.668 5.07813C19.3819 3.25224 17.1435 2.49531 15.0255 2.87891C14.033 1.766 12.6469 1.08998 11.1348 1.01758ZM11.0255 2.51367C11.922 2.54885 12.7551 2.87459 13.4317 3.42188C13.3186 3.47792 13.2002 3.51641 13.0899 3.58008L9.07624 5.89649C8.77024 6.07249 8.58024 6.39896 8.57624 6.75196L8.51765 12.2383L6.75007 11.1895V6.78516C6.75007 4.64916 8.30766 2.74225 10.4337 2.53125C10.633 2.5115 10.8305 2.50603 11.0255 2.51367ZM16.1251 4.25586C17.3987 4.26342 18.6399 4.82516 19.418 5.91016C20.0709 6.81959 20.3103 7.902 20.1466 8.94727C20.0415 8.87736 19.9482 8.79415 19.838 8.73047L15.8262 6.41406C15.5202 6.23806 15.144 6.23521 14.836 6.40821L10.0528 9.10352L10.0762 7.04883L13.8907 4.84766C14.5844 4.44716 15.3609 4.25133 16.1251 4.25586ZM5.28327 6.47266C5.27528 6.59853 5.25007 6.7204 5.25007 6.84766V11.4805C5.25007 11.8335 5.4363 12.1598 5.7403 12.3398L10.4649 15.1367L8.6739 16.1426L4.85944 13.9395C3.00944 12.8715 2.13665 10.5671 3.01765 8.6211C3.47963 7.60069 4.29644 6.85358 5.28327 6.47266ZM15.3262 7.85742L19.1407 10.0605C20.9907 11.1285 21.8654 13.4329 20.9844 15.3789C20.5224 16.3996 19.704 17.1465 18.7169 17.5273C18.7248 17.4017 18.7501 17.2794 18.7501 17.1523V12.5215C18.7501 12.1675 18.5638 11.8402 18.2598 11.6602L13.5352 8.86328L15.3262 7.85742ZM12.0255 9.71094L13.9942 10.8789L13.9669 13.168L11.9747 14.2871L10.0059 13.1211L10.0313 10.832L12.0255 9.71094ZM15.4825 11.7617L17.2501 12.8105V17.2148C17.2501 19.3508 15.6925 21.2578 13.5665 21.4688C12.45 21.5793 11.3922 21.2444 10.5684 20.5781C10.6815 20.5221 10.8 20.4836 10.9102 20.4199L14.9239 18.1035C15.2299 17.9275 15.4199 17.601 15.4239 17.248L15.4825 11.7617ZM13.9473 14.8965L13.9239 16.9512L10.1094 19.1523C8.25944 20.2203 5.8271 19.8258 4.5821 18.0898C3.92921 17.1804 3.68983 16.098 3.85358 15.0527C3.9588 15.1228 4.05174 15.2057 4.16218 15.2695L8.1739 17.5859C8.4799 17.7619 8.85613 17.7648 9.16413 17.5918L13.9473 14.8965Z"
              fill="currentColor"
            />
          </svg>
          <hr className="border-none mx-5 h-5 rounded w-0.5 rotate-[30deg] bg-zinc-700" />
          {user ? (
            <User />
          ) : (
            <GithubLogin handleSignInGithub={handleSignInGithub} />
          )}
        </div>
        <div>
          {user && <Plus />}
        </div>
      </div>
    </header>
  );
}

function GithubLogin({
  handleSignInGithub,
}: {
  handleSignInGithub: () => void;
}) {
  return (
    <button
      onClick={handleSignInGithub}
      className="flex items-center px-4 py-1 text-sm border rounded border-zinc-700"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 92 92"
        fill="none"
        className="mr-1 h-7 w-7"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M45.7576 21C31.5265 21 20 32.4705 20 46.6323C20 57.9747 27.3731 67.5547 37.6117 70.951C38.8996 71.1753 39.3826 70.4063 39.3826 69.7335C39.3826 69.1247 39.3504 67.1062 39.3504 64.9595C32.8788 66.145 31.2045 63.3895 30.6894 61.9477C30.3996 61.2107 29.1439 58.9359 28.0492 58.3271C27.1477 57.8465 25.8598 56.661 28.017 56.629C30.0455 56.5969 31.4943 58.4873 31.9773 59.2563C34.2955 63.1332 37.9981 62.0438 39.4792 61.3709C39.7045 59.7048 40.3807 58.5834 41.1212 57.9426C35.3902 57.3018 29.4015 55.091 29.4015 45.2866C29.4015 42.4991 30.3996 40.1922 32.0417 38.398C31.7841 37.7571 30.8826 35.1298 32.2992 31.6054C32.2992 31.6054 34.4564 30.9325 39.3826 34.2327C41.4432 33.656 43.6326 33.3676 45.822 33.3676C48.0114 33.3676 50.2008 33.656 52.2614 34.2327C57.1875 30.9005 59.3447 31.6054 59.3447 31.6054C60.7614 35.1298 59.8598 37.7571 59.6023 38.398C61.2443 40.1922 62.2424 42.4671 62.2424 45.2866C62.2424 55.1231 56.2216 57.3018 50.4905 57.9426C51.4242 58.7436 52.2292 60.2816 52.2292 62.6846C52.2292 66.1129 52.197 68.8684 52.197 69.7335C52.197 70.4063 52.6799 71.2074 53.9678 70.951C64.142 67.5547 71.5151 57.9426 71.5151 46.6323C71.5151 32.4705 59.9886 21 45.7576 21Z"
          fill="currentColor"
        />
      </svg>
      <p>Github</p>
    </button>
  );
}

function User() {
  const { signOut, user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  //@ts-expect-error
  const username: string = user?.username;

  const initials = username.toUpperCase().slice(0, 2);

  const elementRef = useRef<HTMLDivElement>(null);

  function handler(event: any) {
    if (!elementRef.current?.contains(event.target as Element)) {
      setIsOpen(false);
    }
  }
  useEffect(() => {
    window.addEventListener("click", handler);
    return () => {
      window.removeEventListener("click", handler);
    };
  }, []);

  return (
    <div
      ref={elementRef}
      className="relative w-8 h-8 text-sm text-center border rounded-full cursor-pointer border-zinc-800"
    >
      <span 
      onClick={() => setIsOpen(!isOpen)}
      className="block mt-2 text-xs text-zinc-300">{initials}</span>
      {isOpen && <Dropdown setIsOpen={setIsOpen} />}
    </div>
  );
}

function Dropdown({
  setIsOpen,
}: {
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { signOut, user } = useAuth();
  //@ts-expect-error
  const { username, email, isPlusUser, subEnd } = user;

  let formattedDate: string | null = null;
  if (subEnd) {
    const date = new Date(subEnd);
    formattedDate = `${date.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    })}`;
  }

  const handleLogOut = async () => {
    await signOut();
    setIsOpen(false);
  };

  return (
    <div className="absolute px-3 py-3 text-xs text-left bg-black border rounded top-9 border-zinc-800">
      <p>{email}</p>
      <hr className="mt-2 border-inherit" />
      <p className="mt-2">{username}</p>
      {isPlusUser && <p className="mt-2">Sub Exp: {formattedDate}</p>}
      <button onClick={handleLogOut} className="mt-2">
        Log Out
      </button>
    </div>
  );
}

function Plus() {
  const { signOut, user } = useAuth();

  //@ts-expect-error
  const isPlusUser: string = user?.isPlusUser;

  const handleSubscription = async () => {
    try {
      toast.loading("Redirecting you to the secure payment window.");
      const response = await fetch("/api/subscription", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const { url } = await response.json();
      if (url) {
        window.location.href = url;
      }
    } catch (error: any) {
      console.error(error);
    }
  };
  return (
    <>
      {!isPlusUser ? (
        <button
          onClick={handleSubscription}
          className="px-4 py-1 ml-2 text-sm font-medium text-black border rounded bg-slate-50"
        >
          Buy GPT-Plus
        </button>
      ) : (
        <button
          disabled
          className="flex items-center px-4 py-1 ml-2 text-sm font-medium text-black border rounded bg-slate-50"
        >
          <span>GPT-Plus</span>
          <TickSVG />
        </button>
      )}
    </>
  );
}

function TickSVG() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.75"
      stroke="currentColor"
      className="w-6 h-6 ml-2"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M9 12.75L11.25 15 15 9.75M21 12c0 1.268-.63 2.39-1.593 3.068a3.745 3.745 0 01-1.043 3.296 3.745 3.745 0 01-3.296 1.043A3.745 3.745 0 0112 21c-1.268 0-2.39-.63-3.068-1.593a3.746 3.746 0 01-3.296-1.043 3.745 3.745 0 01-1.043-3.296A3.745 3.745 0 013 12c0-1.268.63-2.39 1.593-3.068a3.745 3.745 0 011.043-3.296 3.746 3.746 0 013.296-1.043A3.746 3.746 0 0112 3c1.268 0 2.39.63 3.068 1.593a3.746 3.746 0 013.296 1.043 3.746 3.746 0 011.043 3.296A3.745 3.745 0 0121 12z"
      />
    </svg>
  );
}
