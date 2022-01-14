import counterReducer, {
  CounterState,
  undo,
  addItem,
  init,
  search,
} from "./contactSlice";

describe("contact reducers", () => {
  const initialState: CounterState = {
    value: [],
    searchValues: [],
  };
  let newContact = { phone: "333", photo: "eee", name: "Name", id: "1" };
  let newContact2 = { phone: "111", photo: "aaa", name: "Name2", id: "2" };

  test("correct working of adding new items", () => {
    const actual = counterReducer(initialState, addItem(newContact));
    expect(actual.value).toContain(newContact);
  });

  test("correct working of deleting items", () => {
    let actual = counterReducer(initialState, addItem(newContact));
    actual = counterReducer(actual, addItem(newContact2));
    actual = counterReducer(actual, addItem(newContact2));
    actual = counterReducer(actual, undo("1"));
    expect(actual.value).toContain([newContact2, newContact2]);
  });

  test("inition new state and search items", () => {
    let actual = counterReducer(
      initialState,
      init([
        { phone: "333", photo: "eee", name: "Name", id: "1" },
        { phone: "333", photo: "eee", name: "Name", id: "1" },
        { phone: "333", photo: "eee", name: "Name", id: "1" },
        { phone: "111", photo: "aaa", name: "Name2", id: "2" },
        { phone: "111", photo: "aaa", name: "Name2", id: "2" },
      ])
    );
    expect(actual.value.length).toBe(5);

    actual = counterReducer(actual, search("Name2"));
    expect(["Alice", "Bob", "Eve"]).toEqual(
      expect.arrayContaining([newContact2, newContact2])
    );
    expect(actual.searchValues.length).toBe(2);
  });
});
