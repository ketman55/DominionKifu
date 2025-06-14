import { searchGameLog, insertGameLog, searchAllGameLog, searchAllGameNumber, deleteGameLog } from '../repository/gameLogRepository';
import { GameLogInterface } from '../../webpack/interface/GameLogInterface';
import express, { Request, Response } from 'express';
import { adminAuth } from '../middleware/authMiddleware';

export function gameLogController(app: express.Application) {
    // ゲームデータ取得エンドポイント
    app.get('/api/gamelog/:gameNumber', (req: Request, res: Response) => {
        // リクエストパラメータからデータを取得
        const gameNumber = req.params.gameNumber as string;

        // データベースからデータを取得  
        if (gameNumber) {
            const result = searchGameLog(gameNumber);
            if (result) {
                res.json(result);
            } else {
                res.status(404).send('Game data not found');
            }
        } else {
            res.status(404).send('Game data collection not found');
        }
    });

    // ゲームデータ登録エンドポイント
    app.post('/api/gamelog', (req: Request, res: Response) => {
        // リクエストボディからデータを取得
        const gameLog = req.body as GameLogInterface;

        // データベースにデータを登録
        insertGameLog(gameLog);

        res.send('Game log is saved.');
    });

    // ゲームデータを全件取得するエンドポイント
    app.get('/api/all/gamelog', (req: Request, res: Response) => {
        const gameLogArray = searchAllGameLog();
        res.json(gameLogArray);
    });

    // ゲームナンバーを全件取得するエンドポイント
    app.get('/api/all/gamenumber', (req: Request, res: Response) => {
        const gameNumberArray = searchAllGameNumber();
        res.json(gameNumberArray);
    });

    // ゲームデータ削除エンドポイント（管理者のみ）
    app.delete('/api/gamelog/:gameNumber', adminAuth, (req: Request, res: Response) => {
        // リクエストパラメータからデータを取得
        const gameNumber = req.params.gameNumber as string;

        // データベースからデータを削除
        if (gameNumber) {
            const result = deleteGameLog(gameNumber);
            if (result) {
                res.send('Game log is deleted.');
            } else {
                res.status(404).send('Game data not found');
            }
        } else {
            res.status(400).send('Game number is required');
        }
    });
}