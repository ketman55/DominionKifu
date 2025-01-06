import { gameLogMaster } from './globalState';
import { updateScreen } from './updateScreen';

// prevButtonを押下した際のイベント
document.getElementById('prevButton')?.addEventListener('click', prevButtonEvent);
function prevButtonEvent() {
    // ポインタをひとつ戻す
    gameLogMaster.decrementPointer();

    // 画面表示を更新
    updateScreen();

}

// nextButtonを押下した際のイベント
document.getElementById('nextButton')?.addEventListener('click', nextButtonEvent);
function nextButtonEvent() {
	// ポインタをひとつ進める
    gameLogMaster.incrementPointer();

    // 画面表示を更新
    updateScreen();
}
