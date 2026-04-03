import { NextResponse } from "next/server";
import Pusher from "pusher";

// Note: These would normally be in .env.local
const pusher = new Pusher({
  appId: process.env.PUSHER_APP_ID || "1",
  key: process.env.PUSHER_KEY || "key",
  secret: process.env.PUSHER_SECRET || "secret",
  cluster: process.env.PUSHER_CLUSTER || "mt1",
  useTLS: true,
});

export async function POST(req: Request) {
  try {
    const messageData = await req.json();

    // Broadcast the message to all clients in the 'chi' channel
    await pusher.trigger("shi", "new-message", {
      ...messageData,
      id: messageData.id || Date.now().toString(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Pusher Trigger Error:", error);
    return NextResponse.json({ success: false, error: "Broadcast failed" }, { status: 500 });
  }
}
