import CheckOutForm from "@/app/components/CheckOutForm";
import dbConnect, { collectionNamesObj } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import React from "react";

const page = async ({ params }) => {
  const p = await params;

  const singleServiceCollection = dbConnect(
    collectionNamesObj.servicesCollection
  );

  const data = await singleServiceCollection.findOne({
    _id: new ObjectId(p.id),
  });

  console.log("line 17", data);

  // 🔥 FIX: Convert MongoDB _id to string
  const plainData = {
    ...data,
    _id: data._id.toString(),
  };

  return (
    <div>
      <CheckOutForm service={plainData} />
    </div>
  );
};

export default page;
