import { CardInterface } from "../interface/CardInterface";

export class Supply {
    
    private basicArea: CardInterface[] = []; // 勝利点や財宝などのカード
    private kingdomArea: CardInterface[] = []; // 王国カード
    private trashArea: CardInterface[] = []; // 廃棄札のカード
    
    // 勝利点や財宝のリストを取得するメソッド
    getBasicArea(): CardInterface[] {
        return this.basicArea;
    }

    // 王国カードのリストを取得するメソッド
    getKingdomArea(): CardInterface[] {
        return this.kingdomArea;
    }

    // 基本カードに新しいカードを追加するメソッド
    addCardToBasic(cardName: string, count: number): void {
        const existingCard = this.basicArea.find(card => card.name === cardName);
        if (existingCard) {
            console.warn(`Card with name "${cardName}" already exists.`);
        } else {
            this.basicArea.push({ name: cardName, count });
        }
    }

    // 王国カードに新しいカードを追加するメソッド
    addCardToKingdom(cardName: string, count: number): void {
        const existingCard = this.kingdomArea.find(card => card.name === cardName);
        if (existingCard) {
            console.warn(`Card with name "${cardName}" already exists.`);
        } else {
            this.kingdomArea.push({ name: cardName, count });
        }
    }

    // 基本カードか王国カードのどちらかのカードの枚数を増やすメソッド
    increaseCardCount(cardName: string, count: number): void {
        const existingCard = this.basicArea.find(card => card.name === cardName);
        if (existingCard) {
            existingCard.count += count;
        } else {
            const existingCard = this.kingdomArea.find(card => card.name === cardName);
            if (existingCard) {
                existingCard.count += count;
            } else {
                console.warn(`Card with name "${cardName}" does not exist.`);
            }
        }
    }

    // 基本カードか王国カードのどちらかのカードの枚数を減らすメソッド
    decreaseCardCount(cardName: string, count: number): void {
        const existingCard = this.basicArea.find(card => card.name === cardName);
        if (existingCard) {
            existingCard.count -= count;
        } else {
            const existingCard = this.kingdomArea.find(card => card.name === cardName);
            if (existingCard) {
                existingCard.count -= count;
            } else {
                console.warn(`Card with name "${cardName}" does not exist.`);
            }
        }
    }

    // 廃棄札を取得するメソッド
    getTrashArea(): CardInterface[] {
        return this.trashArea;
    }

    // 廃棄札に新しいカードを追加するメソッド
    addToTrash(cardName: string, count: number): void {
        const existingCard = this.trashArea.find(card => card.name === cardName);
        if (existingCard) {
            existingCard.count += count;
        } else {
            this.trashArea.push({ name: cardName, count });
        }
    }

    // ディープコピーを返すメソッド
    clone(): Supply {
        const supply = new Supply();
        supply.basicArea = this.basicArea.map(card => ({ ...card }));
        supply.kingdomArea = this.kingdomArea.map(card => ({ ...card }));
        supply.trashArea = this.trashArea.map(card => ({ ...card }));
        return supply;
    }
}