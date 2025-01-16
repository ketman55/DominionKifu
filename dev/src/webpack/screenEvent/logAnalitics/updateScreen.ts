import { GameData } from "../../model/GameData";

export function updateScreen(gameDataMaster: GameData) {

    /*
     画面中央の表示
    */

    // 表示用のデータを取得
    const pointer = gameDataMaster.getPointer();
    let prevGameLog = gameDataMaster.getLogSectionArray()[pointer];
    if (0 < pointer) {
        prevGameLog = gameDataMaster.getLogSectionArray()[pointer - 1];
    }
    const targetGameLog = gameDataMaster.getLogSectionArray()[pointer];

    // サプライカードの表示
    const prevSupply = prevGameLog.supply;
    const supply = targetGameLog.supply;
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

            // 増減したカードの背景色を変更
            const prevCount = prevSupply.getBasicArea().find(c => c.name === card.name)?.count || 0;
            if (card.count !== prevCount) {
                cell2.style.backgroundColor = getBackgroundColor(card.count, prevCount);
                cell2.textContent = prevCount + "→" + card.count;
            }
        });
    }

    // キングダムカードの表示
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

            // 増減したカードの背景色を変更
            const prevCount = prevSupply.getKingdomArea().find(c => c.name === card.name)?.count || 0;
            if (card.count !== prevCount) {
                cell2.style.backgroundColor = getBackgroundColor(card.count, prevCount);
                cell2.textContent = prevCount + "→" + card.count;
            }
        });
    }

    // 廃棄エリア
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


            // 増減したカードの背景色を変更
            const prevCount = prevSupply.getTrashArea().find(c => c.name === card.name)?.count || 0;
            if (card.count !== prevCount) {
                cell2.style.backgroundColor = getBackgroundColor(card.count, prevCount);
                cell2.textContent = prevCount + "→" + card.count;
            }
        });
    }

    // FirstPlayerの表示
    const prevFirstPlayer = prevGameLog.firstPlayer;
    const firstPlayer = targetGameLog.firstPlayer;
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

            const totalGains = firstPlayer.getTotalGains().get(index) || 0;
            const nowInDeck = firstPlayer.getNowInDeck().get(index) || 0;
            const totalPlays = firstPlayer.getTotalPlays().get(index) || 0;
            const turnPlays = firstPlayer.getTurnPlays().get(index) || 0;

            cell1.textContent = index.toString();
            cell2.textContent = totalGains.toString();
            cell3.textContent = nowInDeck.toString();
            cell4.textContent = totalPlays.toString();
            cell5.textContent = turnPlays.toString();

            // 増減したカードの背景色を変更
            const prevTotalGains = prevFirstPlayer.getTotalGains().get(index) || 0;
            const prevNowInDeck = prevFirstPlayer.getNowInDeck().get(index) || 0;
            const prevTotalPlays = prevFirstPlayer.getTotalPlays().get(index) || 0;
            const prevTurnPlays = prevFirstPlayer.getTurnPlays().get(index) || 0;

            if (totalGains !== prevTotalGains) {
                cell2.style.backgroundColor = getBackgroundColor(totalGains, prevTotalGains);
                cell2.textContent = prevTotalGains + "→" + totalGains;
            }
            if (nowInDeck !== prevNowInDeck) {
                cell3.style.backgroundColor = getBackgroundColor(nowInDeck, prevNowInDeck);
                cell3.textContent = prevNowInDeck + "→" + nowInDeck.toString();
            }
            if (totalPlays !== prevTotalPlays) {
                cell4.style.backgroundColor = getBackgroundColor(totalPlays, prevTotalPlays);
                cell4.textContent = prevTotalPlays + "→" + totalPlays.toString();
            }
            if (turnPlays !== prevTurnPlays) {
                cell5.style.backgroundColor = getBackgroundColor(turnPlays, prevTurnPlays);
                cell5.textContent = prevTurnPlays + "→" + turnPlays.toString();
            }
        });
    }

    // SecondPlayerの表示
    const prevSecondPlayer = prevGameLog.secondPlayer;
    const secondPlayer = targetGameLog.secondPlayer;
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

            const totalGains = secondPlayer.getTotalGains().get(index) || 0;
            const nowInDeck = secondPlayer.getNowInDeck().get(index) || 0;
            const totalPlays = secondPlayer.getTotalPlays().get(index) || 0;
            const turnPlays = secondPlayer.getTurnPlays().get(index) || 0;

            cell1.textContent = index.toString();
            cell2.textContent = totalGains.toString();
            cell3.textContent = nowInDeck.toString();
            cell4.textContent = totalPlays.toString();
            cell5.textContent = turnPlays.toString();

            // 増減したカードの背景色を変更
            const prevTotalGains = prevFirstPlayer.getTotalGains().get(index) || 0;
            const prevNowInDeck = prevFirstPlayer.getNowInDeck().get(index) || 0;
            const prevTotalPlays = prevFirstPlayer.getTotalPlays().get(index) || 0;
            const prevTurnPlays = prevFirstPlayer.getTurnPlays().get(index) || 0;

            if (totalGains !== prevTotalGains) {
                cell2.style.backgroundColor = getBackgroundColor(totalGains, prevTotalGains);
                cell2.textContent = prevTotalGains + "→" + totalGains;
            }
            if (nowInDeck !== prevNowInDeck) {
                cell3.style.backgroundColor = getBackgroundColor(nowInDeck, prevNowInDeck);
                cell3.textContent = prevNowInDeck + "→" + nowInDeck.toString();
            }
            if (totalPlays !== prevTotalPlays) {
                cell4.style.backgroundColor = getBackgroundColor(totalPlays, prevTotalPlays);
                cell4.textContent = prevTotalPlays + "→" + totalPlays.toString();
            }
            if (turnPlays !== prevTurnPlays) {
                cell5.style.backgroundColor = getBackgroundColor(turnPlays, prevTurnPlays);
                cell5.textContent = prevTurnPlays + "→" + turnPlays.toString();
            }
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

function getBackgroundColor(count: number, prevCount: number): string {
    if (count < prevCount) {
        return 'yellow';
    } else if (count > prevCount) {
        return 'lightgreen';
    } else if (count == 0) {
        return 'red';
    }
    return '';
}


