import { CommentInterface } from "../interface/CommentInterface";
import { LogSectionInterface } from "../interface/LogSectionInterface";

export class GameData {
    
    private gameNumber: string;
    private gameLog: string;
    private gameSupply: string;
    private logSectionArray: LogSectionInterface[] = []; // ログの断面を格納する配列
    private pointer; // ログの表示位置を示すポインタ
    private comment: CommentInterface[] = []; // コメントを格納する配列

    constructor() {
        this.gameNumber = '';
        this.gameLog = '';
        this.gameSupply = '';
        this.logSectionArray = [];
        this.pointer = 0;
        this.comment = [];
    }

    // ログを新規作成するメソッド
    make(gameNumber: string, gameLog: string, gameSupply: string) {        
        // クラスの初期化
        this.gameNumber = gameNumber;
        this.gameLog = gameLog;
        this.gameSupply = gameSupply;
        this.logSectionArray = [];
        this.pointer = 0;
        this.comment = [];
    }

    // ゲーム番号を取得するメソッド
    getGameNumber(): string {
        return this.gameNumber;
    }

    // ログを取得するメソッド
    getGameLog(): string {
        return this.gameLog;
    }

    // サプライを取得するメソッド
    getGameSupply(): string {
        return this.gameSupply;
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
