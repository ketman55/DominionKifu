import { GameData } from '../../model/GameData';
import { updateScreen } from './updateScreen';

// prevButtonを押下した際のイベント
export function prevButtonEvent(gameDataMaster: GameData) {
    // ポインタをひとつ戻す
    gameDataMaster.decrementPointer();

    // 画面表示を更新
    updateScreen(gameDataMaster);

}

// nextButtonを押下した際のイベント
export function nextButtonEvent(gameDataMaster: GameData) {
	// ポインタをひとつ進める
    gameDataMaster.incrementPointer();

    // 画面表示を更新
    updateScreen(gameDataMaster);
}
