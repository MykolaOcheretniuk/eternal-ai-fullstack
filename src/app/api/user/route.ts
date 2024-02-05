import { AuthRequest, UpdateUser } from "@/models/user";
import { authService } from "@/services/authService";
import { usersService } from "@/services/usersService";
import { authConfig } from "@/utils/auth";
import { getServerSession } from "next-auth";

export async function POST(request: Request) {
  try {
    const data = (await request.json()) as AuthRequest;
    await authService.signUp(data);
    return new Response(null, { status: 200 });
  } catch (err) {
    console.log(err);
    return Response.json({ message: JSON.stringify(err) });
  }
}

export async function PATCH(request: Request) {
  try {
    const session = await getServerSession(authConfig);
    if (!session) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }
    const data = (await request.json()) as UpdateUser;
    const { email: userEmail } = session.user;
    const updateUser = await usersService.updateUser(data, userEmail);
    session.user = updateUser;
    return Response.json({ status: 200 });
  } catch (err) {
    console.log(err);
    return Response.json({ message: JSON.stringify(err) });
  }
}
