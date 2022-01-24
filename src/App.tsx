import { Navbar } from "./components";
import { Routes, Route } from "react-router-dom";
import {
  Home,
  Cryptocurrencies,
  CryptoDetails,
  News,
  Exchanges,
} from "./views";

const APP = () => {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="cryptocurrencies">
            <Route index element={<Cryptocurrencies />} />
            <Route path=":id" element={<CryptoDetails />} />
          </Route>
          <Route path="exchanges" element={<Exchanges />} />
          <Route path="news" element={<News />} />
        </Routes>
      </main>
      {/* Footer section */}
      <footer></footer>
    </>
  );
};

export default APP;
