import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect, { collectionNamesObj } from "@/lib/dbConnect";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

// get the bookings
export const GET = async (req) => {
  // get the current login user
  const session = await getServerSession(authOptions);
  console.log(session);
  if (session) {
    const email = session?.user?.email;
    const bookingCollection = dbConnect(collectionNamesObj.bookingsCollection);
    const result = await bookingCollection.find({ email }).toArray();
    return NextResponse.json(result);
  }
};

// post bookings to then database
export async function POST(req) {
  try {
    // get data from client
    const body = await req.json();
    const bookingCollection = dbConnect(collectionNamesObj.bookingsCollection);
    const result = await bookingCollection.insertOne(body);

    return Response.json(
      { success: true, message: "Checkout saved successfully!", result },
      { status: 201 }
    );
  } catch (error) {
    console.error("Checkout Insertion Error:", error);
    return Response.json(
      { success: false, message: "Failed to save checkout data" },
      { status: 500 }
    );
  }
}
