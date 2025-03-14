import { Player } from "../../../model/Player"

export function cleanUp(
    firstPlayer: Player,
    secondPlayer: Player
): void {

    const firstPlayerTurn = firstPlayer.getTurn();
    const secondPlayerTurn = secondPlayer.getTurn();

    if(firstPlayerTurn === secondPlayerTurn) {
        // firstPlayerのターンが始まる状態
        secondPlayer.resetTurnPlays();
        secondPlayer.resetTurnDraws();
        secondPlayer.resetTurnExiles();
        firstPlayer.incrementTurn();
    } else if (firstPlayerTurn > secondPlayerTurn) {
        // secondPlayerのターンが始まる状態
        firstPlayer.resetTurnPlays();
        firstPlayer.resetTurnDraws();
        firstPlayer.resetTurnExiles();
        secondPlayer.incrementTurn();
    }
}
