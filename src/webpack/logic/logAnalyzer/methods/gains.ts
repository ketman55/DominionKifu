import { initialCardCounts } from "../../../enum/initialCardCounts";
import { Player } from "../../../model/Player";
import { Supply } from "../../../model/Supply";
import pluralize from 'pluralize';

export function gains(
    supply: Supply,
    playerMap: Map<string, Player>,
    playerName: string,
    cards: Array<{ name: string, quantity: number }>,
    prevLogArray: string[]): void { // prevLogArray is kept for signature consistency, though not used in this simplified version

    // プレイヤーを特定
    const player = playerMap.get(playerName);
    if (!player) {
        console.warn(`Player ${playerName} not found in gains method.`);
        return;
    }

    // Process the provided cards array
    for (const card of cards) {
        let singularCardName = '';
        try {
            singularCardName = pluralize.singular(card.name); // 複数形を単数形に変換
        } catch (e) {
            console.log(e); // Log the error if pluralize fails
            singularCardName = card.name; // Use the original name if singularization fails
        }

        // cardNameがinitialCardCountsに含まれる場合は更新
        if (singularCardName in initialCardCounts) {
            // 山札は減らす
            // This assumes "gains" always means from the supply.
            // If cards can be gained from other places without affecting supply (e.g. opponent's hand), this needs more logic.
            supply.decreaseCardCount(singularCardName, card.quantity);

            // プレイヤーを増やす
            player.addToTotalGains(singularCardName, card.quantity);
            player.addToNowInDeck(singularCardName, card.quantity);
        } else {
            console.warn(`Card ${singularCardName} (original: ${card.name}) not found in initialCardCounts during gains.`);
        }
    }
}
