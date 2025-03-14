import { CommentInterface } from "../interface/CommentInterface";
import { LogSectionInterface } from "../interface/LogSectionInterface";

export class GameData {
    
    private gameNumber: string;
    private gameLog: string;
    private gameSupply: string;

    private totalTurns: number; // ゲーム終了にかかったターン数
    
    private pointer: number; // ログの表示位置を示すポインタ
    private logSectionArray: LogSectionInterface[] = []; // ログの断面を格納する配列
    private comment: CommentInterface[] = []; // コメントを格納する配列

    constructor() {
        this.gameNumber = '';
        this.gameLog = '';
        this.gameSupply = '';

        this.totalTurns = 0;

        this.pointer = 0;
        this.logSectionArray = [];
        this.comment = [];
    }

    // ゲーム番号を取得するメソッド
    getGameNumber(): string {
        return this.gameNumber;
    }

    // ゲーム番号を設定するメソッド
    setGameNumber(gameNumber: string): void {
        this.gameNumber = gameNumber;
    }

    // ログを取得するメソッド
    getGameLog(): string {
        return this.gameLog;
    }

    // ログを設定するメソッド
    setGameLog(gameLog: string): void {
        this.gameLog = gameLog;
    }

    // サプライを取得するメソッド
    getGameSupply(): string {
        return this.gameSupply;
    }

    // サプライを設定するメソッド
    setGameSupply(gameSupply: string): void {
        this.gameSupply = gameSupply;
    }

    // ゲーム終了にかかったターン数を取得するメソッド
    getTotalTurns(): number {
        return this.totalTurns;
    }

    // ゲーム終了にかかったターン数を設定するメソッド
    setTotalTurns(totalTurns: number): void {
        this.totalTurns = totalTurns;
    }
    
    // ログの断面を取得するメソッド
    getLogSectionArray(): LogSectionInterface[] {
        return this.logSectionArray;
    }

    // ポインタの位置のログの断面を取得するメソッド
    getLogSection(): LogSectionInterface {
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

    // コメントを取得するメソッド
    getComment(): CommentInterface[] {
        return this.comment;
    }

    // コメントを設定するメソッド
    setComment(comment: CommentInterface[]): void {
        this.comment = comment;
    }

    // コメントを追加するメソッド
    addComment(comment: CommentInterface): void {
        this.comment.push(comment);
    }
}
