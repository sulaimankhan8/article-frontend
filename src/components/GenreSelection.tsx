import { useState, useEffect } from "react";
import { fetchGenres } from "@/utils/api";

interface Genre {
  id: number;
  name: string;
}

interface Props {
  onSelect: (selected: number[]) => void;
}

export default function GenreSelection({ onSelect }: Props) {
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<number[]>([]);

  useEffect(() => {
    async function loadGenres() {
      try {
        const data = await fetchGenres();
        setGenres(data);
      } catch (error) {
        console.error(error);
      }
    }
    loadGenres();
  }, []);

  const handleGenreChange = (id: number) => {
    setSelectedGenres((prev) => 
      prev.includes(id) ? prev.filter((gid) => gid !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    onSelect(selectedGenres);
  }, [selectedGenres, onSelect]);

  return (
    <div className="grid grid-cols-2 gap-4">
      {genres.length > 0 ? (
        genres.map((genre) => (
          <label key={genre.id} className="flex items-center space-x-2">
            <input
              type="checkbox"
              value={genre.id}
              checked={selectedGenres.includes(genre.id)}
              onChange={() => handleGenreChange(genre.id)}
              className="form-checkbox"
            />
            <span>{genre.name}</span>
          </label>
        ))
      ) : (
        <p>Loading genres...</p>
      )}
    </div>
  );
}
