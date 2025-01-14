import { initialCardCounts } from "../../../enum/initialCardCounts";
import { Player } from "../../../model/Player";
import { Supply } from "../../../model/Supply";
import pluralize from 'pluralize';

export function gains(
    supply: Supply,
    playerMap: Map<string, Player>,
    logArray: string[],
    prevLogArray: string[]): void {

    // プレイヤーを特定
    const playerName = logArray[0];
    const player = playerMap.get(playerName);
    if (!player) {
        return;
    }

    // 例：k topdecks a Province.
    let count = 0;
    let cardName = '';
    logArray.forEach((text, index) => {

        if (!isNaN(Number(text))) {
            // textが数字だった場合はcountに代入
            count = Number(text);
        } else if (text === 'a' || text === 'an') {
            // aかanだった場合はcountに1を代入
            count = 1;
        } else {
            try {
                cardName = pluralize.singular(text);　// 複数形を単数形に変換
            } catch (e) {
                console.log(e);
                cardName = text; // ライブラリが受け付けない入力の場合はそのままの値を使う
            }

            // cardNameがinitialCardCountsに含まれる場合は更新
            if (cardName in initialCardCounts) {
                // 山札は減らす
                supply.decreaseCardCount(cardName, count);

                if (prevLogArray[1] === 'plays'
                    && prevLogArray[3] === 'Artisan') {
                    // gainsをplays an Artisanの後に行った場合は、手札に加える
                    player.addToHand(cardName, count);
                } else {
                    // プレイヤーの捨て札を増やす
                    player.addToDiscard(cardName, count);
                }
            }
        }
    });
}
