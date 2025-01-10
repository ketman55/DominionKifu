import { CommentInterface } from "../interface/CommentInterface";

export class Comment {

    // どのゲームのログかを示す
    private content: CommentInterface = {
        pointer: 0,
        gameNumber: '',
        comment: '',
        userName: '',
        date: ''
    };

    constructor() {}

    // コメントの作成
    make(gameNumber: string, comment: string, userName: string, date: string) {
        this.content.pointer = 0;
        this.content.gameNumber = gameNumber;
        this.content.comment = comment;
        this.content.userName = userName;
        this.content.date = date;
    }

    // コメントの取得
    getComment(): CommentInterface {
        return this.content;
    }

}