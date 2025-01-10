import { GameDataInterface } from "../../webpack/interface/GameDataInterface";
import { getDb } from "../database/makeLokiDb";

export function searchGameData(gameNumber: string): GameDataInterface {
    const db = getDb();
    const gameData = db.getCollection<GameDataInterface>('gameData');
    const result = gameData.find({ gameNumber: gameNumber });
    return result[0];
}

export function searchAllGameData(): GameDataInterface[] {
    const db = getDb();
    const gameData = db.getCollection<GameDataInterface>('gameData');
    const result = gameData.find();
    return result;
}

export function insertGameData(gameData: GameDataInterface): void {
    const db = getDb();
    const gameDataCollection = db.getCollection<GameDataInterface>('gameData');
    gameDataCollection.insert(gameData);
    db.saveDatabase();
}