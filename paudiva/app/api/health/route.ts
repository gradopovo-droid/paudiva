import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    success: true,
    app: "PAUDIVA",
    status: "online",
    message: "PAUDIVA API is running"
  });
}