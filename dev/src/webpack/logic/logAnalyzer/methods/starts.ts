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
        console.log(e); // ライブラリが受け付けない入力の場合はそのままの値を使う
    }
    
    
    if (firstPlayer.isPlayerNameEmpty()) {
        // プレイヤー名が未登録の場合はプレイヤー名を設定する
        firstPlayer.setPlayerName(playerName);
        playerMap.set(firstPlayer.getPlayerName(), firstPlayer);

    } else if (
        // プレイヤー名が未登録の場合はプレイヤー名を設定する
        !playerMap.has(playerName) 
        && secondPlayer.isPlayerNameEmpty()) {
        secondPlayer.setPlayerName(playerName);
        playerMap.set(secondPlayer.getPlayerName(), secondPlayer);
    } else {
        // 既にプレイヤー名が登録されている場合は処理終了
        return;
    }

    // 配られたカードを設定する
    const player = playerMap.get(playerName);
    if (player) {
        player.addToDeck(cardName, cardNum);
    }
}
