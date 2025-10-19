// src/pages/Bai6/CountryDetail.tsx
import React, {useEffect, useState} from "react";
import {useParams, Link} from "react-router-dom";
import axios from "axios";

interface CountryDetail {
  name: {common: string; official?: string};
  flags: {png?: string; svg?: string};
  population?: number;
  region?: string;
  capital?: string[];
  subregion?: string;
  area?: number;
  languages?: Record<string, string>;
  currencies?: Record<string, {name: string; symbol?: string}>;
  borders?: string[];
  maps?: {googleMaps?: string; openStreetMaps?: string};
  cca3?: string;
}

export default function CountryDetailPage() {
  const {code} = useParams<{code: string}>();
  const [country, setCountry] = useState<CountryDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!code) return;
    setLoading(true);
    setError("");
    // Lấy chi tiết theo mã alpha (cca3)
    axios
      .get(
        `https://restcountries.com/v3.1/alpha/${encodeURIComponent(
          code
        )}?fields=name,flags,population,region,capital,subregion,area,languages,currencies,borders,maps,cca3`
      )
      .then((res) => {
        const data = res.data;
        // API có thể trả mảng hoặc object -> chuẩn hoá
        const c = Array.isArray(data) ? data[0] : data;
        setCountry(c || null);
      })
      .catch((err) => {
        console.error(err);
        setError("Không tìm thấy chi tiết quốc gia.");
      })
      .finally(() => setLoading(false));
  }, [code]);

  if (loading) return <p>Đang tải chi tiết...</p>;
  if (error) return <p style={{color: "red"}}>{error}</p>;
  if (!country) return <p>Không có dữ liệu.</p>;

  const languages = country.languages
    ? Object.values(country.languages).join(", ")
    : "-";
  const currencies = country.currencies
    ? Object.values(country.currencies)
        .map((c) => (c.symbol ? `${c.name} (${c.symbol})` : c.name))
        .join(", ")
    : "-";

  return (
    <div style={{padding: 20}}>
      <h2>Chi tiết: {country.name.common}</h2>
      <div style={{display: "flex", gap: 20, alignItems: "flex-start"}}>
        <div>
          {country.flags?.png && (
            <img
              src={country.flags.png}
              alt={country.name.common}
              width={220}
              style={{borderRadius: 6}}
            />
          )}
        </div>

        <div style={{flex: 1}}>
          <p>
            <b>Tên chính thức:</b> {country.name.official || "-"}
          </p>
          <p>
            <b>Vùng:</b> {country.region || "-"}
          </p>
          <p>
            <b>Vùng con (subregion):</b> {country.subregion || "-"}
          </p>
          <p>
            <b>Thủ đô:</b> {country.capital ? country.capital.join(", ") : "-"}
          </p>
          <p>
            <b>Dân số:</b>{" "}
            {country.population ? country.population.toLocaleString() : "-"}
          </p>
          <p>
            <b>Diện tích:</b>{" "}
            {country.area ? `${country.area.toLocaleString()} km²` : "-"}
          </p>
          <p>
            <b>Ngôn ngữ:</b> {languages}
          </p>
          <p>
            <b>Tiền tệ:</b> {currencies}
          </p>

          {/* <p>
            <b>Bản đồ:</b>{" "}
            {country.maps?.googleMaps ? (
              <a
                href={country.maps.googleMaps}
                target="_blank"
                rel="noreferrer"
              >
                Google Maps
              </a>
            ) : country.maps?.openStreetMaps ? (
              <a
                href={country.maps.openStreetMaps}
                target="_blank"
                rel="noreferrer"
              >
                OpenStreetMap
              </a>
            ) : (
              "-"
            )}
          </p> */}

          {/* <p>
            <b>Borders:</b>{" "}
            {country.borders && country.borders.length > 0 ? (
              country.borders.map((b) => (
                <span key={b} style={{marginRight: 8}}>
                  <Link to={`/bai1/${b}`}>{b}</Link>
                </span>
              ))
            ) : (
              <span>-</span>
            )}
          </p> */}

          <div style={{marginTop: 12}}>
            <Link to="/bai1">Quay lại</Link>
          </div>
        </div>
      </div>
    </div>
  );
}
