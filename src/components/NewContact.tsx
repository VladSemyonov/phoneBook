import { FC, SyntheticEvent, useState } from "react";
import { FormGroup, Input, Label, Form, Button } from "reactstrap";
import { addItem } from "../features/contact/contactSlice";
import { useAppDispatch } from "../app/hooks";
import { Contact } from "../types";
import { setDisplay } from "../features/contact/contactSlice";
const shortid = require("shortid");

interface Error {
  name?: string;
  phone?: string;
}

const init = {
  phone: "",
  photo: "",
  name: "",
  id: "",
};

const NewContact: FC = () => {
  const dispatch = useAppDispatch();
  const [data, setData] = useState<Contact>(init);
  const [errors, setErrors] = useState<Error>({});

  function changeValue(prop: string, value: string) {
    setData({ ...data, [prop]: value });
  }

  function handleSubmit(e: SyntheticEvent, obj: Contact) {
    e.preventDefault();
    checkData(obj);
    if (!Object.keys(errors).length) {
      console.log("up");
      let _id = shortid.generate();
      obj.id = _id;
      dispatch(addItem(obj));
      dispatch(setDisplay());
      setData(init);
    }
  }

  function checkData(obj: Contact) {
    let errors: Error = {};
    if (obj.name.length < 2) errors.name = "Имя слишком короткое";
    if (obj.phone.length < 3) errors.phone = "Номер слишком короткий";
    setErrors(errors);
  }

  return (
    <div
      className="w-100 h-100 position-fixed d-flex justify-content-center align-items-center top-0 start-0 bg-secondary bg-opacity-75"
      style={{ zIndex: "100" }}
    >
      <Form
        onSubmit={(e) => handleSubmit(e, data)}
        className="py-4 px-5 bg-white"
      >
        <FormGroup>
          <Label for="name">Name</Label>
          <Input
            id="name"
            placeholder="type name and surname"
            type="text"
            value={data.name}
            onChange={(e) => changeValue(e.target.id, e.target.value)}
          />
          <span className="text-danger">{errors?.name}</span>
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
          <span className="text-danger">{errors?.phone}</span>
        </FormGroup>
        <FormGroup>
          <Label for="photo">Photo</Label>
          <Input
            id="photo"
            type="text"
            placeholder="type img url"
            value={data.photo}
            onChange={(e) => changeValue(e.target.id, e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Button type="submit" className="w-50 bg-success">
            Save
          </Button>
          <Button
            type="button"
            onClick={() => dispatch(setDisplay())}
            className="w-50 bg-danger"
          >
            Close
          </Button>
        </FormGroup>
      </Form>
    </div>
  );
};

export default NewContact;
