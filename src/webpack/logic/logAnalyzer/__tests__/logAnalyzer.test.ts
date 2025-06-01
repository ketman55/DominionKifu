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
    // This makes tests self-contained regarding card availability in supply.
    const criticalTestCards = ["Cabin Boy", "Grand Market", "Border Village", "Council Room", "Ruined Library"];
    criticalTestCards.forEach(cardFullName => {
        const singularName = pluralize.singular(cardFullName);
        if (!(singularName in testSupplyCounts)) {
            // console.log(`Note: Adding '${singularName}' to test supply for this test run.`);
            testSupplyCounts[singularName] = 10; // Default quantity for cards not in main supply
        }
    });

    // Initialize player's deck for specific scenarios (e.g., trashing)
    if (initialPlayerDeckContents) {
        for (const cardName in initialPlayerDeckContents) {
            // This assumes Player class has a method to set initial deck state,
            // or we manipulate its internal `nowInDeck` map directly for testing.
            // For now, using addToNowInDeck which should also initialize.
            player.addToNowInDeck(cardName, initialPlayerDeckContents[cardName]);
        }
    }

    const prevLog: LogSectionInterface = {
        firstPlayer: player,
        secondPlayer: new Player(),
        supply: new Supply(testSupplyCounts), // Use the (potentially modified) test supply counts
        logSection: "Turn 0 - Previous state",
    };
    prevLog.secondPlayer.setPlayerName("Player2"); // Dummy second player


    const currentLog: LogSectionInterface = {
        firstPlayer: player.clone(),
        secondPlayer: prevLog.secondPlayer.clone(),
        supply: prevLog.supply.clone(), // Clone supply from previous log section
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
    const initialSupply = logSections[0].supply.getCardCount(singularCard) || 0;

    const result = logAnalyzer(1, logSections);

    assertValue(result.firstPlayer.getNowInDeck().get(singularCard), 1, `${singularCard} in deck after gain`);
    assertValue(result.supply.getCardCount(singularCard), initialSupply - 1, `${singularCard} supply count after gain`);
});

runTest("TestBuyMultiWordCard", () => {
    const playerName = "P1";
    const cardBought = "Border Village";
    const singularCard = pluralize.singular(cardBought);
    const log = `${playerName} buys and gains a ${cardBought}.`;
    const logSections = setupTestEnvironment(playerName, log);
    const initialSupply = logSections[0].supply.getCardCount(singularCard) || 0;

    const result = logAnalyzer(1, logSections);

    assertValue(result.firstPlayer.getNowInDeck().get(singularCard), 1, `${singularCard} in deck after buy`);
    assertValue(result.supply.getCardCount(singularCard), initialSupply - 1, `${singularCard} supply count after buy`);
});

runTest("TestTrashMultiWordCard", () => {
    const playerName = "P1";
    const cardTrashed = "Ruined Library";
    const singularCard = pluralize.singular(cardTrashed);
    const log = `${playerName} trashes a ${cardTrashed}.`;

    const logSections = setupTestEnvironment(playerName, log, { [singularCard]: 1 });
    const initialTrashPileCount = logSections[0].supply.getTrash().get(singularCard) || 0;
    // Player.decreaseFromNowInDeck should make the card count undefined or 0 if all are removed.
    // The trashing logic in trashes.ts depends on `singularCardName in initialCardCounts`.
    // setupTestEnvironment ensures Ruined Library is in the test supply for this.

    const result = logAnalyzer(1, logSections);

    // If player had 1, and trashed 1, count becomes 0. If map stores 0, actual is 0. If key is deleted, actual is undefined.
    // Player.decreaseFromNowInDeck implementation:
    // if (newCount <= 0) this.nowInDeck.delete(cardName); else this.nowInDeck.set(cardName, newCount);
    // So, it should be undefined.
    assertValue(result.firstPlayer.getNowInDeck().get(singularCard), undefined, `${singularCard} in player deck after trash`);
    assertValue(result.supply.getTrash().get(singularCard), initialTrashPileCount + 1, `${singularCard} in trash pile after trash`);
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

console.log("--- logAnalyzer Test Suite Finished ---");
