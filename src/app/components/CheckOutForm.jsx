"use client";

import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function CheckOutForm({ service }) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const { data: session } = useSession();

  // ✅ Set form fields AFTER session loads
  useEffect(() => {
    if (session?.user) {
      setValue("name", session.user.name);
      setValue("email", session.user.email);
    }
  }, [session, setValue]);

  const onSubmit = async (data) => {
    const checkOutData = {
      ...data,
      service_id: service?._id,
      service_name: service?.title,
      service_image: service?.img,
    };

    // Show loading toast
    const toastId = toast.loading("Processing your order...");

    try {
      const res = await fetch("/checkout/api", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(checkOutData),
      });
      const result = await res.json();
      console.log(result?.result?.insertedId);

      //   show toast
      if (result.success) {
        toast.success("Order confirmed successfully!", { id: toastId });
        console.log(result);
      } else {
        toast.error("Failed to confirm order!", { id: toastId });
      }
    } catch (err) {
      toast.error("Something went wrong!", { id: toastId });
    }

    // console.log(result);

    // console.log(checkOutData);
  };

  return (
    <div className="my-15  p-5 rounded-2xl shadow-2xl max-w-7xl mx-auto">
      <h2 className="text-xl font-semibold text-center">
        Checkout : <span className="text-pink-500">{service.title}</span>
      </h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Row 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Name */}
          <div>
            <label className="font-medium">Name</label>
            <input
              {...register("name")}
              type="text"
              readOnly
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          {/* Email */}
          <div>
            <label className="font-medium">Email</label>
            <input
              {...register("email")}
              type="email"
              readOnly
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
        </div>

        {/* Row 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
          <div>
            <label className="font-medium">Service Amount</label>
            <input
              {...register("service_price")}
              type="number"
              defaultValue={service.price}
              readOnly
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          <div>
            <label className="font-medium">Date</label>
            <input
              {...register("date", { required: true })}
              type="date"
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
        </div>

        {/* Row 3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-4">
          <div>
            <label className="font-medium">Phone</label>
            <input
              {...register("phone", { required: true })}
              type="text"
              placeholder="Enter phone number"
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>

          <div>
            <label className="font-medium">Present Address</label>
            <input
              {...register("address", { required: true })}
              type="text"
              placeholder="Enter address"
              className="w-full px-3 py-2 border rounded-md"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 mt-6 rounded-md"
        >
          Order Confirm
        </button>
      </form>
    </div>
  );
}
