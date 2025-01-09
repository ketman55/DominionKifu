/**
 * カンマ区切りのゲームサプライを入力として
 * 初期のサプライ情報（カード名と枚数）をクラスに追加する
 * 
 * 入力値例：Artisan, Chapel, Council Room, Festival, Gardens, Laboratory, No Colonies, No Shelters, Poacher, Remodel, Throne Room, Vassal
 * 
 * @param gameSupply 
 * @returns void
 */

import { Kingdom } from "../../webpack/model/Kingdom";
import { initialCardCounts } from "../../webpack/enum/initialCardCounts";

export function loadGameSupply(gameSupply: string, kingdomCards: Kingdom): void {
    // カンマ区切りの文字列を配列に変換、空白を削除
    const gameSupplyList = gameSupply.split(',').map(cardName => cardName.replace(/\s+/g, ''));

    // 王国カードの初期設定
    gameSupplyList.forEach(cardName => {
        let count = initialCardCounts[cardName];
        if(count !== undefined) {
            kingdomCards.addCard(cardName, count);
        }
    });
}