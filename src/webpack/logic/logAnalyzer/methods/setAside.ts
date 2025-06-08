import { Player } from "../../../model/Player";

export function setAside(
    playerMap: Map<string, Player>,
    playerName: string,
    cards: Array<{name: string, quantity: number}>,
    logSection: string
): void {
    const player = playerMap.get(playerName);
    if (!player) {
        console.error(`Player ${playerName} not found.`);
        return;
    }

    // "sets X aside with Y" パターンの解析
    const setAsideMatch = logSection.match(/sets (.+) aside with (.+)/);
    if (setAsideMatch) {
        const cardToSetAside = setAsideMatch[1];
        const sourceCard = setAsideMatch[2];

        // カード名から数量を抽出（"an Ironmonger" -> "Ironmonger", 1）
        const cardInfo = parseCardFromText(cardToSetAside);
        if (cardInfo) {
            player.addToSetAside(cardInfo.name, cardInfo.quantity);
        }
    }
}

export function putInHand(
    playerMap: Map<string, Player>,
    playerName: string,
    cards: Array<{name: string, quantity: number}>,
    logSection: string
): void {
    const player = playerMap.get(playerName);
    if (!player) {
        console.error(`Player ${playerName} not found.`);
        return;
    }

    // "puts X in hand (Y)" パターンの解析
    const putInHandMatch = logSection.match(/puts (.+) in hand \((.+)\)/);
    if (putInHandMatch) {
        const cardToPutInHand = putInHandMatch[1];
        const sourceCard = putInHandMatch[2];

        // カード名から数量を抽出
        const cardInfo = parseCardFromText(cardToPutInHand);
        if (cardInfo) {
            player.moveFromSetAsideToHand(cardInfo.name, cardInfo.quantity);
        }
    }
}

function parseCardFromText(text: string): {name: string, quantity: number} | null {
    // "an Ironmonger" -> {name: "Ironmonger", quantity: 1}
    // "2 Estates" -> {name: "Estate", quantity: 2}
    
    const quantityMatch = text.match(/^(\d+)\s+(.+)/);
    if (quantityMatch) {
        const quantity = parseInt(quantityMatch[1]);
        const cardName = quantityMatch[2].replace(/s$/, ''); // 複数形を単数形に変換
        return {name: cardName, quantity};
    }

    const articleMatch = text.match(/^(a|an)\s+(.+)/i);
    if (articleMatch) {
        const cardName = articleMatch[2];
        return {name: cardName, quantity: 1};
    }

    // 記事なしの場合は1枚として扱う
    return {name: text, quantity: 1};
}