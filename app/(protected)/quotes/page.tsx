"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { PlusIcon } from "@heroicons/react/24/solid";
import { apiService } from "@/services/api";
import { useAuthStore } from "@/stores/authStore";
import Cookies from "js-cookie";
import QuoteCard from "@/components/QuoteCard";

interface Quote {
  id: number;
  text: string;
  mediaUrl: string;
  username: string;
  createdAt: string;
  updatedAt: string;
}

export default function QuotesPage() {
  const router = useRouter();
  const { logout } = useAuthStore();
  const token = Cookies.get("token");
  const username = Cookies.get("username");

  const [quotes, setQuotes] = useState<Quote[]>([]);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const fetchQuotes = async () => {
    if (!hasMore || loading || !token) return;

    try {
      setLoading(true);
      const response = await apiService.getQuotes(token, 20, offset);

      if (response?.data.length === 0) {
        setHasMore(false);
        return;
      }

      setQuotes((prev) => [...prev, ...response?.data]);
      setOffset((prev) => prev + 20);
    } catch (error) {
      console.error("Failed to fetch quotes", error);
      // Logout and redirect on error
      logout();
      router.push("/login");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Redirect to login if no token
    if (!token) {
      router.push("/login");
      return;
    }
    fetchQuotes();
    // eslint-disable-next-line
  }, []);

  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >=
      document.documentElement.offsetHeight - 100
    ) {
      fetchQuotes();
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
    // eslint-disable-next-line
  }, [quotes]);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Welcome, {username}</h2>
        <div className="flex gap-4 items-center">
          <button
            onClick={() => router.push("/create-quote")}
            className="text-blue-500 hover:text-blue-700"
          >
            Create Quote
          </button>
          <button
            onClick={handleLogout}
            className="text-red-500 hover:text-red-700"
          >
            Logout
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {quotes?.map((quote, index) => (
          <QuoteCard quote={quote} key={`${quote.id}-${index}`} />
        ))}
      </div>

      {loading && (
        <div className="text-center mt-4">
          <p>Loading more quotes...</p>
        </div>
      )}

      {!hasMore && (
        <div className="text-center mt-4">
          <p>No more quotes to load</p>
        </div>
      )}

      <button
        onClick={() => router.push("/create-quote")}
        className="fixed bottom-6 right-6 bg-blue-500 text-white p-4 rounded-full shadow-lg hover:bg-blue-600"
      >
        <PlusIcon className="h-6 w-6" />
      </button>
    </div>
  );
}
