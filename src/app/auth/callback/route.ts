import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export const runtime = "edge";
const HOST = process.env.HOST;
export async function GET(request: Request) {
  try {
    const requestUrl: URL = new URL(request.url);
    const code = requestUrl.searchParams.get("code");

    if (code) {
      const supabase = createRouteHandlerClient({ cookies });
      await supabase.auth.exchangeCodeForSession(code);
    }

    return NextResponse.redirect(HOST as string);
  } catch (e: any) {
    console.log(e);
    return NextResponse.redirect(HOST as string);
  }
}
