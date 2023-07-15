import { headers } from "next/headers";
import Stripe from "stripe";
import { cookies } from "next/headers";
import { stripe } from "@/lib/stripe";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";

export async function POST(req: Request) {
  const supabase = createRouteHandlerClient({cookies})
  const body = await req.text();
  const signature = headers().get("Stripe-Signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET as string
    );
  } catch (error: any) {
    return new Response(`Webhook Error: ${error.message}`, { status: 400 });
  }

  const session = event.data.object as Stripe.Checkout.Session;

  if (event.type === "checkout.session.completed") {
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    );

    const { data } = await supabase
      .from("customers")
      .select("isPlusUser")
      .eq("email", session.customer_email);
    if (!data) return new Response("Unauthorized User.", { status: 401 });
    const { isPlusUser } = data[0];
    // console.log(isPlusUser);
    if (isPlusUser)
      return new Response("Already a GPT-Plus user.", { status: 200 });

    await supabase
      .from("customers")
      .update({ isPlusUser: true, promptCount: 10, subEnd: new Date(subscription.current_period_end * 1000) })
      .eq("email", session.customer_email);
  }

  if (event.type === "invoice.payment_succeeded") {
    // Retrieve the subscription details from Stripe.
    const subscription = await stripe.subscriptions.retrieve(
      session.subscription as string
    );

    // Update the price id and set the new period end.
    const { data } = await supabase
      .from("customers")
      .select("promptCount,isPlusUser")
      .eq("email", session.customer_email);
    if (!data) return new Response("Unauthorized User.", { status: 401 });

    const { isPlusUser } = data[0];
    // console.log("in", isPlusUser);
    if (isPlusUser)
      return new Response("Already a GPT-Plus user.", { status: 200 });

    await supabase
      .from("customers")
      .update({ isPlusUser: true, promptCount: 10, subEnd: new Date(subscription.current_period_end * 1000)})
      .eq("email", session.customer_email);
  }

  return new Response(null, { status: 200 });
}
