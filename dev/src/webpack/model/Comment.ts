export class Comment {

    // どのゲームのログかを示す
    private pointer: number;
    private gameNumber: string;

    // コメントの内容
    private comment: string;
    private userName: string;
    private date: string;

    constructor() {
        this.pointer = 0;
        this.gameNumber = '';
        this.comment = '';
        this.userName = '';
        this.date = '';
    }

}