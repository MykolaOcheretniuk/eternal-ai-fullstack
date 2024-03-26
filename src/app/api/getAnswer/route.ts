import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    console.log(request.headers.get("x-forwarded-for"));
    return new Response(null, { status: 200 });
  } catch (err) {
    console.log(err);
    return Response.json({ message: JSON.stringify(err) });
  }
}
