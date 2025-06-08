import pluralize from 'pluralize';
import { Player } from "../../../model/Player";
import { Supply } from "../../../model/Supply";
import { initialCardCounts } from '../../../enum/initialCardCounts';

export function returns(
    playerMap: Map<string, Player>,
    playerName: string,
    cards: Array<{ name: string, quantity: number }>,
    supply: Supply): void {

    // プレイヤーを特定
    const player = playerMap.get(playerName);
    if (!player) {
        console.warn(`Player ${playerName} not found in return method.`);
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
            // プレイヤーのデッキからカードを削除
            player.decreaseFromNowInDeck(singularCardName, card.quantity);
            
            // サプライにカードを戻す
            supply.increaseCardCount(singularCardName, card.quantity);
        } else {
            console.warn(`Card ${singularCardName} (original: ${card.name}) not found in initialCardCounts during return.`);
        }
    }
}