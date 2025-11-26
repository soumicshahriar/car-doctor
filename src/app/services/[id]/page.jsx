import dbConnect, { collectionNamesObj } from "@/lib/dbConnect";
import { ObjectId } from "mongodb";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function ServiceDetailsPage({ params }) {
  const p = await params;

  const singleServiceCollection = dbConnect(
    collectionNamesObj.servicesCollection
  );

  const data = await singleServiceCollection.findOne({
    _id: new ObjectId(p.id),
  });

  console.log(data._id);

  return (
    <div className="my-15 max-w-7xl mx-auto px-5">
      {/* Banner */}
      <section className="flex justify-center">
        <figure className="relative w-full">
          <Image
            src={data?.img}
            width={1137}
            height={300}
            alt={data.title}
            className="rounded h-96 w-full object-cover"
          />

          <div className="absolute top-0 h-full w-full bg-black/50 rounded">
            <div className="w-full h-full flex items-center text-white">
              <h2 className="ml-10 text-3xl font-bold">Service Details</h2>
            </div>
          </div>
        </figure>
      </section>

      {/* Main Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 my-20">
        {/* LEFT SIDE CONTENT */}
        <section className="space-y-5 md:col-span-2">
          <Image
            src={data.img}
            width={752}
            height={400}
            alt={data.title}
            className="rounded h-96 w-full object-cover"
          />

          <h2 className="text-xl md:text-2xl font-bold">{data.title}</h2>
          <p>{data.description}</p>

          {/* Facilities */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-10">
            {data.facility?.map((item, i) => (
              <div
                key={i}
                className="border p-5 rounded-lg shadow hover:shadow-md transition"
              >
                <h3 className="font-bold text-lg">{item.name}</h3>
                <p className="text-sm mt-2">{item.details}</p>
              </div>
            ))}
          </div>

          {/* 3 Steps Section */}
          <div className="mt-14">
            <h2 className="text-xl md:text-2xl font-bold mb-5">
              3 Simple Steps to Process
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="border rounded-lg p-6 text-center shadow"
                >
                  <div className="text-white bg-red-500 w-14 h-14 flex justify-center items-center mx-auto rounded-full text-xl font-bold">
                    {item}
                  </div>
                  <h3 className="font-bold mt-3">STEP {item}</h3>
                  <p className="text-sm mt-2">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Image */}
          <div className="mt-10">
            <Image
              src="https://i.ibb.co/T2cpBd5/888.jpg"
              width={752}
              height={400}
              alt="service"
              className="rounded h-96 w-full object-cover"
            />
          </div>
        </section>

        {/* RIGHT SIDEBAR */}
        <aside className="space-y-8">
          {/* Services List */}
          <div className="bg-white border rounded-lg shadow p-5">
            <h3 className="font-bold mb-3 text-lg">Services</h3>
            <div className="space-y-2">
              {[
                "Full Car Repair",
                "Engine Repair",
                "Automatic Services",
                "Engine Oil Change",
                "Battery Charge",
              ].map((s, i) => (
                <button
                  key={i}
                  className="block w-full text-left bg-gray-100 hover:bg-red-500 hover:text-white transition p-3 rounded"
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Download Box */}
          <div className="bg-black text-white rounded-lg p-5 space-y-4">
            <h3 className="font-bold">Download</h3>
            <button className="bg-white text-black w-full p-3 rounded">
              Our Brochure
            </button>
            <button className="bg-white text-black w-full p-3 rounded">
              Company Details
            </button>
          </div>

          {/* Need Help Box */}
          <div className="bg-red-500 text-white rounded-lg p-6 text-center space-y-2 shadow">
            <h3 className="text-xl font-bold">Car Doctor</h3>
            <p>Need Help? We Are Here To Help You</p>
            <button className="bg-black text-white w-full p-3 rounded">
              Car Doctor Special
            </button>
          </div>

          {/* Price Box */}
          <div className="border rounded-lg shadow p-5 space-y-4">
            <p className="text-xl font-bold">Price ${data.price}</p>

            {/* check out btn */}
            <Link href={`/checkout/${data._id}`}>
              <button className="bg-red-500 text-white w-full p-3 rounded">
                Proceed Checkout
              </button>
            </Link>
          </div>
        </aside>
      </div>
    </div>
  );
}
