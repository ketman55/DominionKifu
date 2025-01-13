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

    // 捨て札のカードを取得するメソッド
    getDiscardArea(): Map<string, Card> {
        return this.discardArea;
    }

    // プレイエリアのカードを取得するメソッド
    getPlayArea(): Map<string, Card> {
        return this.playArea;
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