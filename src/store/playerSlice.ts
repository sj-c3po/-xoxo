import { DEFAULT_GAME_SETTINGS } from '../constants.ts';
import { createSlice } from "@reduxjs/toolkit";

const playerSlice = createSlice({
    name: 'players',
    initialState: {
        currentPlayer: DEFAULT_GAME_SETTINGS.X,
        prevPlayer: DEFAULT_GAME_SETTINGS.O
    },
    reducers: {
        initPlayers(state) {
            state.currentPlayer = DEFAULT_GAME_SETTINGS.X;
            state.prevPlayer = DEFAULT_GAME_SETTINGS.O;
        }, 
        switchCurrentPlayer(state) {
            const prevPlayer = state.prevPlayer;
            const currentPlayer = state.currentPlayer;

            state.currentPlayer = prevPlayer;
            state.prevPlayer = currentPlayer; 
        }
    }
})

export const { initPlayers, switchCurrentPlayer } = playerSlice.actions;

export default playerSlice.reducer;