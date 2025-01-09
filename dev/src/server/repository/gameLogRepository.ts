import { GameData } from "../../webpack/interface/GameData";
import { getDb } from "../database/makeLokiDb";

export function searchGameLog(gameNumber: string): GameData {
    const db = getDb();
    const gameData = db.getCollection<GameData>('gameData');
    const result = gameData.find({ gameNumber: gameNumber });
    return result[0];
}

export function searchAllGameLog(): GameData[] {
    const db = getDb();
    const gameData = db.getCollection<GameData>('gameData');
    const result = gameData.find();
    return result;
}

export function insertGameLog(gameData: GameData): void {
    const db = getDb();
    const gameDataCollection = db.getCollection<GameData>('gameData');
    gameDataCollection.insert(gameData);
    db.saveDatabase();
}