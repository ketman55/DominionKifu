import { searchComment, searchAllComment, insertComment, deleteComment } from '../repository/commentRepository';
import { CommentInterface } from '../../webpack/interface/CommentInterface';
import express, { Request, Response } from 'express';
import { adminAuth } from '../middleware/authMiddleware';

export function commentController(app: express.Application) {
    
    // 取得エンドポイント
    app.get('/api/comment/:gameNumber', (req: Request, res: Response) => {
        // リクエストパラメータからデータを取得
        const gameNumber = req.params.gameNumber as string;

        // データベースからデータを取得  
        if (gameNumber) {
            const result = searchComment(gameNumber);
            if (result) {
                res.json(result);
            } else {
                res.status(404).send('Game data not found');
            }
        } else {
            res.status(404).send('Game data collection not found');
        }
    });

    // 登録エンドポイント
    app.post('/api/comment', (req: Request, res: Response) => {
        // リクエストボディからデータを取得
        const comment = req.body as CommentInterface;

        // データベースにデータを登録
        insertComment(comment);

        res.send('Game data is saved.');
    });

    // コメントを全件取得するエンドポイント
    app.get('/api/all/comment', (req: Request, res: Response) => {
        const commentArray = searchAllComment();
        res.json(commentArray);
    });

    // コメント削除エンドポイント（管理者のみ）
    app.delete('/api/comment/:gameNumber/:pointer', adminAuth, (req: Request, res: Response) => {
        // リクエストパラメータからデータを取得
        const gameNumber = req.params.gameNumber as string;
        const pointer = parseInt(req.params.pointer);

        // データベースからデータを削除
        if (gameNumber && !isNaN(pointer)) {
            const result = deleteComment(gameNumber, pointer);
            if (result) {
                res.send('Comment is deleted.');
            } else {
                res.status(404).send('Comment not found');
            }
        } else {
            res.status(400).send('Game number and pointer are required');
        }
    });
}