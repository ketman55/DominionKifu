import { logAnalyzer } from '../logAnalyzer';
import { LogSectionInterface } from '../../../interface/LogSectionInterface';
import { Player } from '../../../model/Player';
import { Supply } from '../../../model/Supply';
import { initialCardCounts } from '../../../enum/initialCardCounts';
import pluralize from 'pluralize';

// --- Test Helper Functions ---

function assertValue(
    actual: any,
    expected: any,
    context: string
) {
    // Basic deep comparison for simple objects/values, good enough for Map.get() returning numbers or undefined.
    const success = JSON.stringify(actual) === JSON.stringify(expected);
    if (!success) {
        // Use console.error for test failures to make them more visible.
        console.error(`Assertion Failed: ${context}. Expected: ${JSON.stringify(expected)}, Got: ${JSON.stringify(actual)}`);
    } else {
        // console.log(`Assertion Passed: ${context}.`);
    }
    // console.assert is an option but might not log verbosely in all environments or stop execution.
    // Throwing an error would stop execution, which is typical for test runners.
    if (!success) {
        throw new Error(`Assertion Failed: ${context}. Expected: ${JSON.stringify(expected)}, Got: ${JSON.stringify(actual)}`);
    }
}

function getSupplyCardCount_TestHelper(supplyInstance: Supply, cardName: string): number {
    const basicCard = supplyInstance.getBasicArea().find(c => c.name === cardName);
    if (basicCard) return basicCard.count;
    const kingdomCard = supplyInstance.getKingdomArea().find(c => c.name === cardName);
    if (kingdomCard) return kingdomCard.count;
    // Also check other areas if necessary, e.g. nonSupply cards if they can be tracked in Supply object
    return 0;
}

function setupTestEnvironment(
    playerName: string,
    logSectionString: string,
    initialPlayerDeckContents?: { [cardName: string]: number } // Card name (singular) -> quantity
): LogSectionInterface[] {
    const player = new Player();
    player.setPlayerName(playerName);

    // Create a mutable copy of initialCardCounts for test-specific adjustments
    const testSupplyCounts = { ...initialCardCounts };

    // Ensure multi-word cards used in tests are present in the test supply if not already.
    const criticalTestCards = ["Cabin Boy", "Grand Market", "Border Village", "Council Room", "Ruined Library", "Sentry"]; // Added Sentry
    criticalTestCards.forEach(cardFullName => {
        const singularName = pluralize.singular(cardFullName);
        if (!(singularName in testSupplyCounts)) {
            testSupplyCounts[singularName] = 10; // Default quantity for cards not in main supply
        }
    });

    // Initialize player's deck for specific scenarios (e.g., trashing)
    if (initialPlayerDeckContents) {
        for (const cardName in initialPlayerDeckContents) {
            player.addToNowInDeck(cardName, initialPlayerDeckContents[cardName]);
        }
    }

    const supply = new Supply();
    const basicCardNames = ["Copper", "Silver", "Gold", "Estate", "Duchy", "Province", "Curse", "Potion", "Platinum", "Colony"];
    for (const cardName in testSupplyCounts) {
        const count = testSupplyCounts[cardName];
        // Ensure cardName is the key from initialCardCounts (which should be singular and correctly spaced now)
        if (basicCardNames.includes(cardName)) {
            supply.addCardToBasic(cardName, count);
        } else {
            // Assume other cards are kingdom cards.
            // The initialCardCounts should have the correct names (singular, spaced)
            supply.addCardToKingdom(cardName, count);
        }
    }

    const prevLog: LogSectionInterface = {
        firstPlayer: player,
        secondPlayer: new Player(),
        supply: supply, // use the populated supply object
        logSection: "Turn 0 - Previous state",
    };
    prevLog.secondPlayer.setPlayerName("Player2");


    const currentLog: LogSectionInterface = {
        firstPlayer: player.clone(),
        secondPlayer: prevLog.secondPlayer.clone(),
        supply: prevLog.supply.clone(),
        logSection: logSectionString,
    };

    return [prevLog, currentLog];
}


// --- Test Suite ---
console.log("--- Starting logAnalyzer Test Suite ---");

function runTest(testName: string, testFn: () => void) {
    console.log(`Running: ${testName}`);
    try {
        testFn();
        console.log(`Passed: ${testName}`);
    } catch (e: any) {
        console.error(`Failed: ${testName} - ${e.message}`);
    }
}

runTest("TestPlayMultiWordCard", () => {
    const playerName = "P1";
    const cardPlayed = "Cabin Boy";
    const singularCard = pluralize.singular(cardPlayed);
    const log = `${playerName} plays a ${cardPlayed}.`;
    const logSections = setupTestEnvironment(playerName, log);

    const result = logAnalyzer(1, logSections);

    assertValue(result.firstPlayer.getTurnPlays().get(singularCard), 1, `${playerName} plays ${singularCard} - turnPlays`);
    assertValue(result.firstPlayer.getTotalPlays().get(singularCard), 1, `${playerName} plays ${singularCard} - totalPlays`);
});

