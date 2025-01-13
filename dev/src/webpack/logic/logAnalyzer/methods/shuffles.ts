import { Player } from "../../../model/Player";
import { cleanUp } from "./cleanUp";

export function shuffles(
    playerMap: Map<string, Player>,
    logArray: string[],
    next2LogArray: string[]): void {

    // プレイヤーを特定
    const playerName = logArray[0];
    const player = playerMap.get(playerName);
    if (player) {

        if (next2LogArray[0] === 'Turn') {
            // 例:手札とプレイエリアを含めてリシャッフルする
            // k shuffles their deck.
            // k draws 2 Coppers, 2 Estates, and a Trader.
            // Turn 2 - Lord Rattington
            cleanUp(playerMap, logArray);
            player.moveAllDiscardToDeck();
            
        } else {
            // 例：手札とプレイエリアは含めずにリシャッフルする
            // k shuffles their deck.
            // k draws 2 Coppers, 2 Estates, and a Trader.
            // k plays a Copper, 2 Silvers, and a Gold. (+$8)
            player.moveAllDiscardToDeck();

        }
    }
}
