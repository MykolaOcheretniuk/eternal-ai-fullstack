import { ChoseIndividual } from "@/models/individuals";
import { usersService } from "@/services/usersService";
import { authConfig } from "@/utils/auth";
import { getServerSession } from "next-auth";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authConfig);
    if (!session) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }
    const { individualName } = (await request.json()) as ChoseIndividual;
    const { email } = session.user;
    await usersService.setIndividual(email, individualName);
    return new Response(null, { status: 200 });
  } catch (err) {
    console.log(err);
    return Response.json({ message: JSON.stringify(err) });
  }
}
