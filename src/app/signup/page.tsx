"use client";

import { useEffect, useState, useCallback } from "react";
import { useUser, SignUp, ClerkLoaded } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

interface Genre {
  id: number;
  name: string;
}



export default function SignupPage() {
  const { isSignedIn, user } = useUser();
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Fetch genres when the user is signed in
  useEffect(() => {
    async function fetchGenres() {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/genera`);
        if (!res.ok) {
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        setGenres(data);
      } catch (error) {
        console.error("Error fetching genres:", error);
      }
    }
    fetchGenres();
  }, []);

  // Toggle selected genres
  const handleGenreChange = useCallback((genreId: number) => {
    setSelectedGenres((prev) =>
      prev.includes(genreId)
        ? prev.filter((id) => id !== genreId)
        : [...prev, genreId]
    );
  }, []);



  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedGenres.length < 2) {
      alert("Please select at least 2 genres.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/users/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          clerkId: user?.id,
          email: user?.primaryEmailAddress?.emailAddress,
          generaIds: selectedGenres,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.message || "Error during signup");
      }

     

      // Redirect to dashboard after fetching articles
      router.push("/dashboard");
    } catch (error) {
      const errMessage = (error as Error).message; // Type assertion
      console.error("Signup error:", errMessage);
    }
  };

  // If not signed in, show signup form
  if (!isSignedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <ClerkLoaded>
          <SignUp path="/signup" routing="path" signInUrl="/login" />
        </ClerkLoaded>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h2 className="text-2xl font-bold mb-4">Select at least 2 Genres</h2>
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-2 gap-4">
          {genres.length > 0 ? (
            genres.map((genre) => (
              <label key={genre.id} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  value={genre.id}
                  checked={selectedGenres.includes(genre.id)}
                  onChange={() => handleGenreChange(genre.id)}
                  className="form-checkbox accent-blue-600"
                />
                <span>{genre.name}</span>
              </label>
            ))
          ) : (
            <p className="col-span-2 text-gray-500">Loading genres...</p>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-all"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
