import { GameLog } from "../../model/GameData";

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
        firstPlayer.getDeck().forEach((card, index) => {
            const row = firstPlayerDeckTableBody.insertRow();
            const cell1 = row.insertCell(0);
            const cell2 = row.insertCell(1);
            cell1.textContent = index.toString();
            cell2.textContent = card.count.toString();
        });
    }

    const firstPlayerHandTableBody = document.getElementById('FirstPlayerHandTable')?.getElementsByTagName('tbody')[0];
    if (firstPlayerHandTableBody) {
        // テーブルのリセット
        while (firstPlayerHandTableBody.firstChild) {
            firstPlayerHandTableBody.removeChild(firstPlayerHandTableBody.firstChild);
        }
        
        // テーブルの再描画
        firstPlayer.getHand().forEach((card, index) => {
            const row = firstPlayerHandTableBody.insertRow();
            const cell1 = row.insertCell(0);
            const cell2 = row.insertCell(1);
            cell1.textContent = index.toString();
            cell2.textContent = card.count.toString();
        });
    }

    const firstPlayerDiscardTableBody = document.getElementById('FirstPlayerDiscardTable')?.getElementsByTagName('tbody')[0];
    if (firstPlayerDiscardTableBody) {
        // テーブルのリセット
        while (firstPlayerDiscardTableBody.firstChild) {
            firstPlayerDiscardTableBody.removeChild(firstPlayerDiscardTableBody.firstChild);
        }
        
        // テーブルの再描画
        firstPlayer.getDiscardArea().forEach((card, index) => {
            const row = firstPlayerDiscardTableBody.insertRow();
            const cell1 = row.insertCell(0);
            const cell2 = row.insertCell(1);
            cell1.textContent = index.toString();
            cell2.textContent = card.count.toString();
        });
    }

    const firstPlayerPlayTableBody = document.getElementById('FirstPlayerPlayTable')?.getElementsByTagName('tbody')[0];
    if (firstPlayerPlayTableBody) {
        // テーブルのリセット
        while (firstPlayerPlayTableBody.firstChild) {
            firstPlayerPlayTableBody.removeChild(firstPlayerPlayTableBody.firstChild);
        }
        
        // テーブルの再描画
        firstPlayer.getPlayArea().forEach((card, index) => {
            const row = firstPlayerPlayTableBody.insertRow();
            const cell1 = row.insertCell(0);
            const cell2 = row.insertCell(1);
            cell1.textContent = index.toString();
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
        secondPlayer.getDeck().forEach((card, index) => {
            const row = secondPlayerDeckTableBody.insertRow();
            const cell1 = row.insertCell(0);
            const cell2 = row.insertCell(1);
            cell1.textContent = index.toString();
            cell2.textContent = card.count.toString();
        });
    }

    const secondPlayerHandTableBody = document.getElementById('SecondPlayerHandTable')?.getElementsByTagName('tbody')[0];
    if (secondPlayerHandTableBody) {
        // テーブルのリセット
        while (secondPlayerHandTableBody.firstChild) {
            secondPlayerHandTableBody.removeChild(secondPlayerHandTableBody.firstChild);
        }

        // テーブルの再描画
        secondPlayer.getHand().forEach((card, index) => {
            const row = secondPlayerHandTableBody.insertRow();
            const cell1 = row.insertCell(0);
            const cell2 = row.insertCell(1);
            cell1.textContent = index.toString();
            cell2.textContent = card.count.toString();
        });
    }

    const secondPlayerDiscardTableBody = document.getElementById('SecondPlayerDiscardTable')?.getElementsByTagName('tbody')[0];
    if (secondPlayerDiscardTableBody) {
        // テーブルのリセット
        while (secondPlayerDiscardTableBody.firstChild) {
            secondPlayerDiscardTableBody.removeChild(secondPlayerDiscardTableBody.firstChild);
        }

        // テーブルの再描画
        secondPlayer.getDiscardArea().forEach((card, index) => {
            const row = secondPlayerDiscardTableBody.insertRow();
            const cell1 = row.insertCell(0);
            const cell2 = row.insertCell(1);
            cell1.textContent = index.toString();
            cell2.textContent = card.count.toString();
        });
    }

    const secondPlayerPlayTableBody = document.getElementById('SecondPlayerPlayTable')?.getElementsByTagName('tbody')[0];
    if (secondPlayerPlayTableBody) {
        // テーブルのリセット
        while (secondPlayerPlayTableBody.firstChild) {
            secondPlayerPlayTableBody.removeChild(secondPlayerPlayTableBody.firstChild);
        }

        // テーブルの再描画
        secondPlayer.getPlayArea().forEach((card, index) => {
            const row = secondPlayerPlayTableBody.insertRow();
            const cell1 = row.insertCell(0);
            const cell2 = row.insertCell(1);
            cell1.textContent = index.toString();
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
        logSection.forEach((log, index) => {
            const row = gameLogTableBody.insertRow();
            const cell = row.insertCell(0);
            cell.textContent = index + " : " + log.logSection;
            row.addEventListener('mouseover', () => {
                row.style.backgroundColor = 'lightgray';
            });
            row.addEventListener('mouseout', () => {
                row.style.backgroundColor = '';
            });
            row.addEventListener('click', () => {
                // クリックされた行のポインタをセットして再描画
                gameLogMaster.setPointer(index);
                updateScreen(gameLogMaster);
            });

            // ポインタの行にフォーカスを移動
            if (index === pointer) {
                row.scrollIntoView({ behavior: 'smooth', block: 'center' });
                row.classList.add('highlight'); // フォーカスを示すためのクラスを追加
            }
        });
    }

}


