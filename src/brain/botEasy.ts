import { updatePlayground, checkVictory } from "../store/cellSlice.ts";
import { switchCurrentPlayer } from "../store/playerSlice.ts";

export function botIsThinking(emptyCellsIds, dispatch) {

    // setTimeout is just for thinking imitation
    setTimeout(() => {

        // easy mod, bot doesn't analyze yet, just picks a random cell
        const chosenCellId = Math.floor(Math.random() * emptyCellsIds.length);

        dispatch(updatePlayground({chosenCellId: emptyCellsIds[chosenCellId], currentPlayer: 'O'}));

        dispatch(checkVictory({currentPlayer: 'O'}));

        dispatch(switchCurrentPlayer());

    }, 150)
}
