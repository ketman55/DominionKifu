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

    // プレイヤー名の表示
    const firstPlayerName = document.getElementById('FirstPlayerName');
    if (firstPlayerName) {
        firstPlayerName.textContent = "Player1 " + targetGameLog.firstPlayer.getPlayerName();
    }
    const secondPlayerName = document.getElementById('SecondPlayerName');
    if (secondPlayerName) {
        secondPlayerName.textContent = "Player2 " + targetGameLog.secondPlayer.getPlayerName();
    }

    // ログの表示
    const log = targetGameLog.logSection;
    const logDisplay = document.getElementById('logAtPoint');
    if (logDisplay) {
        logDisplay.textContent = log;
    }

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
            cell2.style.backgroundColor = getBackgroundColor(card.count, prevCount);
            if (card.count !== prevCount) {
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
            cell2.style.backgroundColor = getBackgroundColor(card.count, prevCount);
            if (card.count !== prevCount) {
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
            cell2.style.backgroundColor = getBackgroundColor(card.count, prevCount);
            if (card.count !== prevCount) {
                cell2.textContent = prevCount + "→" + card.count;
            }
        });
    }

    // FirstPlayerの表示
    const prevFirstPlayer = prevGameLog.firstPlayer;
    const firstPlayer = targetGameLog.firstPlayer;
    const firstPlayerDeckTableBody = document.getElementById('FirstPlayerDeckTable')?.getElementsByTagName('tbody')[0];
    let firstPlayerSum = new Array(7).fill(0);
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
            const cell6 = row.insertCell(5);
            const cell7 = row.insertCell(6);

            const nowInDeck = firstPlayer.getNowInDeck().get(index) || 0;
            const turnDraws = firstPlayer.getTurnDraws().get(index) || 0;
            const turnPlays = firstPlayer.getTurnPlays().get(index) || 0;

            const totalGains = firstPlayer.getTotalGains().get(index) || 0;
            const totalDraws = firstPlayer.getTotalDraws().get(index) || 0;
            const totalPlays = firstPlayer.getTotalPlays().get(index) || 0;

            cell1.textContent = index.toString();

            cell2.textContent = nowInDeck.toString();
            cell3.textContent = turnDraws.toString();
            cell4.textContent = turnPlays.toString();

            cell5.textContent = totalGains.toString();
            cell6.textContent = totalDraws.toString();
            cell7.textContent = totalPlays.toString();


            firstPlayerSum[0] += nowInDeck;
            firstPlayerSum[1] += turnDraws;
            firstPlayerSum[2] += turnPlays;
            firstPlayerSum[3] += totalGains;
            firstPlayerSum[4] += totalDraws;
            firstPlayerSum[5] += totalPlays;
            firstPlayerSum[6] += totalGains;

            // 増減したカードの背景色を変更
            const prevNowInDeck = prevFirstPlayer.getNowInDeck().get(index) || 0;
            const prevTurnDraws = prevFirstPlayer.getTurnDraws().get(index) || 0;
            const prevTurnPlays = prevFirstPlayer.getTurnPlays().get(index) || 0;

            const prevTotalGains = prevFirstPlayer.getTotalGains().get(index) || 0;
            const prevTotalDraws = prevFirstPlayer.getTotalDraws().get(index) || 0;
            const prevTotalPlays = prevFirstPlayer.getTotalPlays().get(index) || 0;


            if (nowInDeck !== prevNowInDeck) {
                cell2.style.backgroundColor = getBackgroundColor(nowInDeck, prevNowInDeck);
                cell2.textContent = prevNowInDeck + "→" + nowInDeck.toString();
            }
            if (turnDraws !== prevTurnDraws) {
                cell3.style.backgroundColor = getBackgroundColor(turnDraws, prevTurnDraws);
                cell3.textContent = prevTurnDraws + "→" + turnDraws.toString();
            }
            if (turnPlays !== prevTurnPlays) {
                cell4.style.backgroundColor = getBackgroundColor(turnPlays, prevTurnPlays);
                cell4.textContent = prevTurnPlays + "→" + turnPlays.toString();
            }

            /*
            WIP：合計系は色を変えない方が観易いかもしれないので一旦コメントアウト
            if (totalGains !== prevTotalGains) {
                cell5.style.backgroundColor = getBackgroundColor(totalGains, prevTotalGains);
                cell5.textContent = prevTotalGains + "→" + totalGains;
            }
            if (totalDraws !== prevTotalDraws) {
                cell6.style.backgroundColor = getBackgroundColor(totalDraws, prevTotalDraws);
                cell6.textContent = prevTotalDraws + "→" + totalDraws.toString();
            }
            if (totalPlays !== prevTotalPlays) {
                cell7.style.backgroundColor = getBackgroundColor(totalPlays, prevTotalPlays);
                cell7.textContent = prevTotalPlays + "→" + totalPlays.toString();
            }*/
        });
    }
    const firstPlayerDeckTableFoot = document.getElementById('FirstPlayerDeckTable')?.getElementsByTagName('tfoot')[0];
    if (firstPlayerDeckTableFoot) {
        // テーブルのリセット
        while (firstPlayerDeckTableFoot.firstChild) {
            firstPlayerDeckTableFoot.removeChild(firstPlayerDeckTableFoot.firstChild);
        }

        // テーブルの再描画
        const row = firstPlayerDeckTableFoot.insertRow();
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);
        const cell4 = row.insertCell(3);
        const cell5 = row.insertCell(4);
        const cell6 = row.insertCell(5);
        const cell7 = row.insertCell(6);

        cell1.textContent = "Sum";
        cell2.textContent = firstPlayerSum[0].toString();
        cell3.textContent = firstPlayerSum[1].toString();
        cell4.textContent = firstPlayerSum[2].toString();
        cell5.textContent = firstPlayerSum[3].toString();
        cell6.textContent = firstPlayerSum[4].toString();
        cell7.textContent = firstPlayerSum[5].toString();
    }

    // SecondPlayerの表示
    const prevSecondPlayer = prevGameLog.secondPlayer;
    const secondPlayer = targetGameLog.secondPlayer;
    const secondPlayerDeckTableBody = document.getElementById('SecondPlayerDeckTable')?.getElementsByTagName('tbody')[0];
    let secondPlayerSum = new Array(7).fill(0);
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
            const cell6 = row.insertCell(5);
            const cell7 = row.insertCell(6);

            const nowInDeck = secondPlayer.getNowInDeck().get(index) || 0;
            const turnDraws = secondPlayer.getTurnDraws().get(index) || 0;
            const turnPlays = secondPlayer.getTurnPlays().get(index) || 0;

            const totalGains = secondPlayer.getTotalGains().get(index) || 0;
            const totalDraws = secondPlayer.getTotalDraws().get(index) || 0;
            const totalPlays = secondPlayer.getTotalPlays().get(index) || 0;

            secondPlayerSum[0] += nowInDeck;
            secondPlayerSum[1] += turnDraws;
            secondPlayerSum[2] += turnPlays;
            secondPlayerSum[3] += totalGains;
            secondPlayerSum[4] += totalDraws;
            secondPlayerSum[5] += totalPlays;
            secondPlayerSum[6] += totalGains;

            cell1.textContent = index.toString();

            cell2.textContent = nowInDeck.toString();
            cell3.textContent = turnDraws.toString();
            cell4.textContent = turnPlays.toString();

            cell5.textContent = totalGains.toString();
            cell6.textContent = totalDraws.toString();
            cell7.textContent = totalPlays.toString();

            // 増減したカードの背景色を変更
            const prevNowInDeck = prevSecondPlayer.getNowInDeck().get(index) || 0;
            const prevTurnDraws = prevSecondPlayer.getTurnDraws().get(index) || 0;
            const prevTurnPlays = prevSecondPlayer.getTurnPlays().get(index) || 0;

            const prevTotalGains = prevSecondPlayer.getTotalGains().get(index) || 0;
            const prevTotalDraws = prevSecondPlayer.getTotalDraws().get(index) || 0;
            const prevTotalPlays = prevSecondPlayer.getTotalPlays().get(index) || 0;


            if (nowInDeck !== prevNowInDeck) {
                cell2.style.backgroundColor = getBackgroundColor(nowInDeck, prevNowInDeck);
                cell2.textContent = prevNowInDeck + "→" + nowInDeck.toString();
            }
            if (turnDraws !== prevTurnDraws) {
                cell3.style.backgroundColor = getBackgroundColor(turnDraws, prevTurnDraws);
                cell3.textContent = prevTurnDraws + "→" + turnDraws.toString();
            }
            if (turnPlays !== prevTurnPlays) {
                cell4.style.backgroundColor = getBackgroundColor(turnPlays, prevTurnPlays);
                cell4.textContent = prevTurnPlays + "→" + turnPlays.toString();
            }

            /*
            WIP：合計系は色を変えない方が観易いかもしれないので一旦コメントアウト
            if (totalGains !== prevTotalGains) {
                cell5.style.backgroundColor = getBackgroundColor(totalGains, prevTotalGains);
                cell5.textContent = prevTotalGains + "→" + totalGains;
            }
            if (totalDraws !== prevTotalDraws) {
                cell6.style.backgroundColor = getBackgroundColor(totalDraws, prevTotalDraws);
                cell6.textContent = prevTotalDraws + "→" + totalDraws.toString();
            }
            if (totalPlays !== prevTotalPlays) {
                cell7.style.backgroundColor = getBackgroundColor(totalPlays, prevTotalPlays);
                cell7.textContent = prevTotalPlays + "→" + totalPlays.toString();
            }
            */
        });
    }

    const secondPlayerDeckTableFoot = document.getElementById('SecondPlayerDeckTable')?.getElementsByTagName('tfoot')[0];
    if (secondPlayerDeckTableFoot) {
        // テーブルのリセット
        while (secondPlayerDeckTableFoot.firstChild) {
            secondPlayerDeckTableFoot.removeChild(secondPlayerDeckTableFoot.firstChild);
        }

        // テーブルの再描画
        const row = secondPlayerDeckTableFoot.insertRow();
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);
        const cell4 = row.insertCell(3);
        const cell5 = row.insertCell(4);
        const cell6 = row.insertCell(5);
        const cell7 = row.insertCell(6);

        cell1.textContent = "Sum";
        cell2.textContent = secondPlayerSum[0].toString();
        cell3.textContent = secondPlayerSum[1].toString();
        cell4.textContent = secondPlayerSum[2].toString();
        cell5.textContent = secondPlayerSum[3].toString();
        cell6.textContent = secondPlayerSum[4].toString();
        cell7.textContent = secondPlayerSum[5].toString();
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


