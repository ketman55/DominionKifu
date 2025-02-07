import { getGameNumberList } from "../../logic/callApi/getGameNumberList";
import { clickGameNumber } from "./clickGameNumber";

/**
 * この画面が読み込まれたときに実行される処理
 * サーバ側に保存されているゲームナンバーのリストを取得して
 * 画面に一覧表示する
 */
window.addEventListener('load',
    function () {
        // ゲームナンバーのリストを取得
        const gameNumberList = getGameNumberList();

        // gameLogTableにデータを表示
        const gameLogTableBody = document.getElementById('gameTable')?.getElementsByTagName('tbody')[0];
        if (gameLogTableBody) {
            console.log(gameNumberList);

            gameNumberList.then(gameNumberList => {
                gameNumberList.forEach(gameNumber => {
                    const row = gameLogTableBody.insertRow();
                    const cell = row.insertCell(0);
                    cell.textContent = gameNumber;
                    console.log(gameNumber);
                    row.addEventListener('mouseover', () => {
                        row.style.backgroundColor = 'yellow';
                    });
                    row.addEventListener('mouseout', () => {
                        row.style.backgroundColor = '';
                    });
                    row.addEventListener('click', () => {
                        clickGameNumber(gameNumber);
                    });
                });
            }
            );
        }
    });