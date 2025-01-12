import { GameLogInterface } from "../interface/GameLogInterface";

export function saveGameLog(gameLogInterface: GameLogInterface): void {
    // ローカルストレージに値を保存
     localStorage.setItem('gameNumber', gameLogInterface.gameNumber);
     localStorage.setItem('gameSupply', gameLogInterface.gameSupply);
     localStorage.setItem('gameLog', gameLogInterface.gameLog);
}