import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    console.log(request)
    return new Response(JSON.stringify(request.ip), { status: 200 });
  } catch (err) {
    console.log(err);
    return Response.json({ message: JSON.stringify(err) });
  }
}
