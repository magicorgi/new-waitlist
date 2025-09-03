"use client";
import { useState } from "react";

export default function Home() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setMessage(null);
    setLoading(true);
    try {
      const res = await fetch("/api/join", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data?.error || "提交失败");
      setMessage("已加入 Waitlist！");
      setEmail("");
    } catch (err: any) {
      setMessage(err.message || "提交失败");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-sans min-h-screen flex items-center justify-center p-8">
      <main className="w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-6">Join the Waitlist</h1>
        <form onSubmit={onSubmit} className="flex gap-3">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="flex-1 rounded-md border px-3 py-2"
          />
          <button
            type="submit"
            disabled={loading}
            className="rounded-md bg-black text-white px-4 py-2 disabled:opacity-60"
          >
            {loading ? "加入中..." : "Join"}
          </button>
        </form>
        {message && <p className="mt-3 text-sm text-gray-600">{message}</p>}
      </main>
    </div>
  );
}
