import dbConnect, { collectionNamesObj } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export const DELETE = async (req, context) => {
  try {
    const { params } = context;
    const { id } = await params; // ✅ FIX: Unwrap params
    // console.log("Deleting:", id);

    if (!id) {
      return NextResponse.json(
        { success: false, message: "No ID provided" },
        { status: 400 }
      );
    }

    const bookingCollection = dbConnect(collectionNamesObj.bookingsCollection);

    const deleteRes = await bookingCollection.deleteOne({
      _id: new ObjectId(id),
    });

    return NextResponse.json({ success: true, deleteRes }, { status: 200 });
  } catch (error) {
    console.error("Delete API Error:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
};
