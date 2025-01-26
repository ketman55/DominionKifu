import { LogSectionInterface } from "../../interface/LogSectionInterface";
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

    /*
     Playerの表示
    */
    const lastGameLog = gameDataMaster.getLogSectionArray()[gameDataMaster.getLogSectionArray().length - 1];

    updatePlayerArea(
        prevGameLog,
        targetGameLog,
        lastGameLog,
        1);

    updatePlayerArea(
        prevGameLog,
        targetGameLog,
        lastGameLog,
        2);

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

// FirstPlayer, SecondPlayerの表示を更新
function updatePlayerArea(
    prevGameLog: LogSectionInterface,
    targetGameLog: LogSectionInterface,
    lastGameLog: LogSectionInterface,
    playerSwitch: number) { // 1: FirstPlayer, 2: SecondPlayer

    const player = playerSwitch === 1 ? targetGameLog.firstPlayer : targetGameLog.secondPlayer;

    // プレイヤー名に現在のターン数を追記
    const playerNameElement = playerSwitch === 1 ? 'FirstPlayerName' : 'SecondPlayerName';
    const playerName = document.getElementById(playerNameElement);
    const lastPlayer = playerSwitch === 1 ? lastGameLog.firstPlayer : lastGameLog.secondPlayer;
    if (playerName) {
        playerName.textContent =
            player.getPlayerName() +
            " Turn: " + player.getTurn().toString() +
            " / " + lastPlayer.getTurn().toString();
    }

    // テーブルの更新
    const prevPlayer = playerSwitch === 1 ? prevGameLog.firstPlayer : prevGameLog.secondPlayer;
    const tableElement = playerSwitch === 1 ? 'FirstPlayerDeckTable' : 'SecondPlayerDeckTable';

    const playerDeckTableBody = document.getElementById(tableElement)?.getElementsByTagName('tbody')[0];
    let firstPlayerSum = new Array(7).fill(0);
    if (playerDeckTableBody) {
        // テーブルのリセット
        while (playerDeckTableBody.firstChild) {
            playerDeckTableBody.removeChild(playerDeckTableBody.firstChild);
        }

        // テーブルの再描画
        player.getTotalGains().forEach((card, index) => {
            const row = playerDeckTableBody.insertRow();
            const cell1 = row.insertCell(0);
            const cell2 = row.insertCell(1);
            const cell3 = row.insertCell(2);
            const cell4 = row.insertCell(3);
            const cell5 = row.insertCell(4);
            const cell6 = row.insertCell(5);
            const cell7 = row.insertCell(6);

            const nowInDeck = player.getNowInDeck().get(index) || 0;
            const turnDraws = player.getTurnDraws().get(index) || 0;
            const turnPlays = player.getTurnPlays().get(index) || 0;

            const totalGains = player.getTotalGains().get(index) || 0;
            const totalDraws = player.getTotalDraws().get(index) || 0;
            const totalPlays = player.getTotalPlays().get(index) || 0;

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
            const prevNowInDeck = prevPlayer.getNowInDeck().get(index) || 0;
            const prevTurnDraws = prevPlayer.getTurnDraws().get(index) || 0;
            const prevTurnPlays = prevPlayer.getTurnPlays().get(index) || 0;

            const prevTotalGains = prevPlayer.getTotalGains().get(index) || 0;
            const prevTotalDraws = prevPlayer.getTotalDraws().get(index) || 0;
            const prevTotalPlays = prevPlayer.getTotalPlays().get(index) || 0;


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
    const playerDeckTableFoot = document.getElementById(tableElement)?.getElementsByTagName('tfoot')[0];
    if (playerDeckTableFoot) {
        // テーブルのリセット
        while (playerDeckTableFoot.firstChild) {
            playerDeckTableFoot.removeChild(playerDeckTableFoot.firstChild);
        }

        // テーブルの再描画
        const row = playerDeckTableFoot.insertRow();
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


