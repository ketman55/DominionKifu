import express, { Request, Response } from 'express';
import { startDb } from '../database/makeLokiDb';
import cors from 'cors';
import { gameLogController } from './gameLogController';
import { commentController } from './commentController';

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

// gameLogのエンドポイント
gameLogController(app);

// Commentのエンドポイント
commentController(app);

// サーバの起動
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
  startDb(); // データベースの初期化
});