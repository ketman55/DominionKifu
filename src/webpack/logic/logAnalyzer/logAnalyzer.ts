import { LogSectionInterface } from "../../interface/LogSectionInterface";
import { Player } from "../../model/Player";
import { initialCardCounts } from "../../enum/initialCardCounts";

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
import { exiles, discardFromExile } from "./methods/exile";
import { returns } from "./methods/return";
import { setAside, putInHand } from "./methods/setAside";

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
    const cleanedLog = logSec.currentLogSec.logSection.replace(/[.,]/g, '');
    const initialWords = cleanedLog.split(' ');

    // Prepare Card List
    const knownCardNames = Object.keys(initialCardCounts);
    const sortedKnownCardNames = knownCardNames.sort((a, b) => b.length - a.length);

    /*
     クリーンナップ処理
    */
    if (initialWords[0] === 'Turn') {
        cleanUp(firstPlayer, secondPlayer);
        return;
    }

    /*
    通常アクションの処理
    */
    if (initialWords.length < 2) return;

    const playerName = initialWords[0];
    const verb = initialWords[1];
    let wordsForCardParsing = initialWords.slice(2); // Default slice

    // Handle "buys and gains" pattern
    if (verb === "buys" &&
        initialWords.length > 3 && // Ensure there are enough words to check
        initialWords[2]?.toLowerCase() === "and" &&
        initialWords[3]?.toLowerCase() === "gains") {
        wordsForCardParsing = initialWords.slice(4); // Skip "and gains"
    }
    // Add similar conditions for other known compound phrases if necessary.
    // For example, some logs might use "buys & gains".
    // else if (verb === "buys" && initialWords.length > 3 && initialWords[2] === "&" && initialWords[3]?.toLowerCase() === "gains") {
    //     wordsForCardParsing = initialWords.slice(4);
    // }
    // For now, the primary target is "buys and gains".

    let cardPhrase = wordsForCardParsing.join(' ');

    const parsedItems: Array<{type: string, value?: string, name?: string, quantity?: number}> = [];
    parsedItems.push({ type: 'player', value: playerName });
    parsedItems.push({ type: 'verb', value: verb });

    let remainingCardPhrase = cardPhrase;
    const cards: Array<{name: string, quantity: number}> = [];

    while (remainingCardPhrase.length > 0) {
        let foundMatch = false;
        let quantity = 1;
        let quantityStr = "";
        const quantityMatch = remainingCardPhrase.match(/^(\d+)\s+/);

        if (quantityMatch) {
            quantity = parseInt(quantityMatch[1]);
            quantityStr = quantityMatch[1] + " ";
        } else if (remainingCardPhrase.match(/^(a|an)\s+/i)) {
            quantity = 1;
            const articleMatch = remainingCardPhrase.match(/^(a|an)\s+/i);
            if (articleMatch) { // Ensure articleMatch is not null
                quantityStr = articleMatch[0];
            }
        }

        let possibleCardPart = remainingCardPhrase.substring(quantityStr.length);

        for (const cardName of sortedKnownCardNames) {
            if (possibleCardPart.startsWith(cardName)) {
                cards.push({ name: cardName, quantity: quantity });
                remainingCardPhrase = possibleCardPart.substring(cardName.length).trim();
                if (remainingCardPhrase.toLowerCase().startsWith("and ")) {
                    remainingCardPhrase = remainingCardPhrase.substring(4).trim();
                }
                foundMatch = true;
                break;
            }
        }

        if (!foundMatch) {
            break;
        }
    }

    parsedItems.push(...cards.map(card => ({ type: 'card', name: card.name, quantity: card.quantity })));

    // Methods will now use playerName and the cards array derived from parsedItems.
    // For example: plays(playerMap, playerName, cards); (where cards is parsedItems.filter(item => item.type === 'card')).
    // The startsWith method might need special handling.
    // The gains method also takes prevLogArray. We will address prevLogArray later if needed.

    // 前や先を見て判定する必要のある処理用の変数
    // prevLogArray might be needed for specific methods like gains, handle as per method requirements.
    const prevLogArray = logSec.prevLogSec.logSection.split(' ');


    // ログの内容によって処理を分岐する
    switch (verb) {
        case 'starts':
            // startsWith might need initialWords or a reconstructed array.
            // For now, assuming it can be adapted or its direct logArray dependency is reviewed.
            if (initialWords[2] === 'with') { // Adjusted to check 'with' from initialWords
                 startsWith(playerMap, firstPlayer, secondPlayer, initialWords); // Pass initialWords for now
            }
            break;

        case 'draws': // デッキからカードを引く
            draws(playerMap, playerName, cards); // Pass only card info
            break;

        case 'shuffles': // 山札をシャッフルする
            shuffles(playerMap, initialWords); // shuffles might depend on playerName being in initialWords[0]
            break;

        case 'plays': // カードを場に出して使用する
            plays(playerMap, playerName, cards);
            break;

        case 'buys':
            buys(playerMap, playerName, cards, supply);
            break;

        case 'gains':
            // gains might need prevLogArray, this needs careful adaptation.
            gains(supply, playerMap, playerName, cards, prevLogArray);
            break;

        case 'trashes':
            trashes(playerMap, playerName, cards, supply);
            break;

        case 'exiles': // カードを追放する
            // exiles might need prevLogArray, this needs careful adaptation.
            exiles(playerMap, playerName, cards, prevLogArray, supply);
            break

        case 'discards':
            if (logSec.currentLogSec.logSection.endsWith("from Exile")) {
                discardFromExile(playerMap, playerName, cards);
            }
            break;

        case 'returns':
            returns(playerMap, playerName, cards, supply);
            break;

        case 'sets':
            if (logSec.currentLogSec.logSection.includes('aside with')) {
                setAside(playerMap, playerName, cards, logSec.currentLogSec.logSection);
            }
            break;

        case 'puts':
            if (logSec.currentLogSec.logSection.includes('in hand')) {
                putInHand(playerMap, playerName, cards, logSec.currentLogSec.logSection);
            }
            break;
    }
}