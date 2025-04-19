import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function SignInPage() {
  const initial = { email: "", password: "" };
  const [query, setQuery] = useState(initial);
  const [error, setError] = useState({});
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    e.preventDefault();
    setQuery({
      ...query,
      [name]: value,
    });
    setError({
      ...error,
      [name]: null,
    });
  };

  const togglePassword = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset any previous errors
    setError({});

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/api/login`,
        query,
        { withCredentials: true }
      );

      if (response.data.message === "Login successful") {
        // On successful login, redirect to Dashboard
        navigate("/dashboard");
      }
    } catch (err) {
      // Handle error (wrong credentials or other errors)
      if (err.response) {
        setError({ general: err.response.data.message });
      } else {
        setError({ general: "Something went wrong, please try again later" });
      }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen overflow-x-hidden">
      <h1 className="text-3xl font-bold font-sans">Login Page</h1>
      <form
        className="mt-8 bg-gray-100 p-8 rounded-xl shadow-xl w-full max-w-md"
        onSubmit={handleSubmit}
      >
        {error.general && (
          <div className="text-red-500 text-center p-2 rounded-lg mb-4">
            {error.general}
          </div>
        )}
        <div className="space-y-1">
          <div className="flex justify-center items-center mb-2">
            <span className="mr-2">Enter your email:</span>
            <input
              className="border border-solid border-black rounded-xl w-auto ml-7"
              type="email"
              name="email"
              value={query.email}
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-center items-center">
            <span className="mr-3">Enter your password:</span>
            <input
              className="border border-solid border-black rounded-xl w-auto"
              type={passwordVisible ? "text" : "password"}
              name="password"
              value={query.password}
              onChange={handleChange}
            />
          </div>
          <div className="flex justify-center items-center">
            <label htmlFor="passwordtoggle">
              <input type="checkbox" onClick={togglePassword} />
              <span className="font-medium font-inter">Show password</span>
            </label>
          </div>

          <div className="flex justify-center items-center">
            <button
              className="border p-2 border-solid border-black rounded-xl mt-2 bg-purple-800 text-white hover:bg-purple-500 font-sans"
              type="submit"
            >
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
