import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import { OpenAI } from "openai";
import dotenv from 'dotenv';

dotenv.config();

console.log("OPENAI_API_KEY:", process.env.OPENAI_API_KEY); // API anahtarını konsola yazdır

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

export async function POST(req: Request) {
    try {
        const { userId } = auth();
        const body = await req.json();
        const { messages } = body;

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 });
        }
        if (!process.env.OPENAI_API_KEY) {
            return new NextResponse("OpenAI API Key not configured", { status: 500 });
        }
        if (!messages) {
            return new NextResponse("Messages are required", { status: 400 });
        }

        const response = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: messages
        });

        return NextResponse.json({ choices: response.choices });

    } catch (error) {
        console.log(["CONVERSATION ERROR"], error);
        return new NextResponse("Internal Error", { status: 500 });
    }
}
