import { Kingdom } from "../../model/Kingdom";
import { Player } from "../../model/Player";
import { draws } from "./methods/draws";


export function analyzeLog(kingdom: Kingdom, firstPlayer: Player, secondPlayer: Player, logSection: string): void {

    // ピリオドは除去する
    logSection = logSection.replace('.', '');

    // ログをスペースで分割する
    const logArray = logSection.split(' ');

    // プレイヤー名が未登録の場合はプレイヤー名を設定する
    if (logArray[1] === 'starts'
        && firstPlayer.isPlayerNameEmpty()) {
        firstPlayer.setPlayerName(logArray[0]);

    } else if (logArray[1] === 'starts'
        && !firstPlayer.isPlayerNameMatch(logArray[0])
        && secondPlayer.isPlayerNameEmpty()) {
        secondPlayer.setPlayerName(logArray[0]);
    }

    // プレイヤー名に該当する方へログの内容を適用する
    if (firstPlayer.isPlayerNameMatch(logArray[0])) {
        analyzeLogSection(kingdom, firstPlayer, logArray);

    } else if (secondPlayer.isPlayerNameMatch(logArray[0])) {
        analyzeLogSection(kingdom, secondPlayer, logArray);
    }
}

function analyzeLogSection(kingdom: Kingdom, player: Player, logArray: string[]): void {

    // ログの内容によって処理を分岐する
    switch (logArray[1]) {
        case 'draws':
            // デッキからカードを引く
            draws(player, logArray);
            break;

        case 'buys':
            break;
    }
}