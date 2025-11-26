"use client";
import React from "react";
import Image from "next/image";

const services = [
  {
    title: "Engine Repair",
    description:
      "Professional diagnostics and engine repair to keep your car running smoothly.",
    image: "/assets/images/services/1.jpg",
  },
  {
    title: "Oil Change",
    description:
      "Fast and affordable oil changes to improve performance and longevity.",
    image: "/assets/images/services/2.jpg",
  },
  {
    title: "Brake Service",
    description:
      "Keep your car safe with thorough brake inspections and repairs.",
    image: "/assets/images/services/3.jpg",
  },
];

const products = [
  {
    title: "Car Battery",
    image: "/assets/images/products/1.png",
  },
  {
    title: "Engine Oil",
    image: "/assets/images/products/2.png",
  },
  {
    title: "Brake Pads",
    image: "/assets/images/products/3.png",
  },
];

export default function About() {
  return (
    <div className="flex flex-col items-center justify-start w-full my-10 max-w-7xl mx-auto px-4">
      {/* Hero Section */}
      <section className="relative w-full h-[400px] flex items-center justify-center rounded-3xl overflow-hidden">
        <Image
          src="/assets/images/about_us/parts.jpg"
          alt="Car Service Hero"
          fill
          className="object-cover"
        />
        <div className="absolute bg-black/50 w-full h-full"></div>
        <h1 className="absolute text-white text-5xl font-bold text-center px-4">
          About Car-Doctor
        </h1>
      </section>

      {/* Company Info / Mission */}
      <section className="max-w-5xl w-full px-6 py-16">
        <h2 className="text-3xl font-bold mb-6 text-center">Our Mission</h2>
        <p className="text-gray-700 text-lg leading-relaxed text-center">
          At Car-Doctor, our mission is to provide fast, reliable, and
          professional car repair and maintenance services. We ensure that every
          vehicle leaves our garage in perfect condition, prioritizing safety,
          quality, and customer satisfaction.
        </p>
      </section>

      {/* Vision Section */}
      <section className="bg-gray-50 w-full py-16">
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-6">Our Vision</h2>
          <p className="text-gray-700 text-lg leading-relaxed">
            Our vision is to become the most trusted car service provider in the
            region, known for our expertise, integrity, and commitment to
            keeping every vehicle on the road safe and efficient.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="max-w-6xl w-full px-6 py-16">
        <h2 className="text-3xl font-bold mb-10 text-center">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          {services.map((service, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-6 border rounded-lg shadow hover:shadow-lg transition"
            >
              <Image
                src={service.image}
                alt={service.title}
                width={150}
                height={150}
                className="object-cover rounded-lg"
              />
              <h3 className="mt-4 font-bold text-xl">{service.title}</h3>
              <p className="text-gray-600 mt-2">{service.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Products Section */}
      <section className="bg-gray-50 max-w-6xl w-full px-6 py-16">
        <h2 className="text-3xl font-bold mb-10 text-center">Our Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          {products.map((product, index) => (
            <div
              key={index}
              className="flex flex-col items-center p-6 border rounded-lg shadow hover:shadow-lg transition"
            >
              <Image
                src={product.image}
                alt={product.title}
                width={150}
                height={150}
                className="object-contain"
              />
              <h3 className="mt-4 font-bold text-xl">{product.title}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* Team Section */}
      <section className="max-w-6xl w-full px-6 py-16">
        <h2 className="text-3xl font-bold mb-10 text-center">Meet Our Team</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
          <div className="flex flex-col items-center">
            <Image
              src="/assets/images/team/1.jpg"
              alt="Team Member"
              width={200}
              height={200}
              className="rounded-full object-cover"
            />
            <h3 className="mt-4 font-bold text-xl">John Doe</h3>
            <p className="text-gray-600">Head Mechanic</p>
          </div>
          <div className="flex flex-col items-center">
            <Image
              src="/assets/images/team/2.jpg"
              alt="Team Member"
              width={200}
              height={200}
              className="rounded-full object-cover"
            />
            <h3 className="mt-4 font-bold text-xl">Jane Smith</h3>
            <p className="text-gray-600">Service Manager</p>
          </div>
          <div className="flex flex-col items-center">
            <Image
              src="/assets/images/team/3.jpg"
              alt="Team Member"
              width={200}
              height={200}
              className="rounded-full object-cover"
            />
            <h3 className="mt-4 font-bold text-xl">Alice Johnson</h3>
            <p className="text-gray-600">Customer Support</p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="w-full bg-gray-900 rounded-2xl py-16 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">Book Your Car Service Today</h2>
        <p className="mb-6 text-lg">
          Ensure your car runs safely and efficiently. Contact Car-Doctor now to
          schedule your service.
        </p>
        <a
          href="/contact"
          className="bg-white text-blue-600 font-bold px-6 py-3 rounded hover:bg-gray-100 transition"
        >
          Book Service
        </a>
      </section>
    </div>
  );
}
