import { GoogleGenerativeAI } from '@google/generative-ai';

interface ChatRequest {
  message: string;
}

interface ChatResponse {
  reply: string;
  error?: string;
}

export async function POST(req: Request): Promise<Response> {
  try {
    const { message }: ChatRequest = await req.json();

    if (!message) {
      return Response.json({ error: 'Message is required' }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return Response.json({ error: 'API key not configured' }, { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    const model = genAI.getGenerativeModel({
      model: 'gemini-2.5-flash',
    });

    const prompt = `
System: You are a helpful assistant.

User: ${message}
`;

    const result = await model.generateContent(prompt);
    const reply = result.response.text();

    return Response.json({ reply });
  } catch (error) {
    console.error('Error in chat API:', error);
    return Response.json(
      { error: 'Something went wrong', reply: '' },
      { status: 500 }
    );
  }
}
