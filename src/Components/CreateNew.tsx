import React, { useState } from "react";
import { Label } from "./Ui/label";
import { Input } from "./Ui/input";
import toast from "react-hot-toast";
import { createContact } from "../api/api";
import { useAppDispatch } from "../hooks/redux";

export function CreateNew() {
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const dispatch = useAppDispatch();

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
    setName("");
    setLastName("");
    setEmail("");
    toast.success("Contact created");
  };

  return (
    <div className="xl:w-[400px] md:w-[300px]   w-full m-2 border flex flex-col items-center sticky top-2 rounded-lg select-none">
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
            value={name}
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
            value={lastName}
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
            value={email}
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
  );
}
