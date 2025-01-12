/**
 * カンマ区切りのゲームサプライを入力として
 * 初期のサプライ情報（カード名と枚数）をクラスに追加する
 * 
 * 入力値例：Artisan, Chapel, Council Room, Festival, Gardens, Laboratory, No Colonies, No Shelters, Poacher, Remodel, Throne Room, Vassal
 * 
 * @param gameSupply 
 * @returns void
 */

import { Supply } from "../model/Supply";
import { initialCardCounts } from "../../webpack/enum/initialCardCounts";

export function loadGameSupply(supply: Supply, gameSupply: string): void {
    // カンマ区切りの文字列を配列に変換、空白を削除
    const gameSupplyList = gameSupply.split(',').map(cardName => cardName.replace(/\s+/g, ''));

    // 基本カードの初期設定
    // 植民地、ポーションは未実装
    supply.addCardToBasic('Copper', 46);
    supply.addCardToBasic('Silver', 40);
    supply.addCardToBasic('Gold', 30);
    supply.addCardToBasic('Estate', 8);
    supply.addCardToBasic('Duchy', 8);
    supply.addCardToBasic('Province', 8);

    // 王国カードの初期設定
    gameSupplyList.forEach(cardName => {
        let count = initialCardCounts[cardName];
        if(count !== undefined) {
            supply.addCardToKingdom(cardName, count);
        }
    });
}