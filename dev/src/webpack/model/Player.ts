
export class Player {

    private totalGains: Map<string, number> = new Map(); // ゲーム中に獲得した合計枚数
    private totalPlays: Map<string, number> = new Map(); // ゲーム中にプレイした合計枚数
    private totalDraws: Map<string, number> = new Map(); // ゲーム中に引いた合計枚数

    private nowInDeck: Map<string, number> = new Map(); // 現在のデッキ
    private turnPlays: Map<string, number> = new Map(); // ターン中にプレイした合計枚数
    private turnDraws: Map<string, number> = new Map(); // ターン中に引いた合計枚数
    
    private playerName: string = '';

    constructor() {
        this.totalGains.set('card', 0);
        this.totalPlays.set('card', 0);
        this.totalDraws.set('card', 0);
        this.nowInDeck.set('card', 0);
        this.turnPlays.set('card', 0);
        this.turnDraws.set('card', 0);
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
        player.playerName = this.playerName;
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