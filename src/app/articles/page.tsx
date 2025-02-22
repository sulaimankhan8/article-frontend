"use client";

import { useUser, SignUp, ClerkLoaded } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useState } from "react";
import GenreSelection from "../../components/GenreSelection";
import { signupUser } from "../../utils/api";

export default function SignupPage() {
  const { isSignedIn, user } = useUser();
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedGenres.length < 2) return alert("Select at least 2 genres.");

    setLoading(true);
    try {
      await signupUser(user?.id || "", user?.primaryEmailAddress?.emailAddress || "", selectedGenres);
      router.push("/dashboard");
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (!isSignedIn) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <ClerkLoaded>
          <SignUp path="/signup" routing="path" signInUrl="/login" />
        </ClerkLoaded>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-bold mb-4">Select at least 2 Genres</h2>
      <form onSubmit={handleSubmit} className="max-w-md bg-white p-6 rounded-lg shadow-md">
        <GenreSelection onSelect={setSelectedGenres} />
        <button
          type="submit"
          disabled={loading}
          className="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}
