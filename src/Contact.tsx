import React, { useEffect, useState } from "react";
import { addTag, getContact } from "./api/api";
import { useAppDispatch } from "./hooks/redux";
import { Avatar, AvatarFallback, AvatarImage } from "./Components/Ui/avatar";
import { Link, useParams } from "react-router-dom";
import { IContact } from "./models/IContact";
import { Label } from "./Components/Ui/label";
import { Input } from "./Components/Ui/input";
import toast, { Toaster } from "react-hot-toast";

export default function Contact() {
  const [contact, setContact] = useState<IContact>();
  const [loading, setLoading] = useState(false);

  const [tag, setTag] = useState<string>("");
  const { id = "" } = useParams<{ id: string }>();
  useEffect(() => {
    const fetchContact = async () => {
      const responce: any = await getContact(id);
      setContact(responce[0]);
      setLoading(false);
    };

    setLoading(true);
    fetchContact();
  }, [id]);

  const handleAddTag = async () => {
    if (!tag) {
      toast.error("Please fill new tag field");
      return;
    }

    const updatedTags = [...(contact?.tags.map((tag) => tag.tag) || []), tag];

    try {
      const response = await addTag(id, { tags: updatedTags });
      setContact(response);
      setTag("");
      toast.success("tag added");

    } catch (error) {
      console.error("Failed to add tags:", error);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      {loading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="flex flex-col lg:w-[800px] w-full p-4">
          <div className="border-black border p-4 rounded-lg  ">
            <div className="flex items-center gap-1 font-bold text-2xl whitespace-nowrap overflow-hidden text-ellipsis">
              <Avatar className="mr-2 select-none">
                <AvatarImage src={contact?.avatar_url} alt="@shadcn" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <p className="select-none">
                {contact?.fields?.["first name"]?.map(
                  (value: any) => value.value
                )}
              </p>
              <p className="select-none">
                {contact?.fields?.["last name"]?.map(
                  (value: any) => value.value
                )}
              </p>
            </div>
            <p className="text-lg text-neutral-400">
              {contact?.fields?.email?.map((value: any) => value.value)}
            </p>
            <div className="flex items-center select-none justify-between">
              <div className="flex flex-wrap">
                {contact?.tags?.map((tag: any) => (
                  <span
                    key={tag.id}
                    className="bg-neutral-200 rounded-md p-1 m-1"
                  >
                    {tag.tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
          <div className="grid w-full mt-4 items-center gap-1.5 mb-8">
            <Label htmlFor="lastName" className="text-neutral-400">
              Add tag
            </Label>
            <div className="flex gap-8">
              <Input
                type="text"
                id="lastName"
                placeholder="tag"
                value={tag}
                onChange={(e) => setTag(e.target.value)}
              />
              <button
                className="bg-black text-white rounded-md w-full"
                onClick={() => handleAddTag()}
              >
                Add tag
              </button>
            </div>
          </div>
          <Link to={`/Nimble-tz`} className="w-full">
            <button className="bg-black text-white p-2 rounded-md w-full">
              back
            </button>
          </Link>
        </div>
      )}
      <Toaster position="bottom-right" reverseOrder={false} />
    </div>
  );
}
