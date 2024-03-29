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
  const [item, setItem] = useState<Contact>({
    name: "",
    phone: "",
    photo: "",
    id: "",
  });

  useEffect(() => setItem(contact), [contact]);

  function change() {
    dispatch(update(item));
    setToggle(false);
  }

  function edit(val: string, prop: string) {
    setItem({ ...item, [prop]: val });
  }

  return (
    <div className="card-div px-2 my-4">
      <Card className="shadow card-main">
        <CardBody>
          {!toggle ? (
            <div>
              <div className="card-div-img">
                <CardImg
                  alt="Contact photo"
                  src={contact.photo || pic}
                  top
                  width="100%"
                  height="100%"
                />
              </div>
              <CardTitle tag="h5" className=" some-text">
                {contact.name}
              </CardTitle>
              <CardText>{contact.phone}</CardText>
              <Button
                onClick={() => setToggle(true)}
                className="w-100 bg-success mb-2"
              >
                Edit
              </Button>
              <Button
                onClick={() => dispatch(undo(contact.id))}
                className="w-100 bg-danger"
              >
                Delete
              </Button>
            </div>
          ) : (
            <div>
              <Input
                value={item.name}
                onChange={(e) => edit(e.target.value, "name")}
              />
              <Input
                value={item.phone}
                onChange={(e) => edit(e.target.value, "phone")}
                className="my-2"
              />
              <Input
                value={item.photo}
                onChange={(e) => edit(e.target.value, "photo")}
              />
              <Button onClick={() => change()} className="my-2 w-100">
                Save
              </Button>
            </div>
          )}
        </CardBody>
      </Card>
    </div>
  );
};

export default ContactCard;
