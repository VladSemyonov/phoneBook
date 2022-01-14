import { FC, SyntheticEvent, useState } from "react";
import { FormGroup, Input, Label, Form, Button } from "reactstrap";
import { addItem } from "../features/contact/contactSlice";
import { useAppDispatch } from "../app/hooks";
import { Contact } from "../types";
const shortid = require("shortid");

const init = {
  phone: "",
  photo: "",
  name: "",
  id: "",
};

const NewContact: FC = () => {
  const dispatch = useAppDispatch();
  const [data, setData] = useState<Contact>(init);

  function changeValue(prop: string, value: string) {
    setData({ ...data, [prop]: value });
  }

  function handleSubmit(e: SyntheticEvent, obj: Contact) {
    e.preventDefault();
    let _id = shortid.generate();
    obj.id = _id;
    dispatch(addItem(obj));
    setData(init);
  }

  return (
    <Form onSubmit={(e) => handleSubmit(e, data)} className="py-4">
      <FormGroup>
        <Label for="name">Email</Label>
        <Input
          id="name"
          placeholder="type name and surname"
          type="text"
          value={data.name}
          onChange={(e) => changeValue(e.target.id, e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label for="phone">Phone</Label>
        <Input
          id="phone"
          placeholder="type phone"
          type="number"
          value={data.phone}
          onChange={(e) => changeValue(e.target.id, e.target.value)}
        />
      </FormGroup>
      <FormGroup>
        <Label for="photo">File</Label>
        <Input
          id="photo"
          type="text"
          placeholder="type img url"
          value={data.photo}
          onChange={(e) => changeValue(e.target.id, e.target.value)}
        />
      </FormGroup>
      <Button type="submit">Submit</Button>
    </Form>
  );
};

export default NewContact;
