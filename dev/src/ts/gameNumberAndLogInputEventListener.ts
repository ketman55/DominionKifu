import { postGameData } from './postGameData';

document.getElementById('gameForm')?.addEventListener('submit', function (event) {
    // フォームのデフォルトの送信を防ぐ
    event.preventDefault();

    // 入力値を取得
    const gameNumber = (document.getElementById('gameNumber') as HTMLInputElement).value;
    const gameSupply = (document.getElementById('gameSupply') as HTMLTextAreaElement).value;
    const gameLog = (document.getElementById('gameLog') as HTMLTextAreaElement).value;

    // データを処理する
    postGameData(gameNumber, gameSupply, gameLog).then(success => {
        if (success) {
            // データ送信に成功した場合の処理
            window.location.href = 'logAnalitics.html';
        } else {
            // データ送信に失敗した場合の処理
            window.location.href = 'logAnalitics.html';
        }
    });
}
);