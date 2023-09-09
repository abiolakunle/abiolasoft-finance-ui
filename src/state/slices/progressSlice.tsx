import { createSlice } from "@reduxjs/toolkit";

const progressSlice = createSlice({
    name: "progress",
    initialState: { show: false },
    reducers: {
        showProgress(state) {
            state.show = true;
        },
        hideProgress(state) {
            state.show = false;
        },
    },
});

export const { showProgress, hideProgress } = progressSlice.actions;
export default progressSlice.reducer;
