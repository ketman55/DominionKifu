import { GameLogInterface } from "../interface/GameLogInterface";
import { LogSectionInterface } from "../interface/LogSectionInterface";
import { GameData } from "../model/GameData";
import { Player } from "../model/Player";
import { Supply } from "../model/Supply";
import { loadGameSupply } from "./loadGameSupply";
import { loadGameLog } from "./loadGameLog";
import { logAnalyzer } from "./logAnalyzer/logAnalyzer";

export function gameDataInitializer(gameData: GameData, gameLogInterface: GameLogInterface): void {
    
    // サプライの読み込み
    const supply = new Supply();
    loadGameSupply(supply, gameLogInterface.gameSupply); // supplyオブジェクトに書き込み

    // ログの読み込み
    const logArray = loadGameLog(gameData.getGameLog());

    // logSection[0]の初期化
    let logSection: LogSectionInterface = {
        supply: supply,
        firstPlayer: new Player(),
        secondPlayer: new Player(),
        logSection: logArray[0] // ログの断面（1行分）
    };
    gameData.getLogSectionArray().push();

    // 残りのログの断面を追加
    for (let i = 1; i < logArray.length; i++) {
        logSection = {
            supply: logSection.supply,
            firstPlayer: logSection.firstPlayer,
            secondPlayer: logSection.secondPlayer,
            logSection: logArray[i]
        };
        gameData.getLogSectionArray().push(logSection);
    }

    // 各ログの解析に進む
    // logAnalyzerに渡す
    logAnalyzer(gameData);
}