import { Navbar, Footer } from "./components";
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
      <main>
        <Navbar />
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
      <Footer />
    </>
  );
};

export default APP;
