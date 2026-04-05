import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(""); // ✅ error state

  const navigate = useNavigate();

  const API_URL = import.meta.env.VITE_BACKEND_URL;

  const handleSignup = async () => {
    try {
      setLoading(true);
      setError("");

      await axios.post(
        `${API_URL}/api/auth/signup`,
        { email, password },
        { withCredentials: true },
      );

      alert("Account created successfully");
      navigate("/");
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Branding */}
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-green-600 to-emerald-700 text-white items-center justify-center p-10">
        <div>
          <h1 className="text-4xl font-bold mb-4">Create Account 🚀</h1>
          <p className="text-lg opacity-80">
            Start uploading, processing, and streaming videos instantly.
          </p>
        </div>
      </div>

      {/* Right Form */}
      <div className="flex w-full md:w-1/2 items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-2xl shadow-xl w-[350px]">
          <h2 className="text-2xl font-semibold mb-2">Sign Up</h2>
          <p className="text-gray-500 mb-6 text-sm">
            Create your account in seconds
          </p>

          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 mb-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            onChange={(e) => setPassword(e.target.value)}
          />

          {error && (
            <div className="bg-red-100 text-red-700 p-2 mb-3 rounded">
              {error}
            </div>
          )}

          <button
            onClick={handleSignup}
            disabled={loading}
            className="w-full bg-green-600 text-white p-3 rounded-lg hover:bg-green-700 transition"
          >
            {loading ? "Creating..." : "Create Account"}
          </button>

          <p className="text-sm text-gray-500 mt-4 text-center">
            Already have an account?{" "}
            <span
              onClick={() => navigate("/")}
              className="text-green-600 cursor-pointer"
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
