import { LogSectionInterface } from "../../interface/LogSectionInterface";
import { Player } from "../../model/Player";

// プレイヤーの行動メソッド
import { cleanUp } from "./methods/cleanUp";
import { starts } from "./methods/startsWith";
import { shuffles } from "./methods/shuffles";
import { draws } from "./methods/draws";

export function logAnalyzer(
    currentLogSec: LogSectionInterface,
    prevLogSec: LogSectionInterface,
    nextLogSec: LogSectionInterface): LogSectionInterface {

    // ひとつ前のlogSectionの内容をディープコピー
    const supply = prevLogSec.supply.clone();
    const firstPlayer = prevLogSec.firstPlayer.clone();
    const secondPlayer = prevLogSec.secondPlayer.clone();

    // 今回のログの内容でクラスを更新する
    analyze(firstPlayer,
        secondPlayer,
        currentLogSec.logSection,
        nextLogSec.logSection);

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
    firstPlayer: Player,
    secondPlayer: Player,
    currentLogSection: string,
    nextLogSection: string): void {

    // プレイヤー名を表すMap変数
    const playerMap = new Map<string, Player>();
    if (!firstPlayer.isPlayerNameEmpty()) {
        playerMap.set(firstPlayer.getPlayerName(), firstPlayer);
    }
    if (!secondPlayer.isPlayerNameEmpty()) {
        playerMap.set(secondPlayer.getPlayerName(), secondPlayer);
    }

    // ピリオドは除去する
    // ログをスペースで分割する
    // 例：k draws 3 Coppers and 2 Estates.
    const logArray = currentLogSection.replace('.', '').split(' ');

    /*
     クリーンナップ処理
     Turn2以降で
     Turn 2 - xxxx のようなログがある場合はクリーンナップ処理を行う
    */
    const nextLogArray = nextLogSection.split(' ');
    if (2 < nextLogArray.length
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
            switch(nextOfVerb) {
                case 'with': // プレイヤーの初期処理
                    starts(playerMap, firstPlayer, secondPlayer, logArray);
                    break;
            }
            break;

        case 'draws': // デッキからカードを引く
            draws(playerMap, logArray);
            break;

        case 'shuffles': // 山札をシャッフルする
            shuffles(playerMap, logArray);
            break;

        case 'buys':
            break;
    }
}