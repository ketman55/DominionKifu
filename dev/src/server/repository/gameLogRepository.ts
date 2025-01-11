import { GameLogInterface } from "../../webpack/interface/GameLogInterface";
import { getDb } from "../database/makeLokiDb";

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

export function insertGameLog(gameLog: GameLogInterface): void {
    const db = getDb();
    const gameLogCollection = db.getCollection<GameLogInterface>('gameLog');
    gameLogCollection.insert(gameLog);
    db.saveDatabase();
}