import { FC, useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Input,
} from "reactstrap";
import { useAppDispatch } from "../../app/hooks";
import { undo, update } from "../../features/contact/contactSlice";
import { Contact } from "../../types";
import pic from "../../placeholder.png";

interface ContactCardProps {
  contact: Contact;
}

const ContactCard: FC<ContactCardProps> = ({ contact }) => {
  const dispatch = useAppDispatch();
  const [toggle, setToggle] = useState(false);
  const [name, setName] = useState<Contact>({
    name: "",
    phone: "",
    photo: "",
    id: "",
  });

  useEffect(() => setName(contact), [contact]);

  function change() {
    dispatch(update(name));
    setToggle(false);
  }

  function edit(val: string, prop: string) {
    setName({ ...name, [prop]: val });
  }

  return (
    <div className="w-25 mw-25 px-2 my-4">
      <Card>
        <CardImg
          alt="Contact photo"
          src={contact.photo || pic}
          top
          width="100%"
        />
        <CardBody>
          {!toggle ? (
            <div>
              <Button onClick={() => setToggle(true)}>Edit</Button>
              <CardTitle tag="h5">{contact.name}</CardTitle>
              <CardText>{contact.phone}</CardText>
            </div>
          ) : (
            <div>
              <Input
                value={name.name}
                onChange={(e) => edit(e.target.value, "name")}
              />
              <Input
                value={name.phone}
                onChange={(e) => edit(e.target.value, "phone")}
              />
              <Button onClick={() => change()}>Save</Button>
            </div>
          )}
          <Button onClick={() => dispatch(undo(contact.id))}>Button</Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default ContactCard;
