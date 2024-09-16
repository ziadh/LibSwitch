import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.NEXT_OPENAI_API_KEY,
});

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
    });

    const response = completion.choices[0].message.content;

    try {
      JSON.parse(response!);
    } catch (error) {
      console.error("Invalid JSON response from OpenAI:", response);
      return NextResponse.json(
        { error: "Invalid response format" },
        { status: 500 }
      );
    }

    return NextResponse.json({ response });
  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
