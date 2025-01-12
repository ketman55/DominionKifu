import { getGameLog } from '../../logic/getGameLog';
import { saveGameLog } from '../../logic/saveGameLog';

export function clickGameNumber(gameNumber:string): void {

    // getGameLogを叩いて、gameLogを取得
    getGameLog(gameNumber).then((gameLog) => {
        saveGameLog(gameLog);
        // ログ解析画面に遷移
        window.location.href = 'logAnalytics.html';
    });
};
