"use client";

import { useState } from "react";
import Link from "next/link";

export default function CoffeeChat() {
  const [userMessage, setUserMessage] = useState("");
  const [answer, setAnswer] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setAnswer(null);
    try {
      console.log("Sending request....")
      const res = await fetch("/api/azure-openai-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userMessage }),
      });
      const data = await res.json();
      if (data.status === "Success") {
        setAnswer(data.answer);
      } else {
        setError(data.error || "Unknown error");
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message || "Request failed");
      } else {
        setError("Request failed");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen p-8">
      <h1 className="text-2xl font-bold mb-4">Coffee Chat</h1>
      <p className="mb-4">
        Ask anything about coffee! Powered by Azure OpenAI.
      </p>
      <form onSubmit={handleSubmit} className="mb-4">
        <label className="block mb-2 font-semibold">
          Your question:
          <input
            type="text"
            value={userMessage}
            onChange={(e) => setUserMessage(e.target.value)}
            className="border rounded px-2 py-1 ml-2"
            required
          />
        </label>
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-1 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Asking..." : "Ask"}
        </button>
      </form>
      {answer && (
        <div className="mb-4 p-4 bg-green-100 rounded">
          <strong>Answer:</strong> {answer}
        </div>
      )}
      {error && (
        <div className="mb-4 p-4 bg-red-100 rounded text-red-700">
          <strong>Error:</strong> {error}
        </div>
      )}
      <Link href="/" className="text-blue-500 hover:text-blue-700 underline">
        Back to Home
      </Link>
    </main>
  );
}
