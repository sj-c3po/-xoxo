import React, { useState, useContext } from "react";
import { GameContext } from "../App.tsx";

export function Setting() {

    const context = useContext(GameContext);

    const [rival, setRival] = useState(context.rival);

    return (
        <div className="settings">
            
            <div>
                Choose a rival: 
    
                <input type="radio" name="rival" value="bot" 
                    checked={rival === 'bot'} 
                    onChange={() => setRival('bot')}
                /> 
                Bot
                <input type="radio" name="rival" value="player" 
                    checked={rival === 'player'} 
                    onChange={() => setRival('player')}
                /> 
                Player
            </div>

            <button onClick={() => context.startGame(rival)}>Go!</button>

        </div>
    );

}
