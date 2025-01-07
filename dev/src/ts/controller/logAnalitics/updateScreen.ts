import { GameLog } from "../../model/GameLog";

export function updateScreen(gameLogMaster: GameLog) {

    /*
     画面中央の表示
    */

    // 初期表示用のデータを取得
    const pointer = gameLogMaster.getPointer();
    const targetGameLog = gameLogMaster.getLogSectionArray()[pointer];

    // 王国カードの初期表示
    let kingdom = targetGameLog.kingdom;
    const leftTableBody = document.getElementById('LeftSupplyTable')?.getElementsByTagName('tbody')[0];
    if (leftTableBody) {
        // テーブルのリセット
        while (leftTableBody.firstChild) {
            leftTableBody.removeChild(leftTableBody.firstChild);
        }
        
        // テーブルの再描画
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
        // テーブルのリセット
        while (rightTableBody.firstChild) {
            rightTableBody.removeChild(rightTableBody.firstChild);
        }
        
        // テーブルの再描画
        kingdom.getRightSupply().forEach(card => {
            const row = rightTableBody.insertRow();
            const cell1 = row.insertCell(0);
            const cell2 = row.insertCell(1);
            cell1.textContent = card.name;
            cell2.textContent = card.count.toString();
        });
    }

    // FirstPlayerの初期表示
    let firstPlayer = targetGameLog.firstPlayer;
    const firstPlayerDeckTableBody = document.getElementById('FirstPlayerDeckTable')?.getElementsByTagName('tbody')[0];
    if (firstPlayerDeckTableBody) {
        // テーブルのリセット
        while (firstPlayerDeckTableBody.firstChild) {
            firstPlayerDeckTableBody.removeChild(firstPlayerDeckTableBody.firstChild);
        }
        
        // テーブルの再描画
        firstPlayer.getDeck().forEach(card => {
            const row = firstPlayerDeckTableBody.insertRow();
            const cell1 = row.insertCell(0);
            const cell2 = row.insertCell(1);
            cell1.textContent = card.name;
            cell2.textContent = card.count.toString();
        });
    }

    // SecondPlayerの初期表示
    let secondPlayer = targetGameLog.secondPlayer;
    const secondPlayerDeckTableBody = document.getElementById('SecondPlayerDeckTable')?.getElementsByTagName('tbody')[0];
    if (secondPlayerDeckTableBody) {
        // テーブルのリセット
        while (secondPlayerDeckTableBody.firstChild) {
            secondPlayerDeckTableBody.removeChild(secondPlayerDeckTableBody.firstChild);
        }

        // テーブルの再描画
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
    const gameLogDisplay = document.getElementById('gameLogDisplay');
    if (gameLogDisplay) {
        gameLogDisplay.textContent = pointer.toString();
    }

    let logSection = gameLogMaster.getLogSectionArray();
    const gameLogTableBody = document.getElementById('gameLogTable')?.getElementsByTagName('tbody')[0];
    if (gameLogTableBody) {
        // テーブルのリセット
        while (gameLogTableBody.firstChild) {
            gameLogTableBody.removeChild(gameLogTableBody.firstChild);
        }
        
        // テーブルの再描画
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


