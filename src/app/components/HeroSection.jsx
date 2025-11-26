"use client";
import React, { useState } from "react";
import Image from "next/image";

const images = [
  "/assets/images/homeCarousel/1.jpg",
  "/assets/images/homeCarousel/2.jpg",
  "/assets/images/homeCarousel/3.jpg",
  "/assets/images/homeCarousel/4.jpg",
];

export default function HeroCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const prevSlide = () => {
    setCurrentIndex(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  };

  const nextSlide = () => {
    setCurrentIndex(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
  };

  return (
    <div className="my-15 max-w-7xl mx-auto">
      <div className="relative w-full h-[500px] overflow-hidden rounded">
        {images.map((src, index) => (
          <div
            key={index}
            className={`absolute top-0 left-0 w-full h-full transition-opacity duration-700 ${
              index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <Image src={src} alt={`Slide ${index + 1}`} fill />

            {/* Overlay */}
            <div className="absolute top-0 left-0 w-full h-full bg-black/60 flex items-center justify-center">
              <h2 className="text-white text-4xl font-bold text-center px-4">
                Welcome to Our Site
              </h2>
            </div>
          </div>
        ))}

        {/* Navigation buttons */}
        <button
          onClick={prevSlide}
          className="absolute top-1/2 left-5 transform -translate-y-1/2 text-white text-2xl bg-black/30 p-2 rounded-full z-20"
        >
          ❮
        </button>
        <button
          onClick={nextSlide}
          className="absolute top-1/2 right-5 transform -translate-y-1/2 text-white text-2xl bg-black/30 p-2 rounded-full z-20"
        >
          ❯
        </button>
      </div>
    </div>
  );
}
