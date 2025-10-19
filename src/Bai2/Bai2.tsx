import axios from "axios";
import {useEffect, useState} from "react";
interface RatesResponse {
  base_code: string;
  rates: Record<string, number>;
}

export default function Bai2() {
  const [rates, setRates] = useState<Record<string, number>>({});
  const [base, setBase] = useState("USD");
  const [target, setTarget] = useState("VND");
  const [amount, setAmount] = useState(1);
  const [result, setResult] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchRates = async (baseCurrency: string) => {
    setLoading(true);
    setError("");
    try {
     
      const res = await axios.get<RatesResponse>(
        `https://open.er-api.com/v6/latest/${baseCurrency}`
      );
      setRates(res.data.rates);
    } catch (err) {
      console.error(err);
      setError("Không thể tải tỷ giá. Vui lòng thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRates(base);
  }, [base]);

  const handleConvert = () => {
    if (!rates[target]) {
      setError("Không tìm thấy tỷ giá cho đơn vị đích.");
      return;
    }
    setResult(amount * rates[target]);
  };

  const currencyOptions = [
    "USD",
    "EUR",
    "VND",
    "JPY",
    "GBP",
    "AUD",
    "CNY",
    "KRW",
  ];

  return (
    <div style={{padding: 20}}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 12,
          marginBottom: 20,
        }}
      >
        <label>Đơn vị gốc:</label>
        <select value={base} onChange={(e) => setBase(e.target.value)}>
          {currencyOptions.map((cur) => (
            <option key={cur}>{cur}</option>
          ))}
        </select>

        <label>Đơn vị đích:</label>
        <select value={target} onChange={(e) => setTarget(e.target.value)}>
          {currencyOptions.map((cur) => (
            <option key={cur}>{cur}</option>
          ))}
        </select>

        <label>Số tiền:</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
          style={{width: 100}}
        />

        <button onClick={handleConvert} disabled={loading}>
          Quy đổi
        </button>
      </div>

      {loading && <p>⏳ Đang tải dữ liệu...</p>}
      {error && <p style={{color: "red"}}>{error}</p>}

      {result !== null && !loading && !error && (
        <p style={{fontSize: 18}}>
          {amount} {base} ={" "}
          <strong>
            {result.toFixed(2)} {target}
          </strong>
        </p>
      )}

    </div>
  );
}
