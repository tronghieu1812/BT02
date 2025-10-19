import {useEffect, useState} from "react";
import axios from "axios";
import {Link} from "react-router-dom";

interface CountrySummary {
  name: {common: string};
  flags: {png: string; svg?: string};
  population: number;
  region: string;
  cca3: string;
}

export default function Bai6() {
  const [countries, setCountries] = useState<CountrySummary[]>([]);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    axios
      .get<CountrySummary[]>(
        "https://restcountries.com/v3.1/all?fields=name,flags,population,region,cca3"
      )
      .then((res) => {
        setCountries(res.data || []);
        setError("");
      })
      .catch((err) => {
        console.error(err);
        setError("Không thể tải dữ liệu quốc gia.");
      })
      .finally(() => setLoading(false));
  }, []);

  const filtered = countries.filter((c) =>
    c.name.common.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{padding: 20}}>
      <div style={{marginBottom: 12}}>
        <input
          type="text"
          placeholder="Tìm quốc gia..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{marginRight: 8, padding: 6}}
        />
      </div>

      {loading && <p>Đang tải danh sách quốc gia...</p>}
      {error && <p style={{color: "red"}}>{error}</p>}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, 200px)",
          gap: 16,
        }}
      >
        {filtered.map((c) => (
          <div
            key={c.cca3}
            style={{
              border: "1px solid #ccc",
              padding: 10,
              borderRadius: 8,
              textAlign: "center",
            }}
          >
            <img
              src={c.flags.png}
              alt={c.name.common}
              width={100}
              style={{borderRadius: 6}}
            />
            <h4 style={{margin: "8px 0 4px"}}>{c.name.common}</h4>
            <div className="small">Region: {c.region}</div>
            <div className="small">
              Population: {c.population.toLocaleString()}
            </div>
            <div style={{marginTop: 8}}>
              <Link to={`/bai1/${encodeURIComponent(c.cca3)}`}>
                Xem chi tiết
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
