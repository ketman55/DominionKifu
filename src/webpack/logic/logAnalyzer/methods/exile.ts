import pluralize from 'pluralize';
import { initialCardCounts } from "../../../enum/initialCardCounts";
import { Player } from "../../../model/Player";
import { Supply } from "../../../model/Supply";

export function exiles(
    playerMap: Map<string, Player>,
    playerName: string,
    cards: Array<{ name: string, quantity: number }>,
    prevLogArray: string[],
    supply: Supply): void {

    // プレイヤーを特定
    const player = playerMap.get(playerName);
    if (!player) {
        console.warn(`Player ${playerName} not found in exiles method.`);
        return;
    }

    for (const card of cards) {
        let singularCardName = '';
        try {
            singularCardName = pluralize.singular(card.name); // 複数形を単数形に変換
        } catch (e) {
            console.log(e);
            singularCardName = card.name; // Use the original name if singularization fails
        }

        // cardNameがinitialCardCountsに含まれる場合は更新
        if (singularCardName in initialCardCounts) {
            player.addToExiles(singularCardName, card.quantity);
            player.addToTurnExiles(singularCardName, card.quantity);
            player.addToTotalExiles(singularCardName, card.quantity);

            // サプライからカードを追放した場合はサプライの枚数を減らす
            // Check conditions based on prevLogArray (unchanged logic from original)
            if (prevLogArray.slice(-1).join(" ") == "Invest." ||
                prevLogArray.slice(-3).join(" ") == "gains a Gold." ||
                prevLogArray.slice(-1).join(" ") == "Transport." ||
                prevLogArray.slice(-2).join(" ") == "Camel Train." ||
                prevLogArray.slice(-2).join(" ") == "gets +$2." ||
                prevLogArray.slice(-4).join(" ") == "Way of the Camel." ||
                prevLogArray.slice(-4).join(" ") == "Way of the Worm."
            ) {
                supply.decreaseCardCount(singularCardName, card.quantity);
            } else {
                // 自分のデッキからカードを追放した場合はデッキの枚数を減らす
                player.decreaseFromNowInDeck(singularCardName, card.quantity);
            }
        } else {
            console.warn(`Card ${singularCardName} (original: ${card.name}) not found in initialCardCounts during exiles.`);
        }
    }
}

export function discardFromExile(
    playerMap: Map<string, Player>,
    playerName: string,
    cards: Array<{ name: string, quantity: number }>): void {

    // プレイヤーを特定
    const player = playerMap.get(playerName);
    if (!player) {
        console.warn(`Player ${playerName} not found in discardFromExile method.`);
        return;
    }

    // 例: k discards a Laboratory from Exile.
    // 例: k discards 3 Stockpiles from Exile. (追放から捨て札にする場合は必ずすべてのカードを捨て札にする)
    for (const card of cards) {
        let singularCardName = '';
        try {
            singularCardName = pluralize.singular(card.name); // 複数形を単数形に変換
        } catch (e) {
            console.log(e);
            singularCardName = card.name; // Use the original name if singularization fails
        }

        // cardNameがinitialCardCountsに含まれる場合は更新
        if (singularCardName in initialCardCounts) {
            // 追放エリアのカードを捨て札にする
            // The method player.discardFromExile is expected to handle "all cards of this type" logic
            // based on the original comment: "追放から捨て札にする場合は必ずすべてのカードを捨て札にする"
            player.discardFromExile(singularCardName);
        } else {
            console.warn(`Card ${singularCardName} (original: ${card.name}) not found in initialCardCounts during discardFromExile.`);
        }
    }
}