import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./Components/Ui/avatar";

function App() {
  const [contacts, setContacts] = useState([]);
  const url =
    "https://thingproxy.freeboard.io/fetch/https://live.devnimble.com/api/v1/contacts?sort=created:desc";
  const token = process.env.REACT_APP_TOKEN;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Network response was not ok " + response.statusText);
        }

        const data = await response.json();
        setContacts(data.resources);
      } catch (error) {
        console.error(
          "There has been a problem with your fetch operation:",
          error
        );
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log(contacts);
    // contacts?.map((contact: any) => {
    //   console.log(contact.fields.email?.map((email: any) => email.value));
    // }
    // );
  }, [contacts]);

  return (
    <div className="w-full mt-[200px] flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold">User list</h1>
      <div>
        {contacts?.map((contact: any) => (
          <div key={contact.id} className="border p-2 my-2">
            <Avatar>
              <AvatarImage src={contact.avatar_url} alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p>
              {contact.fields?.["first name"]?.map((value: any) => value.value)}
            </p>
            <p>
              {contact.fields?.["last name"]?.map((value: any) => value.value)}
            </p>
            <p>{contact.fields.email?.map((value: any) => value.value)}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
