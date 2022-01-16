import { useEffect } from "react";
import TopNav from "./components/TopNav";
import { useAppDispatch } from "./app/hooks";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import NotFound from "./components/NotFound";
import About from "./components/About";
import Contacts from "./components/Contacts";
import Home from "./components/Home";
import { fetchUsers } from "./features/contact/ActionCreators";
import "./style.scss";
import MobileMenu from "./components/MobileMenu";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  });

  return (
    <BrowserRouter>
      <div className="pt-5 container">
        <TopNav />
        <MobileMenu />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="contacts" element={<Contacts />} />
          <Route path="about" element={<About />} />
          <Route path="404" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
