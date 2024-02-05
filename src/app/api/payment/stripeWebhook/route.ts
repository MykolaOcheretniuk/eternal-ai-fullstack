import { usersService } from "@/services/usersService";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    switch (body.type) {
      case "invoice.payment_succeeded": {
        const {
          customer_email: customerEmail,
          lines,
          customer,
        } = body.data.object;
        const { subscription: subId, period } = lines.data[0];
        const { end } = period;
        await usersService.addToSubscribers(
          customerEmail,
          subId,
          customer,
          end
        );
        return new Response(null, { status: 200 });
      }
      case "customer.subscription.deleted": {
        const { customer: stripeCustomerId } = body.data.object;
        await usersService.removeFromSubscribers(stripeCustomerId);
        return new Response(null, { status: 200 });
      }
      default: {
        return new Response(null, { status: 200 });
      }
    }
  } catch (err) {
    console.log(err);
    return Response.json({ message: JSON.stringify(err) });
  }
}
