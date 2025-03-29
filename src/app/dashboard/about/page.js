"use client";

import Sidebar from "../../components/Sidebar";

export default function AboutPage() {
  return (
    <Sidebar>
      <div className="bg-white shadow-md rounded-lg p-8">
        <h1 className="text-3xl font-bold text-center text-gray-800">About Us</h1>
        <p className="text-gray-600 mt-4 text-lg">
          Welcome to the future of hotel review analysis! At <strong>ReviewInsight</strong>, we harness the power of advanced natural language processing to transform your experience of managing and responding to customer feedback.
        </p>
        <p className="text-gray-600 mt-4 text-lg">
          Utilizing the breakthrough technology of the BART Large Language Model, our platform offers unparalleled insights into guest reviews. Whether you upload reviews in CSV format or as a zipped file, our system efficiently categorizes and analyzes sentiments, pinpointing specific aspects like food quality, amenities, and room comfort.
        </p>
        <p className="text-gray-600 mt-4 text-lg">
          Our mission is to empower hoteliers by providing a deep understanding of guest experiences, enabling targeted improvements and more personalized guest interactions. Discover the true sentiment behind every review and take actionable steps to elevate your service based on reliable, AI-driven data.
        </p>
        <div className="mt-6">
          <h2 className="text-2xl font-semibold text-gray-800">Why Choose Us?</h2>
          <ul className="list-disc pl-5 mt-2">
            <li className="text-gray-600 mt-2">State-of-the-art sentiment analysis</li>
            <li className="text-gray-600 mt-2">Detailed categorization of feedback into specific hotel aspects</li>
            <li className="text-gray-600 mt-2">User-friendly interface for uploading and analyzing data</li>
            <li className="text-gray-600 mt-2">Real-time insights to drive immediate improvements</li>
          </ul>
        </div>
      </div>
    </Sidebar>
  );
}