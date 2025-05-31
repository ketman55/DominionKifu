import pluralize from 'pluralize';
import { initialCardCounts } from "../../../enum/initialCardCounts";
import { Player } from "../../../model/Player";

export function draws(
    playerMap: Map<string, Player>,
    playerName: string,
    cards: Array<{ name: string, quantity: number }>): void {

    // プレイヤーを特定
    const player = playerMap.get(playerName);
    if (!player) {
        console.warn(`Player ${playerName} not found in draws method.`);
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
            player.addToTotalDraws(singularCardName, card.quantity);
            player.addToTurnDraws(singularCardName, card.quantity);
        } else {
            // It's possible to draw cards not in initialCardCounts (e.g., from other expansions/sets not tracked)
            // So, a warning might be too noisy here, but consider if specific game logic requires the card to be known.
            // For now, we'll only act on known cards.
            // console.warn(`Card ${singularCardName} (original: ${card.name}) not found in initialCardCounts during draws.`);
        }
    }
}