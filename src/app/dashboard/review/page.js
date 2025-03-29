"use client";

import { useState } from "react";
import axios from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import Sidebar from "../../components/Sidebar";

export default function UploadPage() {
    const [file, setFile] = useState(null);
    const [results, setResults] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);

    };

    const handleUpload = async () => {
        if (!file) {
            setError("Please upload a file.");
            return;
        }

        setLoading(true);
        setError("");

        const formData = new FormData();
        formData.append("file", file);

        try {
            const response = await axios.post("https://authapp-dpnq.onrender.com/api/upload", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
                withCredentials: true, // Ensure cookies are sent if needed
            });
            setResults(response.data);
        } catch (err) {
            setError("An error occurred while processing the file.");
        } finally {
            setLoading(false);
        }
    };

    const handleDownloadPDF = () => {
        const doc = new jsPDF();
        doc.setFontSize(16);
        doc.text("Review Insights", 14, 15);
    
        // Use autoTable function for PDF table
        autoTable(doc, {
            head: [["#", "Review", "Sentiment", "Category","Insights"]],
            body: results.map((result, index) => [
                index + 1,
                result.review,
                result.sentiment,
                result.category,
                result.insight || "N/A",
            ]),
            startY: 25,
        });
    
        doc.save("review_insights.pdf");
    };

    return (
      <Sidebar>
        <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-gray-100">
            {/* <div className="max-w-2xl w-full bg-white p-6 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold text-center mb-4">Review Insights App</h1>
                <input type="file" accept=".zip" onChange={handleFileChange} disabled={loading} className="mb-4" />
                <button 
                    onClick={handleUpload} 
                    disabled={loading} 
                    className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
                >
                    {loading ? "Uploading..." : "Upload"}
                </button>
                {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
            </div> */}
<div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-xl shadow-xl p-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Submit Reviews for Analysis</h2>
          
          <div className="space-y-6">
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-12 text-center">
              {/* <Upload className="mx-auto h-12 w-12 text-gray-400" /> */}
              <div className="mt-4">
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
                >
                                   {file ? "Now press the analyze button" : "Upload ZIP File"}

                  
                </label>
                <input id="file-upload" name="file-upload" type="file" accept=".zip" onChange={handleFileChange} disabled={loading} className="sr-only" />
              </div>
              <p className="mt-2 text-sm text-gray-500">
                Upload your ZIP file containing hotel reviews
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="text-lg font-medium text-gray-900 mb-2">File Requirements:</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-1">
                <li>File must be in ZIP format</li>
                <li>Each review should be in a separate row</li>
                <li>Maximum file size: 10MB</li>
                <li>Required column: review</li>
              </ul>
            </div>

            <button
             onClick={handleUpload} 
             disabled={loading} 
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
               {loading ? "Analyzing..." : "Analyze Reviews"}
              
            </button>
          </div>
        </div>
      </div>
            <div className="mt-6 w-full max-w-3xl bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-semibold mb-4">Results</h2>
                <table className="w-full border-collapse border border-gray-300">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border border-gray-300 px-3 py-2">#</th>
                            <th className="border border-gray-300 px-3 py-2">Review</th>
                            <th className="border border-gray-300 px-3 py-2">Sentiment</th>
                            <th className="border border-gray-300 px-3 py-2">Category</th>
                            <th className="border border-gray-300 px-3 py-2">Insights</th>
                        </tr>
                    </thead>
                    <tbody>
                        {results.map((result, index) => (
                            <tr key={index} className="border border-gray-300">
                                <td className="border border-gray-300 px-3 py-2 text-center">{index + 1}</td>
                                <td className="border border-gray-300 px-3 py-2">{result.review}</td>
                                <td className="border border-gray-300 px-3 py-2 text-center">{result.sentiment}</td>
                                <td className="border border-gray-300 px-3 py-2 text-center">{result.category}</td>
                                <td className="border border-gray-300 px-3 py-2">{result.insight || "N/A"}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {results.length > 0 && (
                    <button 
                        onClick={handleDownloadPDF} 
                        className="mt-4 bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition"
                    >
                        Download PDF
                    </button>
                )}
            </div>
        </div>
        </Sidebar>
    );
}
