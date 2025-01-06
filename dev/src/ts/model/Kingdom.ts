import { loadGameSupply } from "../logic/loadGameSupply";

interface Card {
    name: string;
    count: number;
}

export class Kingdom {
    
    private leftSupply: Card[] = []; // 勝利点や財宝などのカード
    private rightSupply: Card[] = []; // 王国カード
    
    // 初期値設定。2人戦の前提で設定する
    constructor() {
        this.leftSupply = [
            { name: 'province', count: 8 },
            { name: 'duchy', count: 8 },
            { name: 'estate', count: 8 },
            { name: 'curse', count: 10 },
            { name: 'gold', count: 30 },
            { name: 'silver', count: 40 },
            { name: 'copper', count: 46 }
        ];
    }

    // 勝利点や財宝のリストを取得するメソッド
    getLeftSupply(): Card[] {
        return this.leftSupply;
    }

    // 王国カードのリストを取得するメソッド
    getRightSupply(): Card[] {
        return this.rightSupply;
    }

    // 王国カードに新しいカードを追加するメソッド
    loadGameSupply(gameSupply: string): void {
        loadGameSupply(gameSupply, this);
    }

    // 王国カードに新しいカードを追加するメソッド
    addCard(cardName: string, count: number): void {
        const existingCard = this.rightSupply.find(card => card.name === cardName);
        if (existingCard) {
            console.warn(`Card with name "${cardName}" already exists.`);
        } else {
            this.rightSupply.push({ name: cardName, count });
        }
    }
}