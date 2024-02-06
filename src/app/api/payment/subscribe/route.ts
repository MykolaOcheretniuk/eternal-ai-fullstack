import { PaymentCard } from "@/models/payment";
import { stripeService } from "@/services/stripeService";
import { authConfig } from "@/utils/auth";
import { getServerSession } from "next-auth";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authConfig);
    if (!session) {
      return Response.json({ message: "Unauthorized" }, { status: 401 });
    }
    const card = (await request.json()) as PaymentCard;
    const date = card.date.split("/");
    const exp_month = parseInt(date[0]);
    const exp_year = parseInt(`20${date[1]}`);
    const { email } = session.user;
    await stripeService.subscribeUser(email, {
      exp_month,
      exp_year,
      number: card.card,
      cvc: card.cvc,
    });
    return new Response(null, { status: 200 });
  } catch (err) {
    console.log(err);
    return Response.json({ message: JSON.stringify(err) });
  }
}
