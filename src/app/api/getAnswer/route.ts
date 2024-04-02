import { BASE_URL } from "@/constants/api";
import getEnv from "@/utils/getEnv";
import jwt from "jsonwebtoken";

interface RequestBody {
  message: string;
  famousPersonName: string;
}
export async function POST(request: Request) {
  try {
    const res = await fetch("http://ip-api.com/json");
    const ipData = await res.json();
    const { message, famousPersonName } = (await request.json()) as RequestBody;
    const ipToken = jwt.sign(
      { ipV4: ipData.query, userAgent: request.headers.get("user-agent") },
      process.env.UNAUTHORIZED_USER_SECRET as string,
      { expiresIn: "1h" }
    );
    const answerResponse = await fetch(`${BASE_URL}/message`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: message,
        famousPersonName: famousPersonName,
        ipV4UserAgentToken: ipToken,
      }),
    });
    const answer = await answerResponse.json();
    if (!answerResponse.ok) {
      return new Response(JSON.stringify(answer), { status: 400 });
    }
    return new Response(JSON.stringify(answer), { status: 200 });
  } catch (err) {
    console.log(err);
    return Response.json({ message: JSON.stringify(err) });
  }
}
