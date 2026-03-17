import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: Request) {
  try {
    const { messages, careerContext } = await req.json();

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    let systemPrompt = `You are J.A.R.V.I.S., the AI assistant for the S.H.I.E.L.D. Academy Initiative. 
Your tone is witty, incredibly polite, and simple. Address the user as [Agent , Sir , Master].

CRITICAL INSTRUCTIONS:
1. Provide VERY simple, easy-to-understand career advice.
2. ALWAYS end your response by asking a relevant follow-up question to guide them towards a specific Marvel/S.H.I.E.L.D career.
3. Base your advice on their previous answers in the chat history.
4. Keep responses short (2-3 sentences) to fit perfectly in a small chat floating window.
5. Use Markdown formatting (bolding, italics, bullet points) to structure your response cleanly.`;

    if (careerContext) {
      systemPrompt += `\n\nSPECIAL DIRECTIVE (CAREER MENTOR MODE):
You are currently embedded in the S.H.I.E.L.D terminal for the following career: ${careerContext}. 
Answer the user's questions specifically acting as the Senior AI Instructor for this division. 
Focus your advice, follow-ups, and lore specifically around ${careerContext}, its skills, and day-to-day operations. Do not recommend other careers right now.`;
    }

    const chatHistory = messages.map((m: { role: string; content: string }) => `${m.role === 'user' ? 'Agent' : 'J.A.R.V.I.S.'}: ${m.content}`).join('\n');

    const prompt = `${systemPrompt}\n\nChat History:\n${chatHistory}\nJ.A.R.V.I.S.:`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    return Response.json({ message: responseText });
  } catch (error) {
    console.error("Chat API error:", error);
    return Response.json({ message: "I seem to be experiencing a connectivity issue with the primary servers, Agent. Please check the network uplink and try again." }, { status: 500 });
  }
}
