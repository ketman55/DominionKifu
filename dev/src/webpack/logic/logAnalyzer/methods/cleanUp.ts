import pluralize from 'pluralize';
import { Player} from "../../../model/Player"

export function cleanUp(
    playerMap: Map<string, Player>,
    logArray: string[]
): void {

    const playerName = logArray[0];
    let player = playerMap.get(playerName);

        if (player) {
            // プレイヤーの手札を捨て札に移動
            player.moveAllHandToDiscard();

            // PlayAreaを捨て札に移動
            player.moveAllPlayAreaToDiscard();
            
        }
}
