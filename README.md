<a href="https://chatbot-gpt4-lite.vercel.app/">
    <h1 align="center"> GPT-4 Lite AI Chatbot </h1>
</a>
<p align="center">
  An open-source AI chatbot app template built with React 18, Next.js, OpenAI, and Supabase .
</p>

<p align="center">
  <a href="#description"><strong>Description</strong></a> ·
  <a href="#features"><strong>Features</strong></a> ·
  <a href="#model-provider"><strong>Model Provider</strong></a> ·
  <a href="#running-locally"><strong>Running locally</strong></a> ·
</p>
<br/>

## Description

This project strives to develop an AI chatbot assistant designed to assist users with a wide range of tasks and provide answers to their queries. The chatbot leverages the capabilities of the [OpenAI](https://platform.openai.com/overview) API and service, enabling it to furnish users with valuable information and execute tasks on their behalf. The project is implemented in a [TypeScript](https://www.typescriptlang.org/) environment and hosted on [Vercel](https://vercel.com). To ensure reliability and performance, the chatbot deployed on an edge runtime.

**Link:** [https://chatbot-gpt4-lite.vercel.app/](https://chatbot-gpt4-lite.vercel.app/)


https://github.com/korebhaumik/GPT-Chatbot/assets/106856064/b903f30a-6e03-4000-b80f-ae258a522c02


## Features

- [Next.js](https://nextjs.org) App Router
- React Server Components (RSCs), Edge Functions, and [Vercel AI](https://vercel.com/ai) for serverless AI
- [Vercel AI SDK](https://sdk.vercel.ai/docs) for streaming chat UI
- Edge runtime-ready
- Styling
  - Styling with [Tailwind CSS](https://tailwindcss.com)
  - Icons from [Heroicons](https://heroicons.com) 
- [React Markdown](https://github.com/remarkjs/react-markdown) and [React Syntax highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter), for rendering markdown and code blocks.
- [Supabase Auth](https://supabase.com/docs/guides/auth) and [Github OAuth](https://docs.github.com/en/apps/oauth-apps/building-oauth-apps/authorizing-oauth-apps) for authentication and authorizing users.
- [Supabase DB](https://supabase.com/docs/guides/database) as the database solution.
- [StripeJS](https://stripe.com/docs/js) for payment processing.

## Model Provider

This project comes with OpenAI `gpt-4-0134` , `gpt-3.5-turbo` as the fallback option. With the help of the OpenAI sdk [OpenAI SDK](https://platform.openai.com/overview), we can initialize a stream for responses between the client and the api.

``` typescript
const messages = [{ "User" : "Who is the president of America?" }]

const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages,
    temperature: 0.5,
    stream: true,
});

const stream = OpenAIStream(response);
return new StreamingTextResponse(stream);
```
## Running locally

You will need to have the necessary environment variables setup in your `.env` file to run Next.js AI Chatbot. 
This include keys for your OpeinAI account, Supabase account, and Stripe account, Github Outh Client, Github Outh Secret. 
    
```bash
OPENAI_API_KEY =
SUPABASE_URL =
SUPABASE_ANON_KEY =
STRIPE_PUBLISHABLE_KEY =
STRIPE_WEBHOOK_KEY =
STRIPE_SECRET_KEY =
GITHUB_CLIENT_ID =
GITHUB_CLIENT_SECRET =
```

> Note: You should not commit your `.env` file or it will expose secrets that will allow others to control access to your various OpenAI and authentication provider accounts.

1. Install run: `pnpm i`
2. Make a new `.env` file.
3. Populate the `.env` file with the necessary environment variables.

```bash
pnpm run build
pnpm run start
```
4. In case you are listening to Stripe webhooks:
```bash
stripe login
stripe listen --forward-to localhost:3000/api/webhooks/stripe
```

Your app template should now be running on [localhost:3000](http://localhost:3000/).

## Running locally with docker

```bash
docker login
docker pull korebhaumik/gpt-4-lite:latest.
docker run -env-file .env -p 3000:3000 korebhaumik/gpt-4-lite
```

> Note: If the docker image is not available (or repo is privated), you can build it locally by running `docker build -t gpt-4-lite .` in the root directory of the project.
