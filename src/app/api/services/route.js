import dbConnect, { collectionNamesObj } from "@/lib/dbConnect";


export async function POST(req) {
  try {
    const data = await req.json();

    // Basic validation
    if (!data.title || !data.price || !data.img) {
      return new Response(JSON.stringify({ error: "Missing required fields" }), {
        status: 400,
      });
    }

    const servicesCollection = dbConnect(collectionNamesObj.servicesCollection);

    // Add a unique service_id (optional: you can generate differently)
    data.service_id = Date.now().toString();

    const result = await servicesCollection.insertOne(data);

    return new Response(JSON.stringify({ success: true, id: result.insertedId }), {
      status: 201,
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Server error" }), { status: 500 });
  }
}
