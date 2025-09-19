import React, { useState } from "react";
import axios from "axios";

function App() {
  const [url, setUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    try {
      setError("");
      const res = await axios.post("http://localhost:5000/api/shorten", { url });
      setShortUrl(res.data.shortUrl);
    } catch (err) {
      setError("Failed to shorten URL. Make sure backend is running.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <h1 className="text-2xl font-bold mb-4 text-center">URL Shortener</h1>
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Enter long URL"
          className="w-full px-3 py-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Shorten
        </button>
        {error && <p className="text-red-500 mt-3 text-center">{error}</p>}
        {shortUrl && (
          <p className="mt-4 text-center">
            Short URL:{" "}
            <a href={shortUrl} className="text-blue-600 underline" target="_blank" rel="noreferrer">
              {shortUrl}
            </a>
          </p>
        )}
      </div>
    </div>
  );
}

export default App;
