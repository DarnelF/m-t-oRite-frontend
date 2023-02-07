import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  value: [],
};

export const citiesSlice = createSlice({
  name: "cities",

  initialState,
  reducers: {
    addCityToStore: (state, action) => {
      state.value.push(action.payload);
    },
    removeCityFromStore: (state, action) => {
      state.value = state.value.filter((city) => city.id !== action.payload);
    },
  },
});

export const { addCityToStore, removeCityFromStore } = citiesSlice.actions;
export default citiesSlice.reducer;
