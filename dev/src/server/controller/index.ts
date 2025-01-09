import express, { Request, Response } from 'express';
import { startDb } from '../database/makeLokiDb';
import { searchGameLog, insertGameLog, searchAllGameLog } from '../repository/gameLogRepository';
import { GameData } from '../../webpack/interface/GameData';
import cors from 'cors';

const app = express();
const port = 3000;

// CORSを有効にする
app.use(cors());

// JSONボディのパースを有効にする
app.use(express.json());

// ルートエンドポイント
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, world!');
});

// ゲームデータ取得エンドポイント
app.get('/api/gamedata/:gameNumber', (req: Request, res: Response) => {
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
app.post('/api/gamedata', (req: Request, res: Response) => {
  // リクエストボディからデータを取得
  const gameData = req.body as GameData;

  // データベースにデータを登録
  insertGameLog(gameData);

  res.send('Game data is saved.');
});

// ゲームデータを全件取得するエンドポイント
app.get('/api/all/gamedata', (req: Request, res: Response) => {
  const gameDataArray = searchAllGameLog();
  res.json(gameDataArray);
});

// サーバの起動
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
  startDb(); // データベースの初期化
});