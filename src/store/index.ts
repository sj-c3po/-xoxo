import { configureStore } from "@reduxjs/toolkit";
import cellSlice from "./cellSlice.ts";
import playerSlice from "./playerSlice.ts";

export default configureStore({
    reducer: {
        playground: cellSlice,
        players: playerSlice
    }
})