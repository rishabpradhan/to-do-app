import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <h1 className="text-4xl font-bold text-purple-700 mb-4">
        Welcome to my To-Do List App
      </h1>
      <p className="text-xl text-gray-700 mb-8 text-center font-sans ">
        Manage your daily tasks efficiently and stay organized.
      </p>
      <div className="flex gap-4">
        <Link
          to="/signin"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 transition"
        >
          Sign Up
        </Link>
        <Link
          to="/login"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-500 transition"
        >
          Login
        </Link>
      </div>
    </div>
  );
}
