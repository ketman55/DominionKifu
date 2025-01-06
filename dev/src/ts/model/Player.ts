interface Card {
    name: string;
    count: number;
}

export class Player {
    
    private deck: Card[] = [];
    private hand: Card[] = [];
    private discardArea: Card[] = [];
    private playArea: Card[] = [];
    
    // 初期値設定。2人戦の前提で設定する
    constructor() {
        this.deck = [
            { name: 'estate', count: 3 },
            { name: 'copper', count: 7 }
        ];
    }

    // デッキのカードを取得するメソッド
    getDeck(): Card[] {
        return this.deck;
    }

    // 手札のカードを取得するメソッド
    getHand(): Card[] {
        return this.hand;
    }

    // 捨て札のカードを取得するメソッド
    getDiscardArea(): Card[] {
        return this.discardArea;
    }

    // プレイエリアのカードを取得するメソッド
    getPlayArea(): Card[] {
        return this.playArea;
    }    
}