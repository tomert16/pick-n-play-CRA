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

export const stayLoggedIn = createAsyncThunk(
    'players/stayLoggedIn',
    async() => {
        const req = await axios.get('/me');
        return req.data;
    }
);

export const logOut = createAsyncThunk(
    'players/logOut',
    async() => {
        const req = await axios.delete('/logout');
        return req.data;
    }
);

export const createNewPlayer = createAsyncThunk(
    'players/createNewUser',
    async({ first_name, last_name, email, password, password_confirmation }) => {
        const reqBody = { first_name, last_name, email, password, password_confirmation };
        const req = await axios.post('/signup', reqBody);
        return req.data;
    }
);
// make a post first to set location
export const updateLocation = createAsyncThunk(
    'players/setLocation',
    async({ location, id }) => {
        const reqBody = { location };
        const req = await axios.patch(`/players/${id}`, reqBody);
        return req.data;
    }
)

const playersSlice = createSlice(
    {
        name: 'players',
        initialState: {
            data: [],
            player: undefined,
        },
        extraReducers: (builder) => {
            builder
                .addCase(logIn.fulfilled, (state, action) => {
                    state.player = action.payload;
                })
                .addCase(logIn.rejected, (action) => {
                    console.log("Unable to login:", action.error.message);
                })
                .addCase(stayLoggedIn.fulfilled, (state, action) => {
                    state.player = action.payload;
                })
                .addCase(stayLoggedIn.rejected, (state, action) => {
                    console.log('Error:', action.error.message);
                })
                .addCase(logOut.fulfilled, (state, action) => {
                    state.player = null;
                })
                .addCase(createNewPlayer.fulfilled, (state, action) => {
                    state.data.push(action.payload);
                    state.player = action.payload;
                })
                .addCase(updateLocation.fulfilled, (state, action) => {
                    state.player.location = action.payload;
                })
        }
    }
);

export const selectLoggedInPlayer = (state) => state.players.player;
// export const selectCreateNewPlayer = (state) => state.players.data;

export default playersSlice.reducer;