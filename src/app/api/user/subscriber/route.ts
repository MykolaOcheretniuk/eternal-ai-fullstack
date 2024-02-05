import { usersService } from "@/services/usersService";
import { authConfig } from "@/utils/auth";
import { getServerSession } from "next-auth";

export async function GET() {
  try {
    const session = await getServerSession(authConfig);
    if (!session) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }
    const { id } = session.user;
    const subscriber = await usersService.getSubscriber(id);
    return Response.json(subscriber, { status: 200 });
  } catch (err) {
    console.log(err);
    return Response.json({ message: JSON.stringify(err) });
  }
}
