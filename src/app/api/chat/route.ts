import { Configuration, OpenAIApi } from "openai-edge";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { createClient } from "@/utils/supabase-client";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

// export const runtime = "edge";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function POST(req: Request) {
  const supabase = createRouteHandlerClient({ cookies });

  const {
    data: { session },
  } = await supabase.auth.getSession();
  if (!session)
    return new Response(
      "Oops! It seems like you're not logged in. Don't worry, we've got your back! Please try clicking the top left **github** button. If you need any **assistance** , contact **@korebhaumik** to help you.",
      { status: 200 }
    );

  const { data } = await supabase
    .from("customers")
    .select("promptCount")
    .eq("email", session.user.email);

  if (!data) return new Response(JSON.stringify(data), { status: 200 });

  const { promptCount } = data[0];
  console.log(promptCount);

  await supabase
    .from("customers")
    .update({ promptCount: promptCount - 1 })
    .eq("email", session.user.email);

  const request = await req.json();
  const { messages } = request;

  if (promptCount === 0)
    return new Response(
      "Oops! It looks like you've reached the limit for the number of prompts. We appreciate your enthusiasm, but there is a maximum number of prompts allowed. To extend your prompts limit, you can try purchasing **GPT-Plus.**",
      { status: 200 }
    );
  const response = await openai.createChatCompletion({
    model: "gpt-4-0314",
    messages,
    temperature: 0.5,
    stream: true,
  });

  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}
