import { searchGameData, insertGameData, searchAllGameData } from '../repository/gameDataRepository';
import { GameDataInterface } from '../../webpack/interface/GameDataInterface';
import express, { Request, Response } from 'express';

export function gameDataController(app: express.Application) {
    // ゲームデータ取得エンドポイント
    app.get('/api/gamedata/:gameNumber', (req: Request, res: Response) => {
        // リクエストパラメータからデータを取得
        const gameNumber = req.params.gameNumber as string;

        // データベースからデータを取得  
        if (gameNumber) {
            const result = searchGameData(gameNumber);
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
    app.post('/api/gamedata', (req: Request, res: Response) => {
        // リクエストボディからデータを取得
        const gameData = req.body as GameDataInterface;

        // データベースにデータを登録
        insertGameData(gameData);

        res.send('Game data is saved.');
    });

    // ゲームデータを全件取得するエンドポイント
    app.get('/api/all/gamedata', (req: Request, res: Response) => {
        const gameDataArray = searchAllGameData();
        res.json(gameDataArray);
    });
}