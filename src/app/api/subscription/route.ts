export async function POST(request: Request) {
  try {
    const data = await request.json();
    console.log(data);
    return new Response(null, { status: 200 });
  } catch (err) {
    console.log(err);
    return Response.json({ message: JSON.stringify(err) });
  }
}
