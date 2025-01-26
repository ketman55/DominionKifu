import { LogSectionInterface } from "../../interface/LogSectionInterface";
import { Player } from "../../model/Player";

// プレイヤーの行動メソッド
import { cleanUp } from "./methods/cleanUp";
import { startsWith } from "./methods/startsWith";
import { shuffles } from "./methods/shuffles";
import { draws } from "./methods/draws";
import { Supply } from "../../model/Supply";
import { plays } from "./methods/plays";
import { buys } from "./methods/buys";
import { trashes } from "./methods/trashes";
import { gains } from "./methods/gains";

interface logSec {
    prevLogSec: LogSectionInterface;
    currentLogSec: LogSectionInterface;
    nextLogSec: LogSectionInterface;
    next2LogSec: LogSectionInterface;
}

export function logAnalyzer(
    pointer: number,
    l: LogSectionInterface[]): LogSectionInterface {

    // ログのセクションを初期化
    let logSec: logSec = {
        prevLogSec: {} as LogSectionInterface,
        currentLogSec: {} as LogSectionInterface,
        nextLogSec: {} as LogSectionInterface,
        next2LogSec: {} as LogSectionInterface,
    };

    // ログのセクションを取得
    if (pointer - 1 >= 0) logSec.prevLogSec = l[pointer - 1];
    if (pointer >= 0) logSec.currentLogSec = l[pointer];
    if (pointer + 1 < l.length) logSec.nextLogSec = l[pointer + 1];
    if (pointer + 2 < l.length) logSec.next2LogSec = l[pointer + 2];

    // ひとつ前のlogSectionの内容をディープコピー
    const supply = logSec.prevLogSec.supply.clone();
    const firstPlayer = logSec.prevLogSec.firstPlayer.clone();
    const secondPlayer = logSec.prevLogSec.secondPlayer.clone();

    // 匿名化対応：Turnに含まれるプレイヤー名を消去する
    let currentLogSection = logSec.currentLogSec.logSection;
    if (currentLogSection.includes('Turn')) {
        currentLogSection = currentLogSection.replace(/(Turn \d+) .+/, '$1');
        if(firstPlayer.getTurn() === secondPlayer.getTurn()) {
            // firstPlayerのターンが始まる状態
            currentLogSection += ' - ' + firstPlayer.getPlayerName();
        } else if (firstPlayer.getTurn() > secondPlayer.getTurn()) {
            // secondPlayerのターンが始まる状態
            currentLogSection += ' - ' + secondPlayer.getPlayerName();
        }
    } 

    // 今回のログの内容でクラスを更新する
    analyze(
        supply,
        firstPlayer,
        secondPlayer,
        logSec);

    // 結果を登録する
    let logSection: LogSectionInterface = {
        supply: supply,
        firstPlayer: firstPlayer,
        secondPlayer: secondPlayer,
        logSection: currentLogSection,
    };
    return logSection;
}

function analyze(
    supply: Supply,
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

    // 前や先を見て判定する必要のある処理用の変数
    const prevLogArray = logSec.prevLogSec.logSection.split(' ');

    /*
     クリーンナップ処理
    */
    if (logArray[0] === 'Turn') {
        cleanUp(firstPlayer, secondPlayer);
        return;
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
                    startsWith(playerMap, firstPlayer, secondPlayer, logArray);
                    break;
            }
            break;

        case 'draws': // デッキからカードを引く
            draws(playerMap, logArray);
            break;

        case 'shuffles': // 山札をシャッフルする
            shuffles(playerMap, logArray);
            break;

        case 'plays': // カードを場に出して使用する
            plays(playerMap, logArray);
            break;

        case 'buys':
            buys(playerMap, logArray, supply);
            break;

        case 'gains':
            gains(supply, playerMap, logArray, prevLogArray);
            break;

        case 'trashes':
            trashes(playerMap, logArray, supply);
            break;
    }
}