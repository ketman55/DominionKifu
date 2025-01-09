import { GameLog } from '../../../model/GameLog';
import { updateScreen } from './updateScreen';

// prevButtonを押下した際のイベント
export function prevButtonEvent(gameLogMaster: GameLog) {
    // ポインタをひとつ戻す
    gameLogMaster.decrementPointer();

    // 画面表示を更新
    updateScreen(gameLogMaster);

}

// nextButtonを押下した際のイベント
export function nextButtonEvent(gameLogMaster: GameLog) {
	// ポインタをひとつ進める
    gameLogMaster.incrementPointer();

    // 画面表示を更新
    updateScreen(gameLogMaster);
}
