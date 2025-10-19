import {useEffect, useState} from "react";
import axios from "axios";
import {useParams, Link} from "react-router-dom";

interface MovieDetail {
  Title: string;
  Year: string;
  Genre: string;
  Director: string;
  Plot: string;
  Poster: string;
  imdbRating: string;
}

export default function MovieDetailPage() {
  const {imdbID} = useParams();
  const [movie, setMovie] = useState<MovieDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMovie = async () => {
      setLoading(true);
      setError("");
      try {
        const res = await axios.get(
          `https://www.omdbapi.com/?apikey=thewdb&i=${imdbID}&plot=full`
        );
        if (res.data.Response === "True") {
          setMovie(res.data);
        } else {
          setError(res.data.Error || "Không tìm thấy phim.");
        }
      } catch {
        setError("Lỗi khi tải dữ liệu phim.");
      } finally {
        setLoading(false);
      }
    };
    fetchMovie();
  }, [imdbID]);

  if (loading) return <p style={{padding: 20}}>Đang tải chi tiết phim...</p>;
  if (error) return <p style={{color: "red", padding: 20}}>{error}</p>;
  if (!movie) return null;

  return (
    <div style={{padding: 20}}>
      <Link to="/bai3">Quay lại danh sách</Link>
      <h2>
        {movie.Title} ({movie.Year})
      </h2>
      <div style={{display: "flex", gap: 20, marginTop: 20}}>
        <img
          src={
            movie.Poster !== "N/A"
              ? movie.Poster
              : "https://via.placeholder.com/300"
          }
          alt={movie.Title}
          width={300}
          style={{borderRadius: 8}}
        />
        <div>
          <p>
            <strong>Thể loại:</strong> {movie.Genre}
          </p>
          <p>
            <strong>Đạo diễn:</strong> {movie.Director}
          </p>
          <p>
            <strong>IMDb Rating:</strong> ⭐ {movie.imdbRating}
          </p>
          <p style={{marginTop: 10}}>
            <strong>Tóm tắt:</strong> {movie.Plot}
          </p>
        </div>
      </div>
    </div>
  );
}
