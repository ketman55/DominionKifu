import { LogSectionInterface } from "../../interface/LogSectionInterface";
import { Supply } from "../../model/Supply";
import { Player } from "../../model/Player";

// プレイヤーの行動メソッド
import { starts } from "./methods/starts";
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
    if(!firstPlayer.isPlayerNameEmpty()) {
        playerMap.set(firstPlayer.getPlayerName(), firstPlayer);
    }
    if(!secondPlayer.isPlayerNameEmpty()) {
        playerMap.set(secondPlayer.getPlayerName(), secondPlayer);
    }

    // ピリオドは除去する
    logSection = logSection.replace('.', '');

    // ログをスペースで分割する
    // 例：k draws 3 Coppers and 2 Estates.
    const logArray = logSection.split(' ');
    const verb = logArray[1];

    // ログの内容によって処理を分岐する
    switch (verb) {
        case 'starts': // プレイヤーの初期処理
            starts(playerMap, firstPlayer, secondPlayer, logArray);
            break;
        
        case 'draws': // デッキからカードを引く
            draws(playerMap, logArray);
            break;

        case 'buys':
            break;
    }
}