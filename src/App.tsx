import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./Components/Ui/avatar";
import { Label } from "./Components/Ui/label";
import { Input } from "./Components/Ui/input";
import toast, { Toaster } from "react-hot-toast";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import { Link } from "react-router-dom";
import { CreateNew } from "./Components/CreateNew";
import { deleteContact, fetchContacts } from "./api/api";

function App() {
  const dispatch = useAppDispatch();
  const { contacts, isLoading } = useAppSelector(
    (state) => state.contactReducer
  );

  useEffect(() => {
    dispatch(fetchContacts());
  }, []);

  const handleDelete = async (id: string) => {
    const action = await deleteContact(id);
    dispatch(action);
    toast.success("Contact deleted");
  };

  return (
    <div className="w-full mt-[150px] flex flex-col justify-center items-center">
      <h1 className="text-5xl font-bold lg:w-3/5 w-full px-4 select-none">
        Contacts
      </h1>
      <div className="md:hidden flex w-full">
        <CreateNew />
      </div>
      <div className="lg:w-3/5 w-full p-4 flex items-start">
        <div className="w-[800px]">
          {contacts?.map((contact: any) => (
            <div
              key={contact.id}
              className="border p-2 my-2 rounded-lg transition-colors hover:border-black duration-200 cursor-pointer"
            >
              <Link to={`/contact/${contact.id}`}>
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
              </Link>

              <div className="flex items-end select-none justify-between">
                <div className="flex flex-wrap">
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
        <div className="md:flex hidden ">
          <CreateNew />
        </div>
      </div>
      <Toaster position="bottom-right" reverseOrder={false} />
    </div>
  );
}

export default App;
