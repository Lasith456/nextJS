"use client";
import React, { useState, useEffect } from 'react';
import { Pie, Bar } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import Sidebar from "../components/Sidebar";
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
export default function Dashboard() {
  const [sentimentCounts, setSentimentCounts] = useState({
    positive: 0,
    negative: 0,
    neutral: 0,
    total: 0
  });
  const [reviews, setReviews] = useState([]);
  const [selectedReview, setSelectedReview] = useState(null);

  useEffect(() => {
    const fetchSentimentCounts = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/reviews/counts');
        if (!response.ok) throw new Error('Network response was not ok.');
        const data = await response.json();
        setSentimentCounts({
          positive: data.positive,
          negative: data.negative,
          neutral: data.neutral,
          total: data.positive + data.negative + data.neutral
        });
      } catch (error) {
        console.error('Error fetching sentiment counts:', error);
      }
    };

    fetchSentimentCounts();
    fetch('http://localhost:3001/api/reviews')
      .then(response => response.json())
      .then(data => setReviews(data))
      .catch(error => console.error('Error fetching reviews:', error));
  }, []);

  const pieData = {
    labels: ['Positive', 'Neutral', 'Negative'],
    datasets: [
      {
        label: 'Sentiment Distribution',
        data: [sentimentCounts.positive, sentimentCounts.neutral, sentimentCounts.negative],
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 206, 86, 0.6)', 'rgba(255, 99, 132, 0.6)'],
        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 206, 86, 1)', 'rgba(255, 99, 132, 1)'],
        borderWidth: 1,
      },
    ],
  };

  const barData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Monthly Sentiment',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1
      }
    ]
  };

  const handleReviewSelect = (review) => {
    setSelectedReview(review);
  };

  const renderReviewDetails = () => {
    if (!selectedReview) return <p>Select a review to see the details.</p>;
    return (
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Text
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Sentiment
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Category
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Insight
            </th>
            {/* <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Created At
            </th> */}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {selectedReview.reviews.map((item, index) => (
            <tr key={index}>
              <td className="px-6 py-4 whitespace-nowrap">{item.text}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.sentiment}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.category}</td>
              <td className="px-6 py-4 whitespace-nowrap">{item.insight}</td>
              {/* <td className="px-6 py-4 whitespace-nowrap">{new Date(item.createdAt).toLocaleString()}</td> */}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  function downloadPDF(reviews, filename) {
    const doc = new jsPDF();
  
    const tableColumn = ["Text", "Sentiment", "Category", "Insight", "Created At"];
    const tableRows = [];
  
    reviews.forEach(review => {
      const reviewData = [
        review.text,
        review.sentiment,
        review.category,
        review.insight,
        new Date(review.createdAt).toLocaleString() // Format date as string
      ];
      tableRows.push(reviewData);
    });
  
    autoTable(doc, {
      head: [tableColumn],
      body: tableRows,
      styles: { fontSize: 8, cellPadding: 2, overflow: 'linebreak' },
      theme: "striped"
    });
  
    doc.save(filename || 'ReviewDetails.pdf');
  }
  const handleDownloadPDF = () => {
    if (selectedReview && selectedReview.reviews.length > 0) {
      downloadPDF(selectedReview.reviews, 'ReviewDetails.pdf');
    }
  };
  return (
    <Sidebar>
      <h1 className="text-3xl font-bold text-gray-900">Sentiment Analysis Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold mb-2">Positive Sentiment</h3>
          <div className="text-3xl font-bold text-green-600">{((sentimentCounts.positive / sentimentCounts.total) * 100).toFixed(1)}%</div>
          <p className="text-gray-600">{sentimentCounts.positive} Reviews</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold mb-2">Total Reviews</h3>
          <div className="text-3xl font-bold text-blue-600">{sentimentCounts.total}</div>
          <p className="text-gray-600">Analyzed</p>
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold mb-2">Neutral Sentiment</h3>
          <div className="text-3xl font-bold text-yellow-600">{((sentimentCounts.neutral / sentimentCounts.total) * 100).toFixed(1)}%</div>
          <p className="text-gray-600">{sentimentCounts.neutral} Reviews</p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-semibold">Sentiment Distribution</h3>
          <Pie data={pieData} />
        </div>
        <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-lg font-semibold mb-2">Review Histories</h3>
          <ul>
            {reviews.map(review => (
              <li key={review._id} className="mb-2">
                <button onClick={() => handleReviewSelect(review)} className="text-blue-500 hover:text-blue-700">
                  {review.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

       
      </div>
      <div className="bg-white p-6 rounded-xl shadow-lg overflow-hidden">
    <h3 className="text-lg font-semibold mb-4 border-b pb-2">Review Details</h3>
    <button 
      onClick={handleDownloadPDF}
      className="mb-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      Download PDF
    </button>
    <div className="flex flex-col">
      {selectedReview ? renderReviewDetails() : <p className="text-gray-600">Select a review to see the details.</p>}
    </div>
  </div>
    </Sidebar>
  );
}
