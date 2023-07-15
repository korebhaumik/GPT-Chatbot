import Stripe from "stripe";

// export const runtime = "edge";
import { stripe } from "@/lib/stripe";
import { cookies } from "next/headers";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";


export async function POST(req: Request) {
  const HOST = process.env.HOST;
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const {
      data: { session: supaSession },
    } = await supabase.auth.getSession();
    if (!supaSession) return new Response("Unauthorized", { status: 401 });

    const session = await stripe.checkout.sessions.create({
      success_url: `${HOST}`,
      cancel_url: `${HOST}`,
      payment_method_types: ["card"],
      mode: "subscription",
      allow_promotion_codes: true,
      customer_email: supaSession.user.email,
      line_items: [
        {
          price: "price_1NT2dySG1PHJFFKi5pQwleqt",
          quantity: 1,
          tax_rates: ["txr_1NT2fNSG1PHJFFKibILJNAJM"],
        },
      ],
    });
    return new Response(JSON.stringify({ url: session.url }));
  } catch (e) {
    console.log(e);
    return new Response(null, { status: 500 });
  }
}
