"use client"; // Ensure it works in Next.js App Router

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function Sidebar({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  // Check if user is logged in
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("https://authapp-dpnq.onrender.com/api/check-user", {
          credentials: "include", // Ensures cookies are sent
        });
  
        if (response.ok) {
          setIsAuthenticated(true);
        } else {
          router.push("/login"); // Redirect to login if unauthorized
        }
      } catch (error) {
        console.error("Auth check failed", error);
        router.push("/login");
      }
    };
  
    checkAuth();
  }, []);
  

  // Logout function
  const handleLogout = async () => {
    try {
      const response = await fetch("https://authapp-dpnq.onrender.com/api/logout", {
        method: "POST",
        credentials: "include",
      });

      if (response.ok) {
        setIsAuthenticated(false);
        router.push("/login");
      }
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  return isAuthenticated ? (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className={`bg-gray-800 text-white w-64 p-6 space-y-4 ${isOpen ? "block" : "hidden"} sm:block flex flex-col justify-between`}>
        <div>
          <h2 className="text-2xl font-bold">Touralyze</h2>
          <nav className="space-y-2 mt-4">
            <Link href="/dashboard" className="block py-2 px-3 rounded hover:bg-gray-700">Home</Link>
            <Link href="/dashboard/profile" className="block py-2 px-3 rounded hover:bg-gray-700">Profile</Link>
            <Link href="/dashboard/review" className="block py-2 px-3 rounded hover:bg-gray-700">Add Review</Link>
            <Link href="/dashboard/about" className="block py-2 px-3 rounded hover:bg-gray-700">About</Link>
            <Link href="/dashboard/help" className="block py-2 px-3 rounded hover:bg-gray-700">Help</Link>
          </nav>
        </div>

        {/* Logout Button at the Bottom */}
        <button 
          onClick={handleLogout}
          className="w-full mt-6 bg-white-500 text-red py-2 rounded-md hover:bg-red-600 transition"
        >
          Logout
        </button>
      </aside>

      <div className="flex-1 p-6">
        {children}
      </div>
    </div>
  ) : null; // Prevents rendering the Dashboard if user is not authenticated
}
