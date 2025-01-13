import pluralize from 'pluralize';
import { Player } from "../../../model/Player"

export function starts(
    playerMap: Map<string, Player>,
    firstPlayer : Player,
    secondPlayer : Player,
    logArray: string[]
): void {

    // 想定文：k starts with 7 Coppers.
    const playerName = logArray[0];
    const cardNum: number = parseInt(logArray[3], 10);

    let cardName = logArray[4];
    try {
        cardName = pluralize.singular(cardName);　// 複数形を単数形に変換
    } catch (e) {
        console.log(e);
    }
    
    // プレイヤー名が未登録の場合はプレイヤー名を設定する
    if (firstPlayer.isPlayerNameEmpty()) {
        firstPlayer.setPlayerName(playerName);
        playerMap.set(firstPlayer.getPlayerName(), firstPlayer);

    } else if (
        !playerMap.has(playerName) 
        && secondPlayer.isPlayerNameEmpty()) {
        secondPlayer.setPlayerName(playerName);
        playerMap.set(secondPlayer.getPlayerName(), secondPlayer);
    }

    // 配られたカードを設定する
    const player = playerMap.get(playerName);
    if (player) {
        player.addToDeck(cardName, cardNum);
    }
}
