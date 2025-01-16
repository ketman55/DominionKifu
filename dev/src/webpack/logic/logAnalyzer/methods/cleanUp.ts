import { Player } from "../../../model/Player"

export function cleanUp(
    playerMap: Map<string, Player>,
    logArray: string[]
): void {

    const playerName = logArray[0];
    let player = playerMap.get(playerName);

    if (player) {
        player.resetTurnPlays();
        player.resetTurnDraws();
    }
}
