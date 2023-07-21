import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllFields = createAsyncThunk(
    'fetchAllFields',
    async() => {
        const req = await axios.get('/fields');
        return req.data;
    }
)

export const fetchFieldById = createAsyncThunk(
    'fetchFieldById',
    async(id) => {
        const req = await axios.get(`/fields/${id}`);
        return req.data;
    }
)

const fieldsSlice = createSlice(
    {
        name: 'fields',
        initialState: {
            list: [],
            byId: undefined
        },
        extraReducers: (builder) => {
            builder
                .addCase(fetchAllFields.fulfilled, (state, action) => {
                    state.list = action.payload;
                })
                .addCase(fetchFieldById.fulfilled, (state, action) => {
                    state.byId = action.payload;
                })
        }
    }
);

export const selectAllFields = (state) => state.fields.list;
export const selectFieldById = (state) => state.fields.byId;
export default fieldsSlice.reducer;