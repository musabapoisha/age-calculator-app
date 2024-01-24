import { createSlice } from "@reduxjs/toolkit";

export const dateSlice = createSlice({
  name: "date",
  initialState: { days: "--", months: "--", years: "--" },
  reducers: {
    update: (state, action) => {
      const today = new Date(); //"now"
      const d = action.payload.values.days;
      const m = action.payload.values.months;
      const y = action.payload.values.years;
      const birthday = new Date(`${y}/${m}/${d}`); // birthday date
      const diff = Math.abs(today - birthday);

      const perDay = 1000 * 60 * 60 * 24 * 365.25;
      const yearsReminded = Math.floor(diff / perDay);

      const monthsReminded = Math.trunc((((diff / perDay) % 1) * 365.25) / 30);

      const daysReminded = Math.trunc(
        (((((diff / perDay) % 1) * 365.25) / 30) % 1) * 24
      );
      state.days = daysReminded;
      state.months = monthsReminded;
      state.years = yearsReminded;
    },
  },
});

export const { update } = dateSlice.actions;

export default dateSlice.reducer;
