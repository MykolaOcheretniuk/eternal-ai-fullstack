export async function GET(request: Request) {
  try {
    const ip = request.headers.get("x-forwarded-for");
    return new Response(ip, { status: 200 });
  } catch (err) {
    console.log(err);
    return Response.json({ message: JSON.stringify(err) });
  }
}
