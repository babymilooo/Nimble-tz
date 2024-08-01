import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./Components/Ui/avatar";
import { Label } from "./Components/Ui/label";
import { Input } from "./Components/Ui/input";
import toast, { Toaster } from "react-hot-toast";
import { createContact, deleteContact, fetchContacts } from "./api/api";
import { useAppDispatch, useAppSelector } from "./hooks/redux";

function App() {
  // const [contacts, setContacts] = useState([]);
  const [error, setError] = useState(null);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const dispatch = useAppDispatch();
  const { contacts, isLoading } = useAppSelector(
    (state) => state.contactReducer
  );

  useEffect(() => {
    dispatch(fetchContacts());
  }, []);

  const handleCreate = async () => {
    if ((!name && !lastName) || !email) {
      toast.error("Please fill all fields");
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Invalid email");
      return;
    }

    const contact = {
      record_type: "person",
      privacy: {
        edit: null,
        read: null,
      },
      owner_id: null,

      fields: {
        "first name": [{ value: name, modifier: "", label: "first name" }],
        "last name": [{ value: lastName, modifier: "", label: "last name" }],
        email: [{ value: email, modifier: "", label: "email" }],
      },
    };

    const action = await createContact(contact);
    dispatch(action);
  };

  const handleDelete = async (id: string) => {
    const action = await deleteContact(id);
    dispatch(action);
  };

  return (
    <div className="w-full mt-[200px] flex flex-col justify-center items-center">
      <h1 className="text-5xl font-bold lg:w-3/5 w-full px-4 select-none">
        Contacts
      </h1>
      <div className="lg:w-3/5 w-full p-4 flex items-start">
        <div className="w-[800px]">
          {contacts?.map((contact: any) => (
            <div
              key={contact.id}
              className="border p-2 my-2 rounded-lg transition-colors hover:border-black duration-200 cursor-pointer"
            >
              <div className="flex items-center gap-1 font-bold text-2xl whitespace-nowrap overflow-hidden text-ellipsis">
                <Avatar className="mr-2 select-none">
                  <AvatarImage src={contact.avatar_url} alt="@shadcn" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <p className="select-none">
                  {contact.fields?.["first name"]?.map(
                    (value: any) => value.value
                  )}
                </p>
                <p className="select-none">
                  {contact.fields?.["last name"]?.map(
                    (value: any) => value.value
                  )}
                </p>
              </div>
              <p className="text-lg text-neutral-400">
                {contact.fields.email?.map((value: any) => value.value)}
              </p>
              <div className="flex items-center select-none justify-between">
                <div>
                  {contact.tags?.map((tag: any) => (
                    <span
                      key={tag.id}
                      className="bg-neutral-200 rounded-md p-1 m-1"
                    >
                      {tag.tag}
                    </span>
                  ))}
                </div>
                <button
                  className="rounded-md bg-black text-white px-3 py-1"
                  onClick={() => handleDelete(contact.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="w-[400px] m-2 border flex flex-col items-center sticky top-2 rounded-lg select-none">
          <h1 className="text-3xl font-bold w-full p-4 py-8 text-center">
            Create new
          </h1>
          <div className="flex flex-col w-full gap-4 mb-4">
            <div className="grid w-full px-4 items-center gap-1.5">
              <Label htmlFor="name" className="text-neutral-400">
                First name
              </Label>
              <Input
                type="text"
                id="name"
                placeholder="Name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="grid w-full px-4 items-center gap-1.5">
              <Label htmlFor="lastName" className="text-neutral-400">
                Last name (optional)
              </Label>
              <Input
                type="text"
                id="lastName"
                placeholder="Last name"
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="grid w-full px-4 items-center gap-1.5">
              <Label htmlFor="email" className="text-neutral-400">
                Email
              </Label>
              <Input
                type="email"
                id="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button
              className="bg-black mx-4 mt-4 text-white p-2 rounded-md"
              onClick={() => handleCreate()}
            >
              Create
            </button>
          </div>
        </div>
      </div>
      <Toaster position="bottom-right" reverseOrder={false} />
    </div>
  );
}

export default App;
