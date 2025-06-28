import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  try {
    return NextResponse.json(
      {
        token,
      },
      {
        status: 200,
      }
    );
  } catch {
    return NextResponse.json({ user: null }, { status: 401 });
  }
}
