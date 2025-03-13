import { CardInterface } from "../interface/CardInterface";

export class Player {

    private totalGains: Map<string, number> = new Map(); // ゲーム中に獲得した合計枚数
    private totalPlays: Map<string, number> = new Map(); // ゲーム中にプレイした合計枚数
    private totalDraws: Map<string, number> = new Map(); // ゲーム中に引いた合計枚数
    private totalExiles: Map<string, number> = new Map(); // ゲーム中に追放した合計枚数

    private nowInDeck: Map<string, number> = new Map(); // 現在のデッキ
    private turnPlays: Map<string, number> = new Map(); // ターン中にプレイした合計枚数
    private turnDraws: Map<string, number> = new Map(); // ターン中に引いた合計枚数
    private turnExiles: Map<string, number> = new Map(); // ターン中に追放した合計枚数
    
    private exileArea: Map<string, number> = new Map();  // 現在の追放エリアの状況

    private playerName: string = '';
    private turn: number = 0; // 現在のターン数

    constructor() {
        this.totalGains.set('card', 0);
        this.totalPlays.set('card', 0);
        this.totalDraws.set('card', 0);
        this.totalExiles.set('card', 0);
        this.nowInDeck.set('card', 0);
        this.turnPlays.set('card', 0);
        this.turnDraws.set('card', 0);
        this.turnExiles.set('card', 0);
     }

    // ディープコピーを返すメソッド
    clone(): Player {
        const player = new Player();
        player.totalGains = new Map(Array.from(this.totalGains.entries()).map(([key, card]) => [key, card]));
        player.nowInDeck = new Map(Array.from(this.nowInDeck.entries()).map(([key, card]) => [key, card]));
        player.totalPlays = new Map(Array.from(this.totalPlays.entries()).map(([key, card]) => [key, card]));
        player.turnPlays = new Map(Array.from(this.turnPlays.entries()).map(([key, card]) => [key, card]));
        player.totalDraws = new Map(Array.from(this.totalDraws.entries()).map(([key, card]) => [key, card]));
        player.turnDraws = new Map(Array.from(this.turnDraws.entries()).map(([key, card]) => [key, card]));
        player.totalExiles = new Map(Array.from(this.totalExiles.entries()).map(([key, card]) => [key, card]));
        player.turnExiles = new Map(Array.from(this.turnExiles.entries()).map(([key, card]) => [key, card]));
        player.exileArea = new Map(Array.from(this.exileArea.entries()).map(([key, card]) => [key, card]));
        player.playerName = this.playerName;
        player.turn = this.turn;
        return player;
    }

    // デッキのカードを取得するメソッド
    getTotalGains(): Map<string, number> {
        return this.totalGains;
    }

    // デッキにカードを追加するメソッド
    addToTotalGains(cardName: string, count: number): void {
        const existingCard = this.totalGains.get(cardName);
        if (existingCard) {
            this.totalGains.set(cardName, existingCard + count);
        } else {
            this.totalGains.set(cardName, count);
        }
    }

    // デッキのカードの枚数を減らすメソッド
    decreaseFromTotalGains(cardName: string, count: number): void {
        const existingCard = this.totalGains.get(cardName);
        if (existingCard) {
            this.totalGains.set(cardName, existingCard - count);
        }
    }

    // 現在のデッキを取得するメソッド
    getNowInDeck(): Map<string, number> {
        return this.nowInDeck;
    }

    // 現在のデッキにカードを追加するメソッド
    addToNowInDeck(cardName: string, count: number): void {
        const existingCard = this.nowInDeck.get(cardName);
        if (existingCard) {
            this.nowInDeck.set(cardName, existingCard + count);
        } else {
            this.nowInDeck.set(cardName, count);
        }
    }

    // 現在のデッキからカードを減らすメソッド
    decreaseFromNowInDeck(cardName: string, count: number): void {
        const existingCard = this.nowInDeck.get(cardName);
        if (existingCard) {
            this.nowInDeck.set(cardName, existingCard - count);
        }
    }

    // 現在のデッキからカードを削除するメソッド
    removeFromNowInDeck(cardName: string): void {
        this.nowInDeck.delete(cardName);
    }

    // ゲーム中にプレイした合計枚数を取得するメソッド
    getTotalPlays(): Map<string, number> {
        return this.totalPlays;
    }