runTest("TestGainMultiWordCard", () => {
    const playerName = "P1";
    const cardGained = "Grand Market";
    const singularCard = pluralize.singular(cardGained);
    const log = `${playerName} gains a ${cardGained}.`;
    const logSections = setupTestEnvironment(playerName, log);
    const initialSupply = getSupplyCardCount_TestHelper(logSections[0].supply, singularCard);

    const result = logAnalyzer(1, logSections);

    assertValue(result.firstPlayer.getNowInDeck().get(singularCard), 1, `${singularCard} in deck after gain`);
    assertValue(getSupplyCardCount_TestHelper(result.supply, singularCard), initialSupply - 1, `${singularCard} supply count after gain`);
});

runTest("TestBuyMultiWordCard", () => {
    const playerName = "P1";
    const cardBought = "Border Village";
    const singularCard = pluralize.singular(cardBought);
    const log = `${playerName} buys and gains a ${cardBought}.`;
    const logSections = setupTestEnvironment(playerName, log);
    const initialSupply = getSupplyCardCount_TestHelper(logSections[0].supply, singularCard);

    const result = logAnalyzer(1, logSections);

    assertValue(result.firstPlayer.getNowInDeck().get(singularCard), 1, `${singularCard} in deck after buy`);
    assertValue(getSupplyCardCount_TestHelper(result.supply, singularCard), initialSupply - 1, `${singularCard} supply count after buy`);
});

runTest("TestTrashMultiWordCard", () => {
    const playerName = "P1";
    const cardTrashed = "Ruined Library";
    const singularCard = pluralize.singular(cardTrashed);
    const log = `${playerName} trashes a ${cardTrashed}.`;

    const logSections = setupTestEnvironment(playerName, log, { [singularCard]: 1 });

    const initialTrashArea_TestHelper = logSections[0].supply.getTrashArea();
    const initialCardInTrash_TestHelper = initialTrashArea_TestHelper.find(c => c.name === singularCard);
    const initialTrashPileCount = initialCardInTrash_TestHelper ? initialCardInTrash_TestHelper.count : 0;

    const result = logAnalyzer(1, logSections);

    assertValue(result.firstPlayer.getNowInDeck().get(singularCard), undefined, `${singularCard} in player deck after trash`);

    const resultTrashArea_TestHelper = result.supply.getTrashArea();
    const resultCardInTrash_TestHelper = resultTrashArea_TestHelper.find(c => c.name === singularCard);
    assertValue(resultCardInTrash_TestHelper ? resultCardInTrash_TestHelper.count : 0, initialTrashPileCount + 1, `${singularCard} in trash pile after trash`);
});


runTest("TestPlayMultipleCardsWithMultiWord", () => {
    const playerName = "P1";
    const log = `${playerName} plays 2 Coppers, a Silver, and a Council Room.`;
    const logSections = setupTestEnvironment(playerName, log);
    const result = logAnalyzer(1, logSections);

    assertValue(result.firstPlayer.getTurnPlays().get("Copper"), 2, "Copper plays");
    assertValue(result.firstPlayer.getTurnPlays().get("Silver"), 1, "Silver plays");
    assertValue(result.firstPlayer.getTurnPlays().get("Council Room"), 1, "Council Room plays");
});

runTest("TestBuysAndGainsSingleCard", () => {
    const playerName = "P1";
    const cardName = "Sentry"; // Sentry is already singular
    const log = `${playerName} buys and gains a ${cardName}.`;
    const logSections = setupTestEnvironment(playerName, log);

    const initialSentrySupplyCount = getSupplyCardCount_TestHelper(logSections[0].supply, cardName);
    const initialPlayerSentryCount_NowInDeck = logSections[0].firstPlayer.getNowInDeck().get(cardName) || 0;
    const initialPlayerSentryCount_TotalGains = logSections[0].firstPlayer.getTotalGains().get(cardName) || 0;

    const result = logAnalyzer(1, logSections);

    assertValue(getSupplyCardCount_TestHelper(result.supply, cardName), initialSentrySupplyCount - 1, `${cardName} supply count after buys and gains`);
    assertValue(result.firstPlayer.getNowInDeck().get(cardName), initialPlayerSentryCount_NowInDeck + 1, `${cardName} in player deck after buys and gains`);
    assertValue(result.firstPlayer.getTotalGains().get(cardName), initialPlayerSentryCount_TotalGains + 1, `${cardName} in player total gains after buys and gains`);
});

console.log("--- logAnalyzer Test Suite Finished ---");
