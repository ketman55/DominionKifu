import { analyzeLog } from "../logic/logAnalyzer";
import { Kingdom } from "./Kingdom";
import { Player } from "./Player";

interface logSection {
    kingdom: Kingdom;
    firstPlayer: Player;
    secondPlayer: Player;
    logSection: string; // ログの断面（1行分）
}

export class GameLog {
    
    private gameNumber: string;
    private gameLog: string;
    private gameSupply: string;
    private logSectionArray: logSection[] = []; // ログの断面を格納する配列
    private pointer; // ログの表示位置を示すポインタ

    constructor() {
        this.gameNumber = '';
        this.gameLog = '';
        this.gameSupply = '';
        this.logSectionArray = [];
        this.pointer = 0;
    }

    // ログを新規作成するメソッド
    make(gameNumber: string, gameLog: string, gameSupply: string) {        
        // クラスの初期化
        this.gameNumber = gameNumber;
        this.gameLog = gameLog;
        this.gameSupply = gameSupply;
        this.logSectionArray = [];
        this.pointer = 0;

        // ログを改行コードで分割して配列に格納する
        this.analizeLog();
    }

    // ゲーム番号を取得するメソッド
    getGameNumber(): string {
        return this.gameNumber;
    }

    // サプライを取得するメソッド
    getSupply(): string {
        return this.gameSupply;
    }
    
    // ログの断面を取得するメソッド
    getLogSectionArray(): logSection[] {
        return this.logSectionArray;
    }

    // ポインタの位置のログの断面を取得するメソッド
    getLogSection(): logSection {
        return this.logSectionArray[this.pointer];
    }

    // ログの表示位置を示すポインタを取得するメソッド
    getPointer(): number {
        return this.pointer;
    }

    // ログの表示位置を示すポインタを設定するメソッド
    setPointer(pointer: number): void {
        this.pointer = pointer;
    }

    // ログの表示位置を示すポインタをインクリメントするメソッド
    incrementPointer(): void {
        if(!this.isEnd()) this.pointer++;
    }

    // ログの表示位置を示すポインタをデクリメントするメソッド
    decrementPointer(): void {
        if(!this.isTop()) this.pointer--;
    }

    // ログの表示位置を示すポインタをリセットするメソッド
    resetPointer(): void {
        this.pointer = 0;
    }

    // ログの表示位置を示すポインタが最後尾かどうかを判定するメソッド
    isEnd(): boolean {
        return this.pointer === this.logSectionArray.length
    }

    // ログの表示位置を示すポインタが先頭かどうかを判定するメソッド
    isTop(): boolean {
        return this.pointer === 0;
    }

    // ログを解析してlogSectionArrayに格納するメソッド
    private analizeLog(): void {

        let tmpPointer = 0;
        let logArray = this.gameLog.split('\n');

        // logArrayの各要素を解析してlogSectionArrayに格納する
        logArray.forEach((log) => {
            
            if (tmpPointer === 0) {
                // pointerが0の時は初期値を設定して格納する
                const kingdom = new Kingdom();
                const firstPlayer = new Player();
                const secondPlayer = new Player();

                kingdom.loadGameSupply(this.gameSupply);　// サプライを設定する

                let logSection: logSection = { kingdom: kingdom, firstPlayer: firstPlayer , secondPlayer: secondPlayer, logSection: log };
                this.logSectionArray.push(logSection);
                tmpPointer++;
            } else  {
                // ひとつ前のlogSectionの内容をディープコピー
                let lastPointer = tmpPointer - 1;
                const kingdom = this.logSectionArray[lastPointer].kingdom.clone();
                const firstPlayer = this.logSectionArray[lastPointer].firstPlayer.clone();
                const secondPlayer = this.logSectionArray[lastPointer].secondPlayer.clone();

                // 今回のログの内容でクラスを更新する
                analyzeLog(kingdom, firstPlayer, secondPlayer, log);

                // 結果を登録する
                let logSection: logSection = { kingdom: kingdom, firstPlayer: firstPlayer , secondPlayer: secondPlayer, logSection: log };
                this.logSectionArray.push(logSection);
                tmpPointer++;
            }
        });
    }
}
