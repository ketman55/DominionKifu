import express, { Request, Response } from 'express';
import { startDb } from '../database/makeLokiDb';
import cors from 'cors';
import { gameLogController } from './gameLogController';
import { commentController } from './commentController';
import { authController } from './authController';
import path from 'path';

const app = express();
const port = 3000;

// 静的ファイルを提供するディレクトリを設定
app.use(express.static(path.join(__dirname, '../../../public')));

// CORSを有効にする
app.use(cors());

// JSONボディのパースを有効にする
app.use(express.json());

// ルートエンドポイント
app.get('/', (req: Request, res: Response) => {
  res.sendFile(path.join(__dirname, '../../../public/gameDataInput.html'));
});

// gameLogのエンドポイント
gameLogController(app);

// Commentのエンドポイント
commentController(app);

// 認証のエンドポイント
authController(app);

// サーバの起動
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
  startDb(); // データベースの初期化
});