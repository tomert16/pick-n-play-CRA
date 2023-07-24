import { configureStore } from '@reduxjs/toolkit'
import sportsReducer from '../redux/sports/sportsSlice'
import locationsReducer from '../redux/locations/locationsSlice'
import fieldsReducer from '../redux/fields/fieldsSlice';
import meetUpsReducer from '../redux/meetUps/meetUpsSlice';


export const store = configureStore({
    reducer: {
        sports: sportsReducer,
        fields: fieldsReducer,
        locations: locationsReducer,
        meetUps: meetUpsReducer
    }
})