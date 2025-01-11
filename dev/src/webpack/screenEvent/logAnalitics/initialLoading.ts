import { GameLog } from '../../model/GameData';
import { updateScreen } from './updateScreen';

// 初期処理
export function init(gameLogMaster: GameLog) {
    /*
     ローカルストレージからデータを取得
    */
    const gameNumber = localStorage.getItem('gameNumber') || '';
    const gameSupply = localStorage.getItem('gameSupply') || '';
    const gameLog = localStorage.getItem('gameLog') || '';

    /*
     画面右側の表示
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
    // ログデータとサプライデータを注入
    gameLogMaster.make(gameNumber, gameLog, gameSupply);
    
    // 初期表示用のデータを取得
    updateScreen(gameLogMaster);
    
    /*
     画面右側の表示
    */
    const gameLogDisplay = document.getElementById('gameLogDisplay');
    if (gameLogDisplay) {
        gameLogDisplay.textContent = gameLogMaster.getPointer().toString();
    }

    let logSection = gameLogMaster.getLogSectionArray();
    const gameLogTableBody = document.getElementById('gameLogTable')?.getElementsByTagName('tbody')[0];
    if (gameLogTableBody) {
        logSection.forEach(log => {
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
            alert(log.logSection);
        });
        });
    }

}
