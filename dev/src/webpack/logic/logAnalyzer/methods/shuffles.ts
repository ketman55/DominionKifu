import { Player } from "../../../model/Player";

export function shuffles(
    playerMap: Map<string, Player>,
    logArray: string[]): void {

    // 例：k shuffles their deck.

    // プレイヤーを特定
    const playerName = logArray[0];
    const player = playerMap.get(playerName);

    if (player) {
        // 捨て札を山札へ移動させる
        player.moveAllDiscardToDeck();
    }
}
