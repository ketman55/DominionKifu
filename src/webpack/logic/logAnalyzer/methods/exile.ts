import pluralize from 'pluralize';
import { initialCardCounts } from "../../../enum/initialCardCounts";
import { Player } from "../../../model/Player";
import { Supply } from "../../../model/Supply";

export function exiles(
    playerMap: Map<string, Player>,
    logArray: string[],
    prevLogArray: string[],
    supply: Supply): void {

    // プレイヤーを特定
    const playerName = logArray[0];
    const player = playerMap.get(playerName);
    if (!player) {
        return;
    }

    // 例: k plays a Displace. k exiles a Camel Train.
    // 例: k buys Invest. k exiles a Laboratory. (投資でサプライのカードを追放)
    // 例: k plays a Camel Train. k exiles a Laboratory.  (ラクダの隊列でサプライのカードを追放)
    // 例: k plays a Bounty Hunter. k gets +1 Action. k exiles a Copper.  (賞金稼ぎで手札のカードを追放)
    // 例: k plays a Sanctuary. k draws a Laboratory. k gets +1 Action. k gets +1 Buy. k exiles a Copper. 
    //     (聖域で手札のカードを追放)
    let count = 0;
    let cardName = '';
    logArray.forEach((text, index) => {

        if (!isNaN(Number(text))) {
            // textが数字だった場合はcountに代入
            count = Number(text);
        } else if(text === 'a' || text === 'an') {
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
                // 追放札にカードを追加
                player.addToExiles(cardName, count);
                player.addToTurnExiles(cardName, count);
                player.addToTotalExiles(cardName, count);

                // サプライからカードを追放した場合はサプライの枚数を減らす
                // 自分の知る限り、サプライからカードを追放するカードは直前の文章を読んで判別可能
                // 投資、放逐、包領、輸送、ラクダの隊列、魔女の集会、ラクダの習性、ミミズの修正
                if (prevLogArray.includes("Invest") ||
                    prevLogArray.includes("Banish") ||
                    prevLogArray.includes("Enclave") ||
                    prevLogArray.includes("Transport") ||
                    prevLogArray.slice(-2).join(" ") == "Camel Train" || 
                    prevLogArray.slice(-1).join(" ") == "Coven" || 
                    prevLogArray.slice(-4).join(" ") == "Way of the Camel" || 
                    prevLogArray.slice(-4).join(" ") == "Way of the Worm"
                ){
                    supply.decreaseCardCount(cardName, count);
                } else {
                    // 自分のデッキからカードを追放した場合はデッキの枚数を減らす
                    // 上記以外の追放は全て自分のカードを追放する(はず)
                    player.decreaseFromNowInDeck(cardName, count);
                }
            }
        }
    });
}

export function discardFromExile(
    playerMap: Map<string, Player>,
    logArray: string[]): void {
    
    // プレイヤーを特定
    const playerName = logArray[0];
    const player = playerMap.get(playerName);
    if (!player) {
        return;
    }

    // 例: k discards a Laboratory from Exile.
    // 例: k discards 3 Stockpiles from Exile. (追放から捨て札にする場合は必ずすべてのカードを捨て札にする)
    let count = 0;
    let cardName = '';
    logArray.forEach((text, index) => {

        if (!isNaN(Number(text))) {
            // textが数字だった場合はcountに代入
            count = Number(text);
        } else if(text === 'a' || text === 'an') {
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
                // トラッシュエリアは増やす
                player.removeFromExile(cardName);
            }
        }
    });
}