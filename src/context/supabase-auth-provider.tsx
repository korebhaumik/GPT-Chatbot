"use client";

import { PostgrestSingleResponse, Session, User } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { useSupabase } from "./supabase-provider";

const MODE = process.env.MODE;
const DEV_URL = process.env.DEV_URL;
const PROD_URL = process.env.PROD_URL;

const HOST = MODE === "DEV" ? DEV_URL : PROD_URL;

// console.log(MODE);

interface ContextI {
  user: User | null | PostgrestSingleResponse<any[]>;
  signOut: () => Promise<void>;
  signInWithGithub: () => Promise<void>;
  getPromptCount: () => Promise<number>;
  promptCount: number;
}
const Context = createContext<ContextI>({
  user: null,
  signOut: async () => {},
  signInWithGithub: async () => {},
  getPromptCount: async () => 0,
  promptCount: 0,
});

export default function SupabaseAuthProvider({
  serverSession,
  children,
}: {
  serverSession?: Session | null;
  children: React.ReactNode;
}) {
  const { supabase } = useSupabase();
  const router = useRouter();

  const [user, setUser] = useState<
    User | null | PostgrestSingleResponse<any[]>
  >(null);
  const [currentPromptCount, setCurrentPromptCount] = useState<number>(0);

  //Get User

  const getUser = async (email: string, username: string) => {
    const userInstance = await supabase
      .from("customers")
      .select("*")
      .eq("email", email);
    if (userInstance.data?.length) {
      // console.log("User", userInstance);
      setUser(userInstance.data[0]);
    } else {
      const newUserInstance = await supabase
        .from("customers")
        .insert({ email: email, username: username, isPlusUser: false })
        .select();
      // console.log("New User", newUserInstance);
      if (newUserInstance.data?.length) setUser(newUserInstance.data[0]);
    }
  };

  const getPromptCount = async () => {
    if (user) {
      const { data } = await supabase
        .from("customers")
        .select("promptCount")
        //@ts-expect-error
        .eq("email", user.email);

      if (!data) return 0;

      const { promptCount } = data[0];
      setCurrentPromptCount(promptCount);
      if (promptCount > 0) {
        await supabase
          .from("customers")
          .update({ promptCount: promptCount - 1 })
          //@ts-expect-error
          .eq("email", user.email);
      }
    }
    return 0;
  };

  // Sign Out
  const signOut = async () => {
    await supabase.auth.signOut();
    // setUser(null);
    router.refresh();
  };

  // Sign-In with Github
  const signInWithGithub = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${HOST}/auth/callback`,
      },
    });
  };

  // Refresh the Page to Sync Server and Client
  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        (async () => {
          await getUser(
            session.user.email as string,
            session.user.user_metadata.user_name as string
          );
        })();
      } else {
        setUser(null);
      }
      router.refresh();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router, supabase]);

  const exposed: ContextI = {
    promptCount: currentPromptCount,
    user,
    signOut,
    signInWithGithub,
    getPromptCount,
  };

  return <Context.Provider value={exposed}>{children}</Context.Provider>;
}

export const useAuth = () => {
  let context = useContext(Context);
  if (context === undefined) {
    throw new Error("useAuth must be used inside SupabaseAuthProvider");
  } else {
    return context;
  }
};
