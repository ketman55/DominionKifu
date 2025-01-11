import { LogSectionInterface } from "../../interface/LogSectionInterface";
import { GameData } from "../../model/GameData";
import { Kingdom } from "../../model/Kingdom";
import { Player } from "../../model/Player";
import { loadGameSupply } from "../loadGameSupply";
import { draws } from "./methods/draws";

export function analyzeLog(gameData: GameData): void {
    let tmpPointer = 0;
    let logArray = gameData.getGameLog().split('\n');
    let logSectionArray = gameData.getLogSectionArray()

    // logArrayの各要素を解析してlogSectionArrayに格納する
    logArray.forEach((log) => {

        if (tmpPointer === 0) {
            // pointerが0の時は初期値を設定して格納する
            const kingdom = new Kingdom();
            const firstPlayer = new Player();
            const secondPlayer = new Player();

            loadGameSupply(gameData.getGameSupply(), kingdom);　// サプライを設定する

            let logSection: LogSectionInterface = { kingdom: kingdom, firstPlayer: firstPlayer, secondPlayer: secondPlayer, logSection: log };
            logSectionArray.push(logSection);
            tmpPointer++;
        } else {
            // ひとつ前のlogSectionの内容をディープコピー
            let lastPointer = tmpPointer - 1;
            const kingdom = logSectionArray[lastPointer].kingdom.clone();
            const firstPlayer = logSectionArray[lastPointer].firstPlayer.clone();
            const secondPlayer = logSectionArray[lastPointer].secondPlayer.clone();

            // 今回のログの内容でクラスを更新する
            analyze(kingdom, firstPlayer, secondPlayer, log);

            // 結果を登録する
            let logSection: LogSectionInterface = { kingdom: kingdom, firstPlayer: firstPlayer, secondPlayer: secondPlayer, logSection: log };
            gameData.getLogSectionArray().push(logSection);
            tmpPointer++;
        }
    });
}

export function analyze(kingdom: Kingdom, firstPlayer: Player, secondPlayer: Player, logSection: string): void {

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