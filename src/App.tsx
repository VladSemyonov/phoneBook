import { useEffect, useState } from "react";
import axios from "axios";
import TopNav from "./components/TopNav";
import { useAppDispatch } from "./app/hooks";
import { init } from "./features/contact/contactSlice";
import ContactList from "./components/Contacts/ContactList";
import NewContact from "./components/NewContact";
import { Button } from "reactstrap";

interface Contacts {
  phone: string;
  name: string;
  photo: string;
  id: string;
}

function App() {
  const dispatch = useAppDispatch();

  const [toggleForm, setToggleForm] = useState(false);

  useEffect(() => {
    axios
      .get<Contacts[]>("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.data)
      .then((res) => dispatch(init(res)))
      .catch((error) => console.log(error));
  });

  return (
    <div className="pt-5 container">
      <TopNav />
      <Button className="mt-5" onClick={() => setToggleForm(!toggleForm)}>
        Add new contact
      </Button>
      {toggleForm && <NewContact />}
      <header className="App-header">
        <ContactList />
      </header>
    </div>
  );
}

export default App;
