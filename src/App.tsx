import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux";

import { DEFAULT_GAME_SETTINGS } from './constants.ts';

import { Playground } from './components/Playground.tsx';
import { Setting } from './components/Setting.tsx';
import { Infobox } from './components/Infobox.tsx';
import { botIsThinking } from "./brain/botEasy.ts";
import { IGameContext } from "./models.ts"
import { clearPlayground } from "./store/cellSlice.ts";
import { initPlayers } from "./store/playerSlice.ts";


export const GameContext = React.createContext<IGameContext>({}); 

function App() {

    const currentPlayer = useSelector(state => state.players.currentPlayer);
    const prevPlayer = useSelector(state => state.players.prevPlayer);
    const winner = useSelector(state => state.playground.winner);
    const emptyCellsIds = useSelector(state => state.playground.remainingEmptyCellsIds);

    const [rival, setRival] = useState(DEFAULT_GAME_SETTINGS.rival);
    const [game, setGame] = useState(false);  

    const isPlayerX = () => { return currentPlayer === 'X' }
    
    const startGame = (rival: string) => {
        dispatch(initPlayers());

        setRival(rival);
        setGame(true);
    } 

    const resetCurrentGame = () => {
        setGame(false);
        dispatch(clearPlayground());
    }

    const context: IGameContext = {
        rival,
        currentPlayer,
        isPlayerX,
        startGame, 
        game
    }   

    const dispatch = useDispatch();

    useEffect(() => {
        if (game && !emptyCellsIds.length) {
            alert("Ooops, we have no winner"); 

            resetCurrentGame();
        }

        if (rival === 'bot' && currentPlayer === 'O' && !winner) {
            botIsThinking(emptyCellsIds, dispatch);
        }
    }, [ currentPlayer ])

    useEffect(() => {

        // todo: fix to currentPlayer check
        if (winner) alert(prevPlayer + " won!"); 
            
        resetCurrentGame();

    }, [ winner ])

    return (
        <div className="container">
            <GameContext.Provider value={context}>
            {game 
                ? <>
                    <Infobox />
                    <h1>Current player: {context.currentPlayer}</h1> 
                    <Playground />
                </> 
                : <Setting />
                }
            </GameContext.Provider>
        </div>
    );
}

export default App;