import { useEffect } from "react";
import axios from "axios";
import TopNav from "./components/TopNav";
import { useAppDispatch } from "./app/hooks";
import { init } from "./features/contact/contactSlice";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import NotFound from "./components/NotFound";
import About from "./components/About";
import Contacts from "./components/Contacts";
import Home from "./components/Home";

interface Contacts {
  phone: string;
  name: string;
  photo: string;
  id: string;
}

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    axios
      .get<Contacts[]>("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.data)
      .then((res) => dispatch(init(res)))
      .catch((error) => console.log(error));
  });

  return (
    <BrowserRouter>
      <div className="pt-5 container">
        <TopNav />
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
