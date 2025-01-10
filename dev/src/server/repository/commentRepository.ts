import { CommentInterface } from "../../webpack/interface/CommentInterface";
import { getDb } from "../database/makeLokiDb";

export function searchComment(gameNumber: string): CommentInterface[] {
    const db = getDb();
    const comment = db.getCollection<CommentInterface>('comment');
    const result = comment.find({ gameNumber: gameNumber });
    return result;
}

export function searchAllComment(): CommentInterface[] {
    const db = getDb();
    const comment = db.getCollection<CommentInterface>('comment');
    const result = comment.find();
    return result;
}

export function insertComment(comment: CommentInterface) {
    const db = getDb();
    const commentCollection = db.getCollection<CommentInterface>('comment');
    commentCollection.insert(comment);
    db.saveDatabase();
}
