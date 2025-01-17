import { GameLogInterface } from "../interface/GameLogInterface";
import { LogSectionInterface } from "../interface/LogSectionInterface";
import { GameData } from "../model/GameData";
import { Player } from "../model/Player";
import { Supply } from "../model/Supply";
import { loadGameLog } from "./loadGameLog";
import { loadGameSupply } from "./loadGameSupply";
import { logAnalyzer } from "./logAnalyzer/logAnalyzer";

export function gameDataInitializer(
    gameData: GameData,
    gameLogInterface: GameLogInterface): void {

    // サプライの読み込み
    const supply = new Supply();
    loadGameSupply(supply, gameLogInterface.gameSupply); // supplyオブジェクトに書き込み
    console.log("supply: ", supply);

    // 各ログの解析
    const logArray = loadGameLog(gameData.getGameLog());

    // logSectionの初期化
    logArray.forEach((log) => {
        let logSection: LogSectionInterface = {
            supply: supply,
            firstPlayer: new Player(),
            secondPlayer: new Player(),
            logSection: log // ログの断面（1行分）
        };
        gameData.getLogSectionArray().push(logSection);
    });

    // 各ログの断面を解析
    for (let i = 1; i < logArray.length; i++) {
        const prevLogSec = gameData.getLogSectionArray()[i - 1];

        const currentLogSec: LogSectionInterface = {
            supply: new Supply(),
            firstPlayer: new Player(),
            secondPlayer: new Player(),
            logSection: logArray[i]
        };

        let next = i;
        if (i + 1 < logArray.length) next = i + 1;
        const nextLogSec: LogSectionInterface = {
            supply: new Supply(),
            firstPlayer: new Player(),
            secondPlayer: new Player(),
            logSection: logArray[next]
        };

        // i番目のログの解析結果をi番目のログに書き込む
        const resultLogSec = logAnalyzer(i, gameData.getLogSectionArray());        
        gameData.getLogSectionArray()[i] = resultLogSec;        
    }
}