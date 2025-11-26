import BookingUpdateForm from "@/app/components/BookingUpdateForm";
import React from "react";

export default async function UpdateBookingPage({ params }) {
  const p = await params;
  const res = await fetch(
    `https://car-doctor-opal.vercel.app/api/my-booking/${p.id}`
  );
  const data = await res.json();
  return (
    <div>
      <BookingUpdateForm service={data}></BookingUpdateForm>
    </div>
  );
}
