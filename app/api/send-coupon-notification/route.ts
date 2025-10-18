import { NextRequest, NextResponse } from "next/server";
import { messaging } from "@/lib/firebase/admin";

export async function POST(request: NextRequest) {
  try {
    const { couponCode, couponDescription } = await request.json();

    if (!couponCode) {
      return NextResponse.json(
        { error: "Coupon code is required" },
        { status: 400 }
      );
    }

    // "coupons" 토픽을 구독한 모든 사용자에게 푸시 전송
    const message = {
      notification: {
        title: "🎁 새로운 쿠폰 등록!",
        body: `${couponCode} - ${couponDescription || "새로운 쿠폰이 등록되었습니다!"}`,
      },
      data: {
        couponCode: couponCode,
        url: "/coupons", // 쿠폰 페이지 URL (실제 경로에 맞게 수정)
      },
      topic: "coupons",
    };

    const response = await messaging.send(message);

    return NextResponse.json({
      success: true,
      message: "Notification sent successfully",
      messageId: response,
    });
  } catch (error) {
    console.error("Error sending notification:", error);
    return NextResponse.json(
      { error: "Failed to send notification" },
      { status: 500 }
    );
  }
}
