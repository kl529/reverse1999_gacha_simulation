import { NextRequest, NextResponse } from "next/server";
import { messaging } from "@/lib/firebase/admin";

export async function POST(request: NextRequest) {
  try {
    const { token, topic } = await request.json();

    if (!token || !topic) {
      return NextResponse.json(
        { error: "Token and topic are required" },
        { status: 400 }
      );
    }

    // 토픽 구독
    await messaging.subscribeToTopic(token, topic);

    return NextResponse.json({
      success: true,
      message: `Successfully subscribed to topic: ${topic}`,
    });
  } catch (error) {
    console.error("Error subscribing to topic:", error);
    return NextResponse.json(
      { error: "Failed to subscribe to topic" },
      { status: 500 }
    );
  }
}
