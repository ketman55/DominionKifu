import pluralize from 'pluralize';
import { initialCardCounts } from "../../../enum/initialCardCounts";
import { Player } from "../../../model/Player";
import { Supply } from "../../../model/Supply";

export function trashes(
    playerMap: Map<string, Player>,
    playerName: string,
    cards: Array<{ name: string, quantity: number }>,
    supply: Supply): void {

    // プレイヤーを特定
    const player = playerMap.get(playerName);
    if (!player) {
        console.warn(`Player ${playerName} not found in trashes method.`);
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
            // トラッシュエリアは増やす
            supply.addToTrash(singularCardName, card.quantity);

            // プレイヤーの手札を減らす
            // This assumes cards trashed are from the player's possession (deck/hand/discard)
            player.decreaseFromNowInDeck(singularCardName, card.quantity);
        } else {
            console.warn(`Card ${singularCardName} (original: ${card.name}) not found in initialCardCounts during trashes.`);
        }
    }
}