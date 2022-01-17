import counterReducer, {
  CounterState,
  undo,
  addItem,
  search,
  update,
} from "./contactSlice";

describe("contact reducers", () => {
  const initialState: CounterState = {
    value: [],
    searchValues: [],
    display: false,
    isLoading: false,
    error: "",
  };
  let newContact = { phone: "3805000000", photo: "", name: "Name", id: "1" };
  let newContact2 = { phone: "0552333333", photo: "", name: "Name2", id: "2" };

  test("correct working of adding new items", () => {
    const actual = counterReducer(initialState, addItem(newContact));
    expect(actual.value).toContain(newContact);
  });

  test("correct working of deleting items", () => {
    let actual = counterReducer(initialState, addItem(newContact));
    actual = counterReducer(actual, addItem(newContact2));
    actual = counterReducer(actual, addItem(newContact2));
    actual = counterReducer(actual, undo("1"));
    expect(actual.value.length).toBe(2);
  });

  test("correct working of searching items", () => {
    let actual = counterReducer(initialState, addItem(newContact));
    actual = counterReducer(actual, addItem(newContact2));
    actual = counterReducer(actual, search("Name"));
    expect(actual.value).toContain(newContact);
  });

  test("correct working of changing item", () => {
    let actual = counterReducer(initialState, addItem(newContact));
    actual = counterReducer(actual, update({ ...newContact, name: "newName" }));
    const [contact] = actual.value;
    expect(contact.name).toBe("newName");
  });
});
