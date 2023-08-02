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
    'sports/fetchSportById',
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
            isLoading: false
        },
        extraReducers: (builder) => {
            builder
                .addCase(fetchAllSports.fulfilled, (state, action) => {
                    state.list = action.payload;
                })
                .addCase(fetchSportById.pending, (state, action) => {
                    state.isLoading = true;
                })
                .addCase(fetchSportById.fulfilled, (state, action) => {
                    state.isLoading = false;
                    state.byId = action.payload;
                })
        }
    }
);

export const selectAllSports = (state) => state.sports.list;
export const selectSportById = (state) => state.sports.byId;
export const isLoadingData = (state) => state.sports.isLoading;
export default sportsSlice.reducer;