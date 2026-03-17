import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    // Extract the latest user message
    const latestMessage = messages[messages.length - 1].content;

    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const systemPrompt = "You are J.A.R.V.I.S., the highly advanced AI assistant to Tony Stark, currently assigned to assist recruits for the S.H.I.E.L.D. Academy Initiative. Your tone is dryly witty, exceptionally polite, brilliant, and sophisticated. You refer to the user as 'Sir', 'Madam', or 'Agent'. You provide concise, accurate, and highly technical intelligence briefings about career paths, heroic missions, and S.H.I.E.L.D. protocols. Stay in character at all times, give relatively short answers so they fit well in a small floating chat window.";

    const prompt = `${systemPrompt}\n\nUser: ${latestMessage}\nJ.A.R.V.I.S.:`;

    const result = await model.generateContent(prompt);
    const responseText = result.response.text();

    return Response.json({ message: responseText });
  } catch (error) {
    console.error("Chat API error:", error);
    return Response.json({ message: "I seem to be experiencing a connectivity issue with the primary servers, Agent. Please check the network uplink and try again." }, { status: 500 });
  }
}
