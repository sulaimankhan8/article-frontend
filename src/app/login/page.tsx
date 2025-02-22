"use client";

import { useUser, SignIn, ClerkLoaded } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { fetchUserArticles } from "../../utils/api";

export default function LoginPage() {
  const { isSignedIn, user } = useUser();
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      if (isSignedIn && user) {
        try {
          await fetchUserArticles(user.id);
          router.push("/dashboard");
        } catch (error) {
          console.error("Failed to fetch articles:", error);
        }
      }
    }
    fetchData();
  }, [isSignedIn, user, router]);

  if (!isSignedIn) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <ClerkLoaded>
          <SignIn path="/login" routing="path" signUpUrl="/signup" />
        </ClerkLoaded>
      </div>
    );
  }

  return <p>Redirecting...</p>;
}
