import { FC, useEffect, useState } from "react";
import { Input } from "reactstrap";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { search, users, searching } from "../../features/contact/contactSlice";
import { Contact } from "../../types";
import ContactCard from "./ContactCard";

const ContactList: FC = () => {
  const contacts = useAppSelector(users);
  const findValues = useAppSelector(searching);
  const dispatch = useAppDispatch();

  const [searchInput, setSearchInput] = useState("");

  useEffect(() => {
    dispatch(search(searchInput));
  }, [searchInput]);

  return (
    <>
      <Input
        placeholder="search"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        className="my-4 px-2"
      />
      {searchInput.length > 0 ? (
        <div className="d-flex flex-wrap">
          {findValues.map((contact: Contact, index: number) => (
            <ContactCard key={index} contact={contact} />
          ))}
        </div>
      ) : (
        <div className="d-flex flex-wrap">
          {contacts.map((contact: Contact, index: number) => (
            <ContactCard key={index} contact={contact} />
          ))}
        </div>
      )}
    </>
  );
};

export default ContactList;
