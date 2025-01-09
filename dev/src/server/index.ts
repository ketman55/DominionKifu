import express, { Request, Response } from 'express';

const app = express();
const port = 3000;

// JSONボディのパースを有効にする
app.use(express.json());

// ルートエンドポイント
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, world!');
});

// 他のエンドポイント
app.get('/api/data', (req: Request, res: Response) => {
  res.json({ message: 'This is your data!' });
});

// サーバの起動
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});