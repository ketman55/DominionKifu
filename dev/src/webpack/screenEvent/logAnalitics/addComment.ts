import { CommentInterface } from "../../interface/CommentInterface";
import { postComment } from "../../logic/postComment";
import { GameData } from "../../model/GameData";

export async function addComment(gameData: GameData): Promise<void> {
    let request: CommentInterface = {
        // どのゲームのログかを示す
        pointer: gameData.getPointer(),
        gameNumber: gameData.getGameNumber(),

        // コメントの内容
        comment: (document.getElementById('commentInput') as HTMLInputElement).value,
        userName: "",
        date: new Date().toLocaleString()
    };
    if(await postComment(request)) {
        alert('コメントを投稿しました');
        //  commentInputの値を空にする
        (document.getElementById('commentInput') as HTMLInputElement).value = "";
    } else {
        alert('コメントの投稿に失敗しました');
    }
}