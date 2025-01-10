export interface CommentInterface {

    // どのゲームのログかを示す
    pointer: number;
    gameNumber: string;

    // コメントの内容
    comment: string;
    userName: string;
    date: string;
}