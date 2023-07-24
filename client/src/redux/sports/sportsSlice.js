import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllSports = createAsyncThunk(
    'sports/fetchAllSports',
    async() => {
        const req = await axios.get('/sports');
        return req.data;
    }
)

export const fetchSportById = createAsyncThunk(
    'sport/fetchSportById',
    async(id) => {
        const req = await axios.get(`/sports/${id}`);
        return req.data;
    }
)

export const sportsSlice = createSlice(
    {
        name: 'sports',
        initialState: {
            list: [],
            byId: undefined,
        },
        extraReducers: (builder) => {
            builder
                .addCase(fetchAllSports.fulfilled, (state, action) => {
                    state.list = action.payload;
                })
                .addCase(fetchSportById.fulfilled, (state, action) => {
                    state.byId = action.payload;
                })
        }
    }
);

export const selectAllSports = (state) => state.sports.list;
export const selectSportById = (state) => state.sports.byId;
export default sportsSlice.reducer;