import pluralize from 'pluralize';
import { initialCardCounts } from "../../../enum/initialCardCounts";
import { Player } from "../../../model/Player";

export function draws(
    playerMap: Map<string, Player>,
    logArray: string[]): void {

    // プレイヤーを特定
    const playerName = logArray[0];
    const player = playerMap.get(playerName);
    if (!player) {
        return;
    }

    // 例：k draws 3 Coppers and 2 Estates.
    let count = 0;
    let cardName = '';
    logArray.forEach((text, index) => {

        // textが数字だった場合はcountに代入
        if (!isNaN(Number(text))) {
            count = Number(text);
        } else {
            try {
                cardName = pluralize.singular(text);　// 複数形を単数形に変換
            } catch (e) {
                console.log(e);
                cardName = text; // ライブラリが受け付けない入力の場合はそのままの値を使う
            }

            // cardNameがinitialCardCountsに含まれる場合は更新
            if (cardName in initialCardCounts) {
                // 手札は増やす
                player.addToHand(cardName, count);

                // デッキは減らす
                player.decreaseFromDeck(cardName, count);
            }
        }
    });
}