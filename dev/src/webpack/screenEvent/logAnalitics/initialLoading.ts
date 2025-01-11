import { analyzeLog } from '../../logic/logAnalyzer/logAnalyzer';
import { GameData } from '../../model/GameData';
import { updateScreen } from './updateScreen';

// 初期処理
export function init(gameDataMaster: GameData): void {
    /*
     ローカルストレージからデータを取得
     GameDataの初期化
    */
    const gameNumber = localStorage.getItem('gameNumber') || '';
    const gameSupply = localStorage.getItem('gameSupply') || '';
    const gameLog = localStorage.getItem('gameLog') || '';

    gameDataMaster.make(gameNumber, gameLog, gameSupply);
    analyzeLog(gameDataMaster);

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
    
    // 初期表示用のデータを取得
    updateScreen(gameDataMaster);
    
    /*
     画面右側の表示
    */
    const gameLogDisplay = document.getElementById('gameLogDisplay');
    if (gameLogDisplay) {
        gameLogDisplay.textContent = gameDataMaster.getPointer().toString();
    }

    let logSection = gameDataMaster.getLogSectionArray();
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
