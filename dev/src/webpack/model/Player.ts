interface Card {
    count: number;
}

export class Player {
    
    private deck: Map<string, Card> = new Map();
    private hand: Map<string, Card> = new Map();
    private discardArea: Map<string, Card> = new Map();
    private playArea: Map<string, Card> = new Map();
    private playerName: string = '';

    constructor() {
        // デッキに未知を表す「card」を追加
        this.deck.set('card', { count: 0 });
    }
    
    // ディープコピーを返すメソッド
    clone(): Player {
        const player = new Player();
        player.deck = new Map(Array.from(this.deck.entries()).map(([key, card]) => [key, { ...card }]));
        player.hand = new Map(Array.from(this.hand.entries()).map(([key, card]) => [key, { ...card }]));
        player.discardArea = new Map(Array.from(this.discardArea.entries()).map(([key, card]) => [key, { ...card }]));
        player.playArea = new Map(Array.from(this.playArea.entries()).map(([key, card]) => [key, { ...card }]));
        player.playerName = this.playerName;
        return player;
    }

    // デッキのカードを取得するメソッド
    getDeck(): Map<string, Card> {
        return this.deck;
    }

    // デッキにカードを追加するメソッド
    addToDeck(cardName: string, count: number): void {
        const existingCard = this.deck.get(cardName);
        if (existingCard) {
            existingCard.count += count;
        } else {
            this.deck.set(cardName, { count });
        }
    }

    // デッキのカードの枚数を減らすメソッド
    decreaseFromDeck(cardName: string, count: number): void {
        const existingCard = this.deck.get(cardName);
        if (existingCard) {
            existingCard.count -= count;
        }
        // カードの枚数が0以下になった場合は削除
        // ただし未知を表す「card」の場合は削除しない
        if (existingCard 
            && cardName !== 'card'
            && existingCard.count <= 0) {
            this.deck.delete(cardName);
        }
    }

    // 手札のカードを取得するメソッド
    getHand(): Map<string, Card> {
        return this.hand;
    }

    // 手札にカードを追加するメソッド  
    addToHand(cardName: string, count: number): void {
        const existingCard = this.hand.get(cardName);
        if (existingCard) {
            existingCard.count += count;
        } else {
            this.hand.set(cardName, { count });
        }
    }

    // 手札のカードの枚数を減らすメソッド
    decreaseFromHand(cardName: string, count: number): void {
        const existingCard = this.hand.get(cardName);
        if (existingCard) {
            existingCard.count -= count;
        }
        // カードの枚数が0以下になった場合は削除
        // ただし未知を表す「card」の場合は削除しない
        if (existingCard 
            && cardName !== 'card'
            && existingCard.count <= 0) {
            this.hand.delete(cardName);
        }
    }

    // 手札のカードをすべて捨て札に移動させるメソッド
    moveAllHandToDiscard(): void {
        this.hand.forEach((card, cardName) => {
            this.decreaseFromHand(cardName, card.count);
            this.addToDiscard(cardName, card.count);
        });
    }

    // 捨て札のカードを取得するメソッド
    getDiscardArea(): Map<string, Card> {
        return this.discardArea;
    }

    // 捨て札にカードを追加するメソッド
    addToDiscard(cardName: string, count: number): void {
        const existingCard = this.discardArea.get(cardName);
        if (existingCard) {
            existingCard.count += count;
        } else {
            this.discardArea.set(cardName, { count });
        }
    }

    // 捨て札のカードの枚数を減らすメソッド
    decreaseFromDiscard(cardName: string, count: number): void {
        const existingCard = this.discardArea.get(cardName);
        if (existingCard) {
            existingCard.count -= count;
        }
        // カードの枚数が0以下になった場合は削除
        // ただし未知を表す「card」の場合は削除しない
        if (existingCard 
            && cardName !== 'card'
            && existingCard.count <= 0) {
            this.discardArea.delete(cardName);
        }
    }

    // 捨て札のカードをすべてデッキに移動させるメソッド
    moveAllDiscardToDeck(): void {
        this.discardArea.forEach((card, cardName) => {
            this.decreaseFromDiscard(cardName, card.count);
            this.addToDeck(cardName, card.count);
        });
    }

    // プレイエリアのカードを取得するメソッド
    getPlayArea(): Map<string, Card> {
        return this.playArea;
    }
    
    // プレイエリアにカードを追加するメソッド
    addToPlayArea(cardName: string, count: number): void {
        const existingCard = this.playArea.get(cardName);
        if (existingCard) {
            existingCard.count += count;
        } else {
            this.playArea.set(cardName, { count });
        }
    }

    // プレイエリアのカードの枚数を減らすメソッド
    decreaseFromPlayArea(cardName: string, count: number): void {
        const existingCard = this.playArea.get(cardName);
        if (existingCard) {
            existingCard.count -= count;
        }
        // カードの枚数が0以下になった場合は削除
        // ただし未知を表す「card」の場合は削除しない
        if (existingCard 
            && cardName !== 'card'
            && existingCard.count <= 0) {
            this.playArea.delete(cardName);
        }
    }

    // プレイエリアのカードをすべて捨て札に移動させるメソッド
    moveAllPlayAreaToDiscard(): void {
        this.playArea.forEach((card, cardName) => {
            this.decreaseFromPlayArea(cardName, card.count);
            this.addToDiscard(cardName, card.count);
        });
    }

    // プレイヤー名を取得するメソッド
    getPlayerName(): string {
        return this.playerName;
    }

    // プレイヤー名を設定するメソッド
    setPlayerName(playerName: string): void {
        this.playerName = playerName;
    }

    // プレイヤー名が未登録かどうかを判定するメソッド
    isPlayerNameEmpty(): boolean {
        return this.playerName === '';
    }

    // プレイヤー名に一致するかどうかを判定するメソッド
    isPlayerNameMatch(playerName: string): boolean {
        return this.playerName === playerName;
    }
}