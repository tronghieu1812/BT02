import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
}

export default function Bai3() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchMovies = async (search: string) => {
    if (!search) return;
    setLoading(true);
    setError("");
    try {
      // Sử dụng OMDB API (không cần key thật cho demo)
      const res = await axios.get(
        `https://www.omdbapi.com/?apikey=thewdb&s=${search}`
      );
      if (res.data.Response === "True") {
        setMovies(res.data.Search);
      } else {
        setError(res.data.Error || "Không tìm thấy phim.");
        setMovies([]);
      }
    } catch (err) {
      setError("Lỗi khi gọi API phim.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies(query);
  }, []);

  const handleSearch = () => {
    fetchMovies(query);
  };

  return (
    <div style={{padding: 20}}>
      <div style={{marginBottom: 16}}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Nhập tên phim..."
        />
        <button onClick={handleSearch} style={{marginLeft: 8}}>
          Tìm kiếm
        </button>
      </div>

      {loading && <p>Đang tải dữ liệu...</p>}
      {error && <p style={{color: "red"}}>{error}</p>}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 16,
        }}
      >
        {movies.map((movie) => (
          <div
            key={movie.imdbID}
            style={{
              border: "1px solid #ccc",
              borderRadius: 8,
              padding: 10,
              textAlign: "center",
            }}
          >
            <img
              src={
                movie.Poster !== "N/A"
                  ? movie.Poster
                  : "https://via.placeholder.com/200"
              }
              alt={movie.Title}
              width="100%"
              height="300"
              style={{objectFit: "cover", borderRadius: 8}}
            />
            <h3 style={{fontSize: 16}}>{movie.Title}</h3>
            <p>{movie.Year}</p>
            <Link to={`/movie/${movie.imdbID}`}>Xem chi tiết</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
