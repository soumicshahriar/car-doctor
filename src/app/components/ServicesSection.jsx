import dbConnect, { collectionNamesObj } from "@/lib/dbConnect";
import Image from "next/image";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";

export default async function ServicesSection() {
  // fetch data from the database
  const serviceCollection = dbConnect(collectionNamesObj.servicesCollection);
  const services = await serviceCollection.find({}).toArray();
  // console.log(services);

  return (
    <div className="text-center max-w-7xl mx-auto my-15">
      <h2 className="text-red-500 text-3xl font-bold mb-4">Our Services</h2>
      <p className="max-w-xl mx-auto text-gray-600">
        the majority have suffered alteration in some form, by injected humour,
        or randomised words which don't look even slightly believable.
      </p>

      {/* Services Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
        {services.map((service) => (
          <div
            key={service._id}
            className="border rounded-xl shadow p-4 flex flex-col"
          >
            <Image
              src={service.img}
              alt={service.title}
              width={314}
              height={208}
              className="rounded-xl  w-full h-64 object-cover"
            />

            <h3 className="text-xl font-semibold mt-3">{service.title}</h3>

            <div className="flex justify-between items-center mt-3">
              <p className="text-red-500 font-bold text-lg">${service.price}</p>

              {/* Arrow icon */}
              <Link href={`services/${service._id}`}>
                <FaArrowRight className="text-red-500 text-xl cursor-pointer" />
              </Link>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
