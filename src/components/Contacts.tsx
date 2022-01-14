import { FC, useState } from "react";
import { Button } from "reactstrap";
import ContactList from "./Contacts/ContactList";
import NewContact from "./NewContact";

const Contacts: FC = () => {
  const [toggleForm, setToggleForm] = useState(false);
  return (
    <>
      <Button className="mt-5" onClick={() => setToggleForm(!toggleForm)}>
        Add new contact
      </Button>
      {toggleForm && <NewContact />}
      <ContactList />
    </>
  );
};

export default Contacts;