    // ゲーム中にプレイした合計枚数を追加するメソッド
    addToTotalPlays(cardName: string, count: number): void {
        const existingCard = this.totalPlays.get(cardName);
        if (existingCard) {
            this.totalPlays.set(cardName, existingCard + count);
        } else {
            this.totalPlays.set(cardName, count);
        }
    }

    // ターン中にプレイした合計枚数を取得するメソッド
    getTurnPlays(): Map<string, number> {
        return this.turnPlays;
    }

    // ターン中にプレイした合計枚数を追加するメソッド
    addToTurnPlays(cardName: string, count: number): void {
        const existingCard = this.turnPlays.get(cardName);
        if (existingCard) {
            this.turnPlays.set(cardName, existingCard + count);
        } else {
            this.turnPlays.set(cardName, count);
        }
    }

    // ターン中にプレイした合計枚数をリセットするメソッド
    resetTurnPlays(): void {
        this.turnPlays = new Map();
    }

    // ターン中に引いた合計枚数を取得するメソッド
    getTurnDraws(): Map<string, number> {
        return this.turnDraws;
    }

    // ターン中に引いた合計枚数を追加するメソッド
    addToTurnDraws(cardName: string, count: number): void {
        const existingCard = this.turnDraws.get(cardName);
        if (existingCard) {
            this.turnDraws.set(cardName, existingCard + count);
        } else {
            this.turnDraws.set(cardName, count);
        }
    }

    // ターン中に引いた合計枚数をリセットするメソッド
    resetTurnDraws(): void {
        this.turnDraws = new Map();
    }

    // ゲーム中に引いた合計枚数を取得するメソッド
    getTotalDraws(): Map<string, number> {
        return this.totalDraws;
    }

    // ゲーム中に引いた合計枚数を追加するメソッド
    addToTotalDraws(cardName: string, count: number): void {
        const existingCard = this.totalDraws.get(cardName);
        if (existingCard) {
            this.totalDraws.set(cardName, existingCard + count);
        } else {
            this.totalDraws.set(cardName, count);
        }
    }
    
    // 追放札を取得するメソッド
    getExileArea(): Map<string, number> {
        return this.exileArea;
    }

    // 追放札に新しいカードを追加するメソッド
    addToExiles(cardName: string, count: number): void {
        const existingCard = this.exileArea.get(cardName);
        if (existingCard) {
            this.exileArea.set(cardName, existingCard + count);
        } else {
            this.exileArea.set(cardName, count);
        }
    }
    
    // 追放札のカードを捨て札にするメソッド
    discardFromExile(cardName: string): void {
        const existingCard = this.exileArea.get(cardName);
        if (existingCard) {
            this.exileArea.set(cardName, 0);
        } else {
            // 本来はここに来ないはず
            console.error(`You tried to discard "${cardName}", which does not exist in the exile area.`);
        }
    }

    // ターン中に追放した合計枚数を追加するメソッド
    addToTurnExiles(cardName: string, count: number): void {
        const existingCard = this.turnExiles.get(cardName);
        if (existingCard) {
            this.turnExiles.set(cardName, existingCard + count);
        } else {
            this.turnExiles.set(cardName, count);
        }
    }

    // ターン中に追放した合計枚数をリセットするメソッド
    resetTurnExiles(): void{
        this.turnExiles = new Map();
    }

    // ターン中に追放した合計枚数を取得するメソッド
    getTurnExiles(): Map<string, number> {
        return this.turnExiles;
    }

    // ゲーム中に追放した合計枚数を追加するメソッド
    addToTotalExiles(cardName: string, count: number): void {
        const existingCard = this.totalExiles.get(cardName);
        if (existingCard) {
            this.totalExiles.set(cardName, existingCard + count);
        } else {
            this.totalExiles.set(cardName, count);
        }
    }

    // ゲーム中に追放した合計枚数を取得するメソッド
    getTotalExiles(): Map<string, number> {
        return this.totalExiles;
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

    // ターン数を取得するメソッド
    getTurn(): number {
        return this.turn;
    }

    // ターン数を設定するメソッド
    setTurn(turn: number): void {
        this.turn = turn;
    }

    // ターン数をインクリメントするメソッド
    incrementTurn(): void {
        this.turn++;
    }
}