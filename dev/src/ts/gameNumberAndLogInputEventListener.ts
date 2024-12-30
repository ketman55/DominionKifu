import { postGameData } from './postGameData';

document.getElementById('gameForm')?.addEventListener('submit', function(event) {
    event.preventDefault(); // フォームのデフォルトの送信を防ぐ

    // 入力値を取得
    const gameNumber = (document.getElementById('gameNumber') as HTMLInputElement).value;
    const gameSupply = (document.getElementById('gameSupply') as HTMLTextAreaElement).value;
    const gameLog = (document.getElementById('gameLog') as HTMLTextAreaElement).value;

    // データを処理する
    postGameData(gameNumber, gameSupply, gameLog).then(success => {
        if (success) {
            // データ送信に成功した場合の処理

            // ローカルストレージに値を保存
            localStorage.setItem('gameNumber', gameNumber);
            localStorage.setItem('gameSupply', gameSupply);
            localStorage.setItem('gameLog', gameLog);

            // 次のページに遷移
            window.location.href = 'logAnalitics.html';
        } else {
            console.error('データ送信に失敗しました');
        }
    }).catch(error => {
        console.error('エラーが発生しました:', error);
    });
});