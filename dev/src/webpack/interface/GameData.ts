import { Comment } from "../model/Comment";

export interface GameData {
    gameNumber: string;
    gameSupply: string;
    gameLog: string;
    comment: Comment;
}