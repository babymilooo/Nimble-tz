import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IContact } from "../../models/IContact"

interface ContactState {
    contacts: IContact[];
    isLoading: boolean;
    error: string | null;
}

const initialState: ContactState = {
    contacts: [],
    isLoading: false,
    error: '',
}

export const contactSlice = createSlice({
    name: 'contact',
    initialState,
    reducers: {
        fetchContactsRequest: (state) => {
            state.isLoading = true;
        },
        fetchContactsSuccess: (state, action: PayloadAction<IContact[]>) => {
            state.contacts = action.payload;
            state.isLoading = false;
            state.error = '';
        },
        fetchContactsFailure: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        createContactRequest: (state) => {
            state.isLoading = true;
        },
        createContactSuccess: (state, action) => {
            state.contacts.push(action.payload);
            state.isLoading = false;
        },
        createContactFailure: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        },
        deleteContactRequest: (state) => {
            state.isLoading = true;
        },
        deleteContactSuccess: (state, action) => {
            state.contacts = state.contacts.filter((contact) => contact.id !== action.payload);
            state.isLoading = false;
        },
        deleteContactFailure: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }


})

export default contactSlice.reducer