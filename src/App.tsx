import { Navbar } from "./components";
import { Routes, Route } from "react-router-dom";
import {
  Home,
  Criptocurrencies,
  CriptoDetails,
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
          <Route path="criptocurrencies">
            <Route index element={<Criptocurrencies />} />
            <Route path=":id" element={<CriptoDetails />} />
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
