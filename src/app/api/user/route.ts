import { AuthRequest } from "@/models/user";
import { usersService } from "@/services/usersService";

export async function POST(request: Request) {
  try {
    const data = (await request.json()) as AuthRequest;
    await usersService.signUp(data);
    return new Response(null, { status: 200 });
  } catch (err) {
    return Response.json({ message: JSON.stringify(err) });
  }
}
