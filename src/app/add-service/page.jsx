"use client";
import React, { useState } from "react";
import { toast } from "react-hot-toast";

export default function AddService() {
  const [title, setTitle] = useState("");
  const [img, setImg] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [facility, setFacility] = useState([{ name: "", details: "" }]);

  const handleFacilityChange = (index, field, value) => {
    const newFacilities = [...facility];
    newFacilities[index][field] = value;
    setFacility(newFacilities);
  };

  const addFacility = () => {
    setFacility([...facility, { name: "", details: "" }]);
  };

  const removeFacility = (index) => {
    const newFacilities = [...facility];
    newFacilities.splice(index, 1);
    setFacility(newFacilities);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serviceData = {
      title,
      img,
      price,
      description,
      facility,
    };

    try {
      const res = await fetch("/api/services", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(serviceData),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Service added successfully!");
        // Reset form
        setTitle("");
        setImg("");
        setPrice("");
        setDescription("");
        setFacility([{ name: "", details: "" }]);
      } else {
        toast.error(data.error || "Something went wrong!");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error!");
    }
  };

  return (
    <div className="max-w-7xl mx-auto my-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">Add New Service</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Service Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border px-4 py-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Image URL"
          value={img}
          onChange={(e) => setImg(e.target.value)}
          className="border px-4 py-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className="border px-4 py-2 rounded"
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="border px-4 py-2 rounded"
          rows={5}
        />

        {/* Facilities */}
        <div>
          <h3 className="font-bold mb-2">Facilities</h3>
          {facility.map((f, index) => (
            <div key={index} className="flex gap-2 mb-2 items-center">
              <input
                type="text"
                placeholder="Facility Name"
                value={f.name}
                onChange={(e) =>
                  handleFacilityChange(index, "name", e.target.value)
                }
                className="border px-2 py-1 rounded flex-1"
              />
              <input
                type="text"
                placeholder="Facility Details"
                value={f.details}
                onChange={(e) =>
                  handleFacilityChange(index, "details", e.target.value)
                }
                className="border px-2 py-1 rounded flex-2"
              />
              <button
                type="button"
                onClick={() => removeFacility(index)}
                className="bg-red-500 text-white px-2 py-1 rounded"
              >
                X
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addFacility}
            className="btn bg-pink-500 text-white px-4 py-2 rounded mt-2"
          >
            Add Facility
          </button>
        </div>

        <button
          type="submit"
          className="btn bg-pink-500 text-white px-6 py-2 rounded mt-4 hover:bg-pink-600 transition"
        >
          Add Service
        </button>
      </form>
    </div>
  );
}
