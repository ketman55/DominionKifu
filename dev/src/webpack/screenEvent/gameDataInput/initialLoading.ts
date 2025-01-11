import { getGameNumberList } from "../../logic/getGameNumberList";

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
                    cell.textContent = "test" + gameNumber;
                    console.log(gameNumber);
                    row.addEventListener('mouseover', () => {
                        row.style.backgroundColor = 'lightgray';
                    });
                    row.addEventListener('mouseout', () => {
                        row.style.backgroundColor = '';
                    });
                    row.addEventListener('click', () => {
                        alert("yes");
                    });
                });
            }
            );
        }
    });