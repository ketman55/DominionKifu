import { GameData } from '../../model/GameData';
import { updateScreen } from './updateScreen';
import { getComment } from '../../logic/callApi/getComment';
import { gameDataInitializer } from '../../logic/gameDataInitializer';

// 初期処理
export async function initialLoading(gameDataMaster: GameData): Promise<void> {
    /*
     ローカルストレージからデータを取得
     GameDataの初期化
    */
    const gameNumber = localStorage.getItem('gameNumber') || '';
    const gameSupply = localStorage.getItem('gameSupply') || '';
    const gameLog = localStorage.getItem('gameLog') || '';

    const gameLogInterface = {
        gameNumber: gameNumber,
        gameSupply: gameSupply,
        gameLog: gameLog
    };

    gameDataMaster.setGameNumber(gameNumber);
    gameDataMaster.setGameSupply(gameSupply);
    gameDataMaster.setGameLog(gameLog);
    gameDataInitializer(gameDataMaster, gameLogInterface);

    /*
     サーバからコメントを取得
     GameDataにコメントをセット
    */
    const comment = getComment(gameNumber);
    gameDataMaster.setComment(await comment);
    console.log("init:get comment from server success");

    /*
     画面中央（上部）の表示
    */
    const gameNumberDisplay = document.getElementById('gameNumberDisplay');
    if (gameNumberDisplay) {
        gameNumberDisplay.textContent = gameNumber;
    }

    const gameSupplyDisplay = document.getElementById('gameSupplyDisplay');
    if (gameSupplyDisplay) {
        gameSupplyDisplay.textContent = gameSupply;
    }

    /*
     画面中央の表示
    */
    updateScreen(gameDataMaster);

    /*
     画面右側の表示
    */
    // ログの表示位置を示すポインタを表示
    const gameLogDisplay = document.getElementById('gameLogDisplay');
    if (gameLogDisplay) {
        gameLogDisplay.textContent = gameDataMaster.getPointer().toString();
    }

    // ログを表示
    let logSection = gameDataMaster.getLogSectionArray();
    const gameLogTableBody = document.getElementById('gameLogTable')?.getElementsByTagName('tbody')[0];
    if (gameLogTableBody) {
        logSection.forEach((log,index) => {
            const row = gameLogTableBody.insertRow();
            const cell = row.insertCell(0);
            cell.textContent = log.logSection;
            row.addEventListener('mouseover', () => {
                row.style.backgroundColor = 'lightgray';
            });
            row.addEventListener('mouseout', () => {
                row.style.backgroundColor = '';
            });
            row.addEventListener('click', () => {
                // クリックされた行のポインタをセットして再描画
                gameDataMaster.setPointer(index);
                updateScreen(gameDataMaster);
            });
        });
    }

    // コメントの表示
    const commentTableBody = document.getElementById('commentTable')?.getElementsByTagName('tbody')[0];
    if (commentTableBody) {
        gameDataMaster.getComment().forEach(comment => {
            const row = commentTableBody.insertRow();
            const cell = row.insertCell(0);
            cell.textContent = comment.pointer + ": " + comment.comment;
            row.addEventListener('mouseover', () => {
                row.style.backgroundColor = 'lightgray';
            });
            row.addEventListener('mouseout', () => {
                row.style.backgroundColor = '';
            });
            row.addEventListener('click', () => {
                gameDataMaster.setPointer(comment.pointer);
                updateScreen(gameDataMaster);
            });
        });
    }
}
