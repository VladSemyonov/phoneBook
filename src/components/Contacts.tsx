import { FC } from "react";
import { Button } from "reactstrap";
import ContactList from "./Contacts/ContactList";
import NewContact from "./NewContact";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setDisplay, formDisplay } from "../features/contact/contactSlice";

const Contacts: FC = () => {
  const dispatch = useAppDispatch();
  const showForm = useAppSelector(formDisplay);

  return (
    <>
      <Button className="mt-5" onClick={() => dispatch(setDisplay())}>
        Add new contact
      </Button>
      {showForm && <NewContact />}
      <ContactList />
    </>
  );
};

export default Contacts;
