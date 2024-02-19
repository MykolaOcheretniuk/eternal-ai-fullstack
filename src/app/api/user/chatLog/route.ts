import { chatService } from "@/services/chatService";
import { authConfig } from "@/utils/auth";
import { getServerSession } from "next-auth";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authConfig);
    if (!session) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }
    const { id } = session.user;
    const query = request.nextUrl.searchParams;
    const page = query.get("page");
    const limit = query.get("limit");
    const individual = query.get("individual") as string;
    if (!page || !limit) {
      return Response.json(
        { message: "Incorrect query parameters" },
        { status: 400 }
      );
    }
    const messages = await chatService.getChatLog(
      id,
      individual,
      parseInt(page),
      parseInt(limit)
    );
    return Response.json(messages, { status: 200 });
  } catch (err) {
    console.log(err);
    return Response.json({ message: JSON.stringify(err) });
  }
}
