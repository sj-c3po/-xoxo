import React, { useContext } from "react";
import { GameContext } from "../App.tsx";

export function Infobox() {

    const context = useContext(GameContext)

    return (
        <div className="infobox">
            Rival: {context.rival} 
        </div>
    )
}