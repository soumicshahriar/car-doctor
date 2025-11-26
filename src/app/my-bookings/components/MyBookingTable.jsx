"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function MyBookingTable({ bookingsData = [], handleDelete }) {
  return (
    <div className="max-w-6xl mx-auto my-10">
      {bookingsData?.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No bookings found.</p>
      ) : (
        <div className="space-y-5">
          {bookingsData.map((item) => (
            <div
              key={item._id}
              className="flex items-center justify-between p-4 border rounded-xl shadow-sm hover:shadow-md transition"
            >
              {/* LEFT SIDE */}
              <div className="flex items-center gap-4">
                {/* Image */}
                <Image
                  src={item.service_image}
                  width={24}
                  height={24}
                  alt="service"
                  className="w-20 h-20 rounded-xl object-cover"
                />

                {/* Info */}
                <div>
                  <h3 className="font-semibold text-lg">{item.service_name}</h3>
                  <p className="text-sm text-gray-600">User: {item.name}</p>
                  <p className="text-sm text-gray-600">
                    Phone: {item.phone || "—"}
                  </p>
                </div>
              </div>

              {/* PRICE */}
              <p className="font-semibold text-gray-800">
                ${item?.service_price}
              </p>

              {/* DATE */}
              <p className="text-gray-700">{item.date}</p>

              {/* STATUS */}
              <span className="bg-orange-500 text-white py-1 px-3 rounded-full text-sm">
                Pending
              </span>

              {/* ACTIONS */}
              <div className="flex gap-2">
                {/* Update Button */}
                <Link href={`/my-bookings/${item._id}`}>
                  <button
                    className="w-8 h-8 flex items-center justify-center bg-gray-200 hover:bg-blue-500 hover:text-white rounded-full transition"
                    title="Update"
                  >
                    ✏️
                  </button>
                </Link>

                {/* Delete Button */}
                <button
                  onClick={() => handleDelete(item._id)}
                  className="w-8 h-8 flex items-center justify-center bg-gray-200 hover:bg-red-500 hover:text-white rounded-full transition"
                  title="Delete"
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
