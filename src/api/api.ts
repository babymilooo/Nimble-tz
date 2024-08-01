import { $api } from "./axios";
import { contactSlice } from "../store/reducers/ContactSlice";
import { AppDispatch } from "../store/store";
export const fetchContacts = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(contactSlice.actions.fetchContactsRequest());
    const response = await $api.get("/contacts");
    dispatch(
      contactSlice.actions.fetchContactsSuccess(response.data.resources)
    );

    if (response.status !== 200) {
      throw new Error("Network response was not ok " + response.statusText);
    }

    const data = response.data;
    console.log(data.resources);
    return data.resources;
  } catch (e) {
    if (e instanceof Error) {
      dispatch(contactSlice.actions.fetchContactsFailure(e.message));
      console.error("Error fetching data:", e.message);
    } else {
      dispatch(contactSlice.actions.fetchContactsFailure("Unknown error"));
      console.error("Error fetching data:", e);
    }
  }
};

export const createContact =
  async (contact: any) => async (dispatch: AppDispatch) => {
    try {
      dispatch(contactSlice.actions.createContactRequest());
      const response = await $api.post("/contact", contact);
      dispatch(contactSlice.actions.createContactSuccess(response.data));
      if (response.status !== 201) {
        throw new Error("Network response was not ok " + response.statusText);
      }

      const data = response.data;
      console.log(data);
      return data;
    } catch (error) {
      if (error instanceof Error) {
        dispatch(contactSlice.actions.createContactFailure(error.message));
      } else {
        dispatch(contactSlice.actions.createContactFailure("Unknown error"));
        console.error("Error creating contact:", error);
      }
    }
  };

export const deleteContact =
  async (id: string) => async (dispatch: AppDispatch) => {
    try {
      dispatch(contactSlice.actions.deleteContactRequest());
      const response = await $api.delete(`/contact/${id}`);
      dispatch(contactSlice.actions.deleteContactSuccess(id));
      console.log("Contact deleted:", id);
    } catch (error) {
      if (error instanceof Error) {
        dispatch(contactSlice.actions.deleteContactFailure(error.message));
      } else {
        dispatch(contactSlice.actions.deleteContactFailure("Unknown error"));
        console.error("Error deleting contact:", error);
      }
    }
  };
