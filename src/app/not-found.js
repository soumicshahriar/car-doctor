import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 text-center">
      <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-700 mb-2">
        Oops! Page not found
      </h2>
      <p className="text-gray-600 mb-6">
        The resource you are looking for does not exist or has been moved.
      </p>
      <Link
        href="/"
        className="inline-block bg-blue-600 text-white font-medium px-6 py-3 rounded-lg shadow-md hover:bg-blue-700 transition"
      >
        Return Home
      </Link>
    </div>
  );
}
