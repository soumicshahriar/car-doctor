"use client";
import React, { useEffect, useState } from "react";
import MyBookingTable from "./components/MyBookingTable";
import toast from "react-hot-toast";

export default function MyBookingsPage() {
  const [bookingsData, setBookingsData] = useState([]);

  useEffect(() => {
    const fetchBookings = async () => {
      const res = await fetch("http://localhost:3000/checkout/api");
      const result = await res.json();
      setBookingsData(result);
    };
    fetchBookings();
  }, []);

  // handle delete
  const handleDelete = async (id) => {
    // Show a loading toast and get its id
    const toastId = toast.loading("Deleting...");

    try {
      const res = await fetch(`http://localhost:3000/api/service/${id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.success) {
        // Remove item from UI
        setBookingsData((prev) => prev.filter((item) => item._id !== id));

        // Update the toast to success and dismiss the loading state
        toast.success("Delete successful", { id: toastId });
      } else {
        // Update the toast to error if server responded with failure
        toast.error(data.message || "Failed to delete", { id: toastId });
      }
    } catch (err) {
      console.error("Error deleting booking:", err);
      // Update the toast to error if fetch failed
      toast.error("Something went wrong", { id: toastId });
    }
  };

  return (
    <div>
      <div className="text-center my-5">
        <h2 className="text-xl font-bold">
          My Bookings{" "}
          <span className="text-pink-500">({bookingsData.length})</span>
        </h2>
      </div>
      <MyBookingTable bookingsData={bookingsData} handleDelete={handleDelete} />
    </div>
  );
}
