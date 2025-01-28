import { GameLogInterface } from "../../webpack/interface/GameLogInterface";
import { getDb } from "../database/makeLokiDb";
import { sanitizeInput } from "../../webpack/logic/injectionBlocker";

export function searchGameLog(gameNumber: string): GameLogInterface {
    const db = getDb();
    const gameLog = db.getCollection<GameLogInterface>('gameLog');
    const result = gameLog.find({ gameNumber: gameNumber });
    return result[0];
}

export function searchAllGameLog(): GameLogInterface[] {
    const db = getDb();
    const gameLog = db.getCollection<GameLogInterface>('gameLog');
    const result = gameLog.find();
    return result;
}

export function searchAllGameNumber(): string[] {
    const db = getDb();
    const gameLog = db.getCollection<GameLogInterface>('gameLog');
    const result = gameLog.find().map(gameLog => gameLog.gameNumber); // すべてのgameNumberを取得
    return result;
}

export function insertGameLog(gameLog: GameLogInterface): void {
    // インジェクション対策
    gameLog.gameSupply = sanitizeInput(gameLog.gameSupply);
    gameLog.gameLog = sanitizeInput(gameLog.gameLog);
    gameLog.gameNumber = sanitizeInput(gameLog.gameNumber);
    
    // 登録
    const db = getDb();
    const gameLogCollection = db.getCollection<GameLogInterface>('gameLog');
    gameLogCollection.insert(gameLog);
    db.saveDatabase();
}