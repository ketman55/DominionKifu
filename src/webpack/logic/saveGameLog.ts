import { GameLogInterface } from "../interface/GameLogInterface";

/**
 * gameNumberAndLogInput画面やサーバから取得したゲームログの基礎情報を
 * logAnalytics画面に受け渡すためにブラウザローカルストレージに保存する処理
 * @param gameLogInterface ゲームログの基礎情報
 */
export function saveGameLog(gameLogInterface: GameLogInterface): void {
    // ローカルストレージに値を保存
     localStorage.setItem('gameNumber', gameLogInterface.gameNumber);
     localStorage.setItem('gameSupply', gameLogInterface.gameSupply);
     localStorage.setItem('gameLog', gameLogInterface.gameLog);
}