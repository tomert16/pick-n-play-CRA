import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addNewMeetUp = createAsyncThunk(
    'meetUps/createNewMeetUp',
    async({date, field_id, sport_id, player_id}) => {
        const reqBody = { date, field_id, sport_id, player_id };
        const req  = await axios.post('/meet_ups', reqBody);
        return req.data;
    }
);

const meetUpsSlice = createSlice(
    {
        name: "meetUps",
        initialState: {
            list: []
        },
        extraReducers: (builder) =>{
            builder
                .addCase(addNewMeetUp.fulfilled, (state, action) => {
                    state.list.push(action.payload)
                })
        }
    }
);


export default meetUpsSlice.reducer;