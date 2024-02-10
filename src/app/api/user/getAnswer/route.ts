import { ChoseIndividual } from "@/models/individuals";
import { chatService } from "@/services/chatService";
import { authConfig } from "@/utils/auth";
import { getServerSession } from "next-auth";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authConfig);
    if (!session) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }
    const { question } = await request.json();
    const { email } = session.user;
    const answer = await chatService.getAnswer(question, email);
    return new Response(JSON.stringify({ answer }), { status: 200 });
  } catch (err) {
    console.log(err);
    return Response.json({ message: JSON.stringify(err) });
  }
}
