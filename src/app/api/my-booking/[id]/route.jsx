import dbConnect, { collectionNamesObj } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

// update booking api
export const GET = async (req, { params }) => {
  const p = await params;
  const bookingCollection = dbConnect(collectionNamesObj.bookingsCollection);
  const singleBooking = await bookingCollection.findOne({
    _id: new ObjectId(p.id),
  });
  return NextResponse.json(singleBooking);
};

// update single booking
export const PATCH = async (req, { params }) => {
  const p = await params;
  const bookingCollection = dbConnect(collectionNamesObj.bookingsCollection);
  const body = await req.json();
  const filter = {
    $set: {
      ...body,
    },
  };

  const option = {
    upsert: true,
  };

  //   update booking
  const updateRes = await bookingCollection.updateOne(
    { _id: new ObjectId(p.id) },
    filter,
    option
  );

  return NextResponse.json(updateRes);
};
