import { GameLog } from '../../model/GameLog';
import { updateScreen } from './updateScreen';

// prevButtonを押下した際のイベント
document.getElementById('prevButton')?.addEventListener('click', prevButtonEvent);
function prevButtonEvent() {
    // ポインタをひとつ戻す
    const gameLogMaster = new GameLog();
    gameLogMaster.decrementPointer();

    // 画面表示を更新
    updateScreen(gameLogMaster);

}

// nextButtonを押下した際のイベント
document.getElementById('nextButton')?.addEventListener('click', nextButtonEvent);
function nextButtonEvent() {
	// ポインタをひとつ進める
    const gameLogMaster = new GameLog();
    gameLogMaster.incrementPointer();

    // 画面表示を更新
    updateScreen(gameLogMaster);
}
