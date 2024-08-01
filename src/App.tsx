import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./Components/Ui/avatar";

function App() {
  const [contacts, setContacts] = useState([]);
  const [error, setError] = useState(null);
  const sort = "created:desc";
  const url =
    "https://thingproxy.freeboard.io/fetch/https://live.devnimble.com/api/v1/contacts?sort=created:desc";
  const token = process.env.REACT_APP_TOKEN;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          // `https://cors-anywhere.herokuapp.com/https://live.devnimble.com/api/v1/contacts`,
          url,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }

        const data = await response.json();
        console.log(data.resources);
        setContacts(data.resources);
      } catch (error) {
        setError((error as any).message);
      }
    };

    fetchData();
  }, []);

  // useEffect(() => {
  //   console.log(contacts);
  // }, [contacts]);

  return (
    <div className="w-full mt-[200px] flex flex-col justify-center items-center">
      <h1 className="text-5xl font-bold lg:w-3/5 w-full px-4">Contacts</h1>
      <div className="lg:w-3/5 w-full p-4 grid grid-cols-5">
        <div className="col-span-3">
          {contacts?.map((contact: any) => (
            <div key={contact.id} className="border p-2 my-2 rounded-lg transition-colors hover:border-black duration-200 cursor-pointer">
              <div className="flex items-center gap-1 font-bold text-2xl">
                <Avatar className="mr-2">
                  <AvatarImage src={contact.avatar_url} alt="@shadcn"/>
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <p>
                  {contact.fields?.["first name"]?.map(
                    (value: any) => value.value
                  )}
                </p>
                <p>
                  {contact.fields?.["last name"]?.map(
                    (value: any) => value.value
                  )}
                </p>
              </div>
              <p className="text-lg text-neutral-400">{contact.fields.email?.map((value: any) => value.value)}</p>
              <div className="flex items-center">
                {contact.tags?.map((tag: any) => (
                  <span key={tag.id} className="bg-neutral-200 rounded-md p-1 m-1">
                    {tag.tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="col-span-2 m-2 border">
        <h1 className="text-3xl font-bold w-full p-4">Create new</h1>
          
        </div>
      </div>
    </div>
  );
}

export default App;
