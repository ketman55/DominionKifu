import { GameLog } from "../../model/GameLog";

/**
 * 複数のイベント間で状態が参照・更新されるクラス
 */

// ゲームログのグローバル変数
export let gameLogMaster = new GameLog();