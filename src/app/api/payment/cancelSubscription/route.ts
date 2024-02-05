import { stripeService } from "@/services/stripeService";
import { authConfig } from "@/utils/auth";
import { getServerSession } from "next-auth";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authConfig);
    if (!session) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }
    const { id: userId } = session.user;
    await stripeService.cancelSubscriptionAtPeriodEnd(userId);
    return new Response(null, { status: 200 });
  } catch (err) {
    console.log(err);
    return Response.json({ message: JSON.stringify(err) });
  }
}
