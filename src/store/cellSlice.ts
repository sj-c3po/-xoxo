import { DEFAULT_GAME_SETTINGS, WINNING_COMBINATIONS } from '../constants.ts';
import { createSlice } from "@reduxjs/toolkit";

const cellSlice = createSlice({
    name: 'cells',
    initialState: {
        cells: [],
        cellsFilledByX: [],
        cellsFilledByO: [],
        remainingEmptyCellsIds: [],
        winner: ''
    },
    reducers: {
        initPlayground(state) {
            for (let i = 0; i < DEFAULT_GAME_SETTINGS.playgroundSize; i++) {
                state.cells.push({
                    id: i,
                    cellValue: DEFAULT_GAME_SETTINGS.startSymbol
                });
                state.remainingEmptyCellsIds.push(i);
            } 
        },
        updatePlayground(state, action) {
            const chosenCellId = +action.payload.chosenCellId;

            state.cells.map(cell => {
                if (cell.id === chosenCellId) {
                    return cell.cellValue = action.payload.currentPlayer;
                }
            });

            action.payload.currentPlayer === DEFAULT_GAME_SETTINGS.X ?
                state.cellsFilledByX.push(chosenCellId) :
                state.cellsFilledByO.push(chosenCellId);

            state.remainingEmptyCellsIds = state.remainingEmptyCellsIds.filter(id => id !== +chosenCellId);            
        },
        clearPlayground(state) {
            state.cells = [];
            state.cellsFilledByX = [];
            state.cellsFilledByO = [];
            state.remainingEmptyCellsIds = [];
            state.winner = '';
        },
        checkVictory(state, action) {
            const checkCells = action.payload.currentPlayer === DEFAULT_GAME_SETTINGS.X ?
                state.cellsFilledByX : state.cellsFilledByO;

            if (checkCells.length > 2 && isVictory(checkCells)) {
                state.winner = action.payload.currentPlayer;
            }

            function isVictory(playerCells) {
                
                let isVictory = false;
                
                // тут sort() подойдет, потому что индексы от 0 до 8 - корректно посчитает
                let allCellsIdsInOneString = playerCells.sort().join('');
            
                WINNING_COMBINATIONS.forEach(combination => {
                    if (allCellsIdsInOneString.indexOf(combination) !== -1) {
                        isVictory = true;
                    } 
                })

                return isVictory;
            }
        }
    }
})

export const { 
    initPlayground, 
    updatePlayground, 
    clearPlayground, 
    checkVictory } = cellSlice.actions;

export default cellSlice.reducer;