// /d:/develop/git/DominionKifu/dev/src/ts/logAnaliticsEventListener.ts

function logAnaliticsInit() {
    // ローカルストレージからデータを取得して表示
    const gameNumber = localStorage.getItem('gameNumber');
    const gameSupply = localStorage.getItem('gameSupply');
    const gameLog = localStorage.getItem('gameLog');

    const gameNumberDisplay = document.getElementById('gameNumberDisplay');
    if (gameNumberDisplay) {
        gameNumberDisplay.textContent = gameNumber;
    }    

    const gameSupplyDisplay = document.getElementById('gameSupplyDisplay');
    if (gameSupplyDisplay) {
        gameSupplyDisplay.textContent = gameSupply;
    }

    const gameLogDisplay = document.getElementById('gameLogDisplay');
    if (gameLogDisplay) {
        gameLogDisplay.textContent = gameLog;
    }
}

// ページロード時にlogAnaliticsInitを呼び出す
window.addEventListener('load', logAnaliticsInit);
