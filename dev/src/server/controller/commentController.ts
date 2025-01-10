import { searchComment, searchAllComment, insertComment } from '../repository/commentRepository';
import { CommentInterface } from '../../webpack/interface/CommentInterface';
import express, { Request, Response } from 'express';

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

    // ゲームデータを全件取得するエンドポイント
    app.get('/api/all/comment', (req: Request, res: Response) => {
        const commentArray = searchAllComment();
        res.json(commentArray);
    });
}