import { NextRequest, NextResponse } from "next/server";
import { OpenAI } from "openai";

const client = new OpenAI({
  apiKey: process.env.AZURE_OPENAI_API_KEY,
  baseURL: process.env.AZURE_OPENAI_ENDPOINT_1,
  defaultQuery: { "api-version": "2023-05-15" },
});

export async function POST(req: NextRequest) {
  try {
    console.log("API Route: Received request");

    const { userMessage } = await req.json();

    console.log("API Route: User message:", userMessage);

    if (!userMessage) {
      return NextResponse.json(
        { status: "Error", error: "Missing userMessage in request body" },
        { status: 400 }
      );
    }

    const chatCompletion = await client.chat.completions.create({
      messages: [
        { role: "user", content: userMessage },
        {
          role: "system",
          content:
            "You are a helpful assistant to answer questions about coffee.",
        },
      ],
      model: process.env.AZURE_OPENAI_API_DEPLOYMENT || "gpt-4o",
    });

    return NextResponse.json({
      status: "Success",
      answer: chatCompletion.choices[0].message.content,
    });
  } catch (e: unknown) {
    if (e instanceof Error) {
      return NextResponse.json(
        { status: "Error", error: e.message || "Request failed" },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { status: "Error", error: "Unknown error occurred" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const chatCompletion = await client.chat.completions.create({
      messages: [
        { role: "user", content: "What is an americano?" },
        {
          role: "system",
          content:
            "You are a helpful assistant to answer questions about coffee.",
        },
      ],
      model: process.env.AZURE_OPENAI_API_DEPLOYMENT || "gpt-4o",
    });

    await new Promise((r) => setTimeout(r, 5000));

    return NextResponse.json({
      status: "Success",
      answer: chatCompletion.choices[0].message.content,
    });
  } catch (e: unknown) {
    if (e instanceof Error) {
      return NextResponse.json(
        { status: "Error", error: e.message || "Request failed" },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { status: "Error", error: "Unknown error occurred" },
      { status: 500 }
    );
  }
}
