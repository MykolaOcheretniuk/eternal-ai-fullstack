import { NextApiRequest } from "next";


export async function GET(request: NextApiRequest) {
  try {

    return new Response(null, { status: 200 });
  } catch (err) {
    console.log(err);
    return Response.json({ message: JSON.stringify(err) });
  }
}
