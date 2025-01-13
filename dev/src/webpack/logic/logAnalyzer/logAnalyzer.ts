import { LogSectionInterface } from "../../interface/LogSectionInterface";
import { Player } from "../../model/Player";

// プレイヤーの行動メソッド
import { cleanUp } from "./methods/cleanUp";
import { starts } from "./methods/startsWith";
import { shuffles } from "./methods/shuffles";
import { draws } from "./methods/draws";
import { Supply } from "../../model/Supply";

interface logSec {
    prevLogSec: LogSectionInterface;
    currentLogSec: LogSectionInterface;
    nextLogSec: LogSectionInterface;
    next2LogSec: LogSectionInterface;
}

export function logAnalyzer(
    pointer: number,
    LogSec: LogSectionInterface[]): LogSectionInterface {

    // ログのセクションを取得（初期化）
    const l: LogSectionInterface = {
        supply: new Supply(),
        firstPlayer: new Player(),
        secondPlayer: new Player(),
        logSection: ""
    }

    let logSec: logSec = {
        prevLogSec: l,
        currentLogSec: l,
        nextLogSec: l,
        next2LogSec: l
    };

    // ログのセクションを取得
    if (pointer - 1 >= 0) logSec.prevLogSec = LogSec[pointer - 1];
    if (pointer >= 0) logSec.currentLogSec = LogSec[pointer];
    if (pointer + 1 < LogSec.length) logSec.nextLogSec = LogSec[pointer + 1];
    if (pointer + 2 < LogSec.length) logSec.next2LogSec = LogSec[pointer + 2];

    // ひとつ前のlogSectionの内容をディープコピー
    const supply = logSec.prevLogSec.supply.clone();
    const firstPlayer = logSec.prevLogSec.firstPlayer.clone();
    const secondPlayer = logSec.prevLogSec.secondPlayer.clone();

    // 今回のログの内容でクラスを更新する
    analyze(firstPlayer,
        secondPlayer,
        logSec);

    // 結果を登録する
    let logSection: LogSectionInterface = {
        supply: supply,
        firstPlayer: firstPlayer,
        secondPlayer: secondPlayer,
        logSection: logSec.currentLogSec.logSection
    };
    return logSection;
}

function analyze(
    firstPlayer: Player,
    secondPlayer: Player,
    logSec: logSec): void {

    // プレイヤー名を表すMap変数
    const playerMap = new Map<string, Player>();
    if (!firstPlayer.isPlayerNameEmpty()) {
        playerMap.set(firstPlayer.getPlayerName(), firstPlayer);
    }
    if (!secondPlayer.isPlayerNameEmpty()) {
        playerMap.set(secondPlayer.getPlayerName(), secondPlayer);
    }

    // CurrentLogSecの内容を解析する
    // 例：k draws 2 Coppers, 2 Estates, and a Trader.
    const logArray = logSec.currentLogSec.logSection
        .replace(/\./g, '') // すべてのピリオドを置換
        .replace(/,/g, '') // すべてのカンマを置換
        .split(' ');

    // 先を見て判定する必要のある処理用の変数
    const nextLogArray = logSec.nextLogSec.logSection.split(' ');
    const next2LogArray = logSec.next2LogSec.logSection.split(' ');

    /*
     クリーンナップ処理
     ・Turn1の場合は先行のみ
     ・Turn2以降でTurn 2 - xxxx のようなログがある場合
    */
    if (2 < nextLogArray.length
        && nextLogArray[0] === 'Turn'
        && nextLogArray[1] === '1'
        && logArray[0] === firstPlayer.getPlayerName()) {
        cleanUp(playerMap, logArray);

    } else if (2 < nextLogArray.length
        && nextLogArray[0] === 'Turn'
        && nextLogArray[1] !== '1') {
        cleanUp(playerMap, logArray);
    }

    /*
    通常アクションの処理
    */
    if (logArray.length < 2) return;
    const verb = logArray[1];
    const nextOfVerb = logArray[2];

    // ログの内容によって処理を分岐する
    switch (verb) {
        case 'starts':
            switch (nextOfVerb) {
                case 'with': // starts with＝初期処理
                    starts(playerMap, firstPlayer, secondPlayer, logArray);
                    break;
            }
            break;

        case 'draws': // デッキからカードを引く
            draws(playerMap, logArray);
            break;

        case 'shuffles': // 山札をシャッフルする
            shuffles(playerMap, logArray, next2LogArray);
            break;

        case 'buys':
            break;
    }
}