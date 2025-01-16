import { GameData } from "../../model/GameData";

export function updateScreen(gameDataMaster: GameData) {

    /*
     画面中央の表示
    */

    // 初期表示用のデータを取得
    const pointer = gameDataMaster.getPointer();
    const targetGameLog = gameDataMaster.getLogSectionArray()[pointer];

    // サプライカードの初期表示
    let supply = targetGameLog.supply;
    const basicAreaTableBody = document.getElementById('BasicAreaTable')?.getElementsByTagName('tbody')[0];
    if (basicAreaTableBody) {
        // テーブルのリセット
        while (basicAreaTableBody.firstChild) {
            basicAreaTableBody.removeChild(basicAreaTableBody.firstChild);
        }
        
        // テーブルの再描画
        supply.getBasicArea().forEach(card => {
            const row = basicAreaTableBody.insertRow();
            const cell1 = row.insertCell(0);
            const cell2 = row.insertCell(1);
            cell1.textContent = card.name;
            cell2.textContent = card.count.toString();
        });
    }

    const kingdomAreaTableBody = document.getElementById('KingdomAreaTable')?.getElementsByTagName('tbody')[0];
    if (kingdomAreaTableBody) {
        // テーブルのリセット
        while (kingdomAreaTableBody.firstChild) {
            kingdomAreaTableBody.removeChild(kingdomAreaTableBody.firstChild);
        }
        
        // テーブルの再描画
        supply.getKingdomArea().forEach(card => {
            const row = kingdomAreaTableBody.insertRow();
            const cell1 = row.insertCell(0);
            const cell2 = row.insertCell(1);
            cell1.textContent = card.name;
            cell2.textContent = card.count.toString();
        });
    }

    const trashAreaTableBody = document.getElementById('TrashAreaTable')?.getElementsByTagName('tbody')[0];
    if (trashAreaTableBody) {
        // テーブルのリセット
        while (trashAreaTableBody.firstChild) {
            trashAreaTableBody.removeChild(trashAreaTableBody.firstChild);
        }
        
        // テーブルの再描画
        supply.getTrashArea().forEach(card => {
            const row = trashAreaTableBody.insertRow();
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
        firstPlayer.getTotalGains().forEach((card, index) => {
            const row = firstPlayerDeckTableBody.insertRow();
            const cell1 = row.insertCell(0);
            const cell2 = row.insertCell(1);
            const cell3 = row.insertCell(2);
            const cell4 = row.insertCell(3);
            const cell5 = row.insertCell(4);

            cell1.textContent = index.toString();
            cell2.textContent = (firstPlayer.getTotalGains().get(index) || "0").toString();
            cell3.textContent = (firstPlayer.getTotalPlays().get(index) || "0").toString();
            cell4.textContent = (firstPlayer.getNowInDeck().get(index) || "0").toString();
            cell5.textContent = (firstPlayer.getTurnPlays().get(index) || "0").toString();
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
        secondPlayer.getTotalGains().forEach((card, index) => {
            const row = secondPlayerDeckTableBody.insertRow();
            const cell1 = row.insertCell(0);
            const cell2 = row.insertCell(1);
            const cell3 = row.insertCell(2);
            const cell4 = row.insertCell(3);
            const cell5 = row.insertCell(4);

            cell1.textContent = index.toString();
            cell2.textContent = (secondPlayer.getTotalGains().get(index) || "0").toString();
            cell3.textContent = (secondPlayer.getTotalPlays().get(index) || "0").toString();
            cell4.textContent = (secondPlayer.getNowInDeck().get(index) || "0").toString();
            cell5.textContent = (secondPlayer.getTurnPlays().get(index) || "0").toString();
        });
    }

    /*
     画面右側の表示
    */
    // ゲームログのポインタの表示
    const gameLogDisplay = document.getElementById('gameLogDisplay');
    if (gameLogDisplay) {
        gameLogDisplay.textContent = pointer.toString();
    }

    // ゲームログの表示
    let logSection = gameDataMaster.getLogSectionArray();
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
                gameDataMaster.setPointer(index);
                updateScreen(gameDataMaster);
            });

            // ポインタの行にフォーカスを移動
            if (index === pointer) {
                row.scrollIntoView({ behavior: 'smooth', block: 'center' });
                row.classList.add('highlight'); // フォーカスを示すためのクラスを追加
            }
        });
    }
}


