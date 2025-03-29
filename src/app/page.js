import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50"
    style={{
      backgroundImage: `url("/bg.jpg")`, // Using template literals to inject the image
      backgroundSize: 'cover',
      backgroundPosition: 'center',
    }}>
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

      <main className="flex-1 flex flex-col items-center justify-center text-center px-6 ">
        <div className="max-w-4xl backdrop-blur-sm bg-black/30 p-8 rounded-xl items-center justify-center text-center">
        <h1 className="text-5xl font-bold text-white mb-6">
          Welcome to Touralyze
        </h1>
        <p className="text-xl text-gray-200 mb-8">
          Unlock valuable insights from your hotel reviews with our advanced sentiment analysis platform.
          Make data-driven decisions to enhance your hospitality services.
        </p>

        {/* Buttons */}
        <div className="flex gap-4 mt-6 items-center justify-center">
          <Link href="/register">
            <button className="bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition">
            Get Started
            </button>
          </Link>
        </div>
        </div>
        
      </main>

      {/* Footer */}
      <footer className="w-full py-4 text-center text-white bg-gray-800 shadow-md">
        © 2025 Touralyze. All Rights Reserved.
      </footer>
    </div>
  );
}
