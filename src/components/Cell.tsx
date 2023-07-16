import React, { useContext } from "react";
import { useDispatch } from "react-redux";
import { DEFAULT_GAME_SETTINGS } from '../constants.ts';

import { updatePlayground, checkVictory } from "../store/cellSlice.ts";
import { switchCurrentPlayer } from "../store/playerSlice.ts";
import { GameContext } from "../App.tsx";

interface CellProps {
    index: string,
    name: string
}

export function Cell(CellProps: CellProps) {

    const {
        rival, currentPlayer, game, isPlayerX
    } = useContext(GameContext)    

    const dispatch = useDispatch();

    const handleClick = (e) => {

        if (!game) return;

        if (CellProps.name !== DEFAULT_GAME_SETTINGS.startSymbol) return;

        if (rival === 'bot' && !isPlayerX()) return;

        
        const chosenCellId = +e.target.id;

        dispatch(updatePlayground({chosenCellId, currentPlayer}));
        
        dispatch(checkVictory({currentPlayer}))

        dispatch(switchCurrentPlayer());
    }

    return (<button onClick={e => handleClick(e)} id={CellProps.index} name={CellProps.name}>{CellProps.name}</button>);

}