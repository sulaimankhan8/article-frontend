export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export async function fetchGenres() {
  const res = await fetch(`${API_BASE_URL}/api/genera`);
  if (!res.ok) throw new Error("Failed to fetch genres");
  return res.json();
}

export async function signupUser(clerkId: string, email: string, generaIds: number[]) {
  const res = await fetch(`${API_BASE_URL}/api/users/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ clerkId, email, generaIds }),
  });

  if (!res.ok) throw new Error("Signup failed");
  return res.json();
}
export const fetchUserArticles = async (clerkId: string) => {
  try {
    const response = await fetch(`https://article-backend-c6en.onrender.com/api/article/${clerkId}`, {
      method: "GET",
      credentials: "include", // Ensure cookies/auth headers are included
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to fetch articles: ${errorText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching articles:", error);
    throw error;
  }
};
