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

    // ログを改行区切りで配列に格納
    const logArray = loadGameLog(gameData.getGameLog());

    // logSectionの初期化
    logArray.forEach((log) => {
        let logSection: LogSectionInterface = {
            supply: supply,
            firstPlayer: new Player(),
            secondPlayer: new Player(),
            logSection: log, // ログの断面（1行分）
        };
        gameData.getLogSectionArray().push(logSection);
    });

    // 各ログの断面を解析して書き込む
    for (let i = 1; i < logArray.length; i++) {
        
        // i番目のログの解析結果をi番目のログに書き込む
        const resultLogSec = logAnalyzer(i, gameData.getLogSectionArray());        
        gameData.getLogSectionArray()[i] = resultLogSec;        
    }
}