"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { fetchUserArticles } from "../../utils/api";

interface Article {
  id: number;
  title: string;
  content: string;
}

export default function Dashboard() {
  const { user } = useUser();
  const [articles, setArticles] = useState<Article[]>([]);

  useEffect(() => {
    async function loadArticles() {
      if (user) {
        try {
          const data = await fetchUserArticles(user.id);
          setArticles(data);
        } catch (error) {
          console.error(error);
        }
      }
    }
    loadArticles();
  }, [user]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Your Articles</h1>
      {articles.length > 0 ? (
        articles.map((article) => (
          <div key={article.id} className="mb-4">
            <a
              href={article.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline text-lg"
            >
              {article.title}
            </a>
          </div>
        ))) : (
        <p>No articles yet.</p>
      )}
    </div>
  );
}
