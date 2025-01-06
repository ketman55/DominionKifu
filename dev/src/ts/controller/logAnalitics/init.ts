import { gameLogMaster } from './globalState';
import { GameLog } from '../../model/GameLog';

// 初期処理
function init() {
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
    const initialGameLog = gameLogMaster.getLogSectionArray()[0];

    // 王国カードの初期表示
    let kingdom = initialGameLog.kingdom;
    const leftTableBody = document.getElementById('LeftSupplyTable')?.getElementsByTagName('tbody')[0];
    if (leftTableBody) {
        kingdom.getLeftSupply().forEach(card => {
            const row = leftTableBody.insertRow();
            const cell1 = row.insertCell(0);
            const cell2 = row.insertCell(1);
            cell1.textContent = card.name;
            cell2.textContent = card.count.toString();
        });
    }

    const rightTableBody = document.getElementById('RightSupplyTable')?.getElementsByTagName('tbody')[0];
    if (rightTableBody) {
        kingdom.getRightSupply().forEach(card => {
            const row = rightTableBody.insertRow();
            const cell1 = row.insertCell(0);
            const cell2 = row.insertCell(1);
            cell1.textContent = card.name;
            cell2.textContent = card.count.toString();
        });
    }

    // FirstPlayerの初期表示
    let firstPlayer = initialGameLog.firstPlayer;
    const firstPlayerDeckTableBody = document.getElementById('FirstPlayerDeckTable')?.getElementsByTagName('tbody')[0];
    if (firstPlayerDeckTableBody) {
        firstPlayer.getDeck().forEach(card => {
            const row = firstPlayerDeckTableBody.insertRow();
            const cell1 = row.insertCell(0);
            const cell2 = row.insertCell(1);
            cell1.textContent = card.name;
            cell2.textContent = card.count.toString();
        });
    }

    // SecondPlayerの初期表示
    let secondPlayer = initialGameLog.secondPlayer;
    const secondPlayerDeckTableBody = document.getElementById('SecondPlayerDeckTable')?.getElementsByTagName('tbody')[0];
    if (secondPlayerDeckTableBody) {
        secondPlayer.getDeck().forEach(card => {
            const row = secondPlayerDeckTableBody.insertRow();
            const cell1 = row.insertCell(0);
            const cell2 = row.insertCell(1);
            cell1.textContent = card.name;
            cell2.textContent = card.count.toString();
        });
    }

    /*
     画面右側の表示
    */
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

// ページロード時にlogAnaliticsInitを呼び出す
window.addEventListener('load', init);
