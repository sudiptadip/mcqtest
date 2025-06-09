import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { token } = await req.json();

  const response = NextResponse.json({ success: true });

  response.cookies.set({
    name: 'token',
    value: token,
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    path: '/',
    maxAge: 60 * 60 * 24,
  });

  return response;
}
