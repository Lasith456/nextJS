"use client"; // This makes it a Client Component

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation"; // Use next/navigation in App Router
import Link from "next/link";

export default function Register() {
  const [fullName, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:3001/api/signup", { fullName, email, password });
      alert(response.data.message); // Show success message
      localStorage.setItem("token", response.data.token); // Store token
      router.push("/dashboard"); // Redirect after registration
    } catch (err) {
      setError(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
    {/* Navbar */}
    <nav className="w-full py-4 bg-gray-800 text-white shadow-md">
      <div className="max-w-6xl mx-auto flex justify-between items-center px-6">
        <div className="text-2xl font-bold text-white">Touralyze</div>
        <div className="flex gap-6">
          <Link href="/" className="text-white hover:text-blue-500">Home</Link>
          <Link href="/login" className="text-white hover:text-blue-500">Login</Link>
          <Link href="/register" className="text-white hover:text-blue-500">Register</Link>
        </div>
      </div>
    </nav>

    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-md w-full bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-center text-gray-700">Register</h2>

        {error && <p className="text-red-500 text-center mt-2">{error}</p>}

        <form className="mt-4" onSubmit={handleRegister}>
          <div>
            <label className="block text-gray-600 text-sm">Username</label>
            <input type="text" className="w-full px-4 py-2 mt-1 border rounded-md" placeholder="Enter your username"
              value={fullName} onChange={(e) => setUsername(e.target.value)} required />
          </div>

          <div className="mt-3">
            <label className="block text-gray-600 text-sm">Email</label>
            <input type="email" className="w-full px-4 py-2 mt-1 border rounded-md" placeholder="Enter your email"
              value={email} onChange={(e) => setEmail(e.target.value)} required />
          </div>

          <div className="mt-3">
            <label className="block text-gray-600 text-sm">Password</label>
            <input type="password" className="w-full px-4 py-2 mt-1 border rounded-md" placeholder="Enter your password"
              value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>

          <button className="w-full mt-5 bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition">
            Register
          </button>
        </form>

        <p className="text-center text-sm text-gray-600 mt-4">
          Already have an account? <Link href="/login" className="text-blue-500">Login here</Link>
        </p>
      </div>
    </div>

    </div>
  );
}
