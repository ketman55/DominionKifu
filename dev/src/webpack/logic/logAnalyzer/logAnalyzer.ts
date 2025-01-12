import { LogSectionInterface } from "../../interface/LogSectionInterface";
import { Supply } from "../../model/Supply";
import { Player } from "../../model/Player";
import { draws } from "./methods/draws";

export function logAnalyzer(
    currentLogSec: LogSectionInterface,
    prevLogSec: LogSectionInterface): LogSectionInterface {

    // ひとつ前のlogSectionの内容をディープコピー
    const supply = prevLogSec.supply.clone();
    const firstPlayer = prevLogSec.firstPlayer.clone();
    const secondPlayer = prevLogSec.secondPlayer.clone();

    // 今回のログの内容でクラスを更新する
    analyze(supply, firstPlayer, secondPlayer, currentLogSec.logSection);

    // 結果を登録する
    let logSection: LogSectionInterface = {
        supply: supply,
        firstPlayer: firstPlayer,
        secondPlayer: secondPlayer,
        logSection: currentLogSec.logSection
    };

    return logSection;
}

function analyze(
    supply: Supply,
    firstPlayer: Player,
    secondPlayer: Player,
    logSection: string): void {

    // プレイヤー名を表すMap変数
    const playerMap = new Map<string, Player>();

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
        analyzeLogSection(supply, firstPlayer, logArray);

    } else if (secondPlayer.isPlayerNameMatch(logArray[0])) {
        analyzeLogSection(supply, secondPlayer, logArray);
    }
}

function analyzeLogSection(supply: Supply, player: Player, logArray: string[]): void {

    // ログの内容によって処理を分岐する
    switch (logArray[1]) {
        case 'starts': // プレイヤーの初期処理

        
        case 'draws':
            // デッキからカードを引く
            draws(player, logArray);
            break;

        case 'buys':
            break;
    }
}