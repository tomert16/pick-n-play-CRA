import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const logIn = createAsyncThunk(
    'players/logIn',
    async({ email, password }) => {
        const reqBody = {email, password};
        const req = await axios.post('/login', reqBody);
        return req.data;
    }
);

export const logOut = createAsyncThunk(
    'players/logOut',
    async() => {
        const req = await axios.delete('/logout');
        return req.data;
    }
)

const playersSlice = createSlice(
    {
        name: 'players',
        initialState: {
            data: [],
            player: undefined
        },
        extraReducers: (builder) => {
            builder
                .addCase(logIn.fulfilled, (state, action) => {
                    state.player = action.payload;
                })
                .addCase(logOut.fulfilled, (state, action) => {
                    state.player = null;
                })
        }
    }
);

export const selectLoggedInPlayer = (state) => state.players.player;

export default playersSlice.reducer;