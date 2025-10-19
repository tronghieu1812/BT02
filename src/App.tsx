import {Route, BrowserRouter as Router, Routes} from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar";
import Bai1 from "./Bai1";
import Bai2 from "./Bai2/Bai2";
import Bai3 from "./Bai3";
import MovieDetail from "./Bai3/MovieDetail";
import CountryDetail from "./Bai1/CountryDetail";
export default function App() {
  return (
    <Router>
      <Navbar />
      <div className="container">
        <Routes>
          <Route path="/bai1" element={<Bai1 />} />
          <Route path="/bai1/:code" element={<CountryDetail />} />
          <Route path="/bai2" element={<Bai2 />} />
          <Route path="/bai3" element={<Bai3 />} />
          <Route path="/movie/:imdbID" element={<MovieDetail />} />
          
        </Routes>
      </div>
    </Router>
  );
}
