import { NextResponse, NextRequest } from "next/server";

// TODO: Add real auth/authorization checks here (e.g., verify session/user role)
function requireAuth(): boolean {
  // throw new Error("Unauthorized"); // enable after wiring auth
  return true;
}

export async function GET(_request: NextRequest) {
  try {
    requireAuth();
    const key = process.env.STRIPE_SECRET_KEY || "";
    if (!key)
      return NextResponse.json({ error: "Missing key" }, { status: 500 });

    // Return the full key. In production, consider returning it once-only or masked unless explicitly requested.
    return NextResponse.json({ key });
  } catch (e) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
