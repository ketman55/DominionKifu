import { GameData } from "../../model/GameData";
import { initialLoading } from "./initialLoading";
import { prevButtonEvent, nextButtonEvent } from "./logPrevNextButton";
import { addComment } from "./addComment";

const gameDataMaster = new GameData();

// ページロード時にlogAnaliticsInitを呼び出す
window.addEventListener('load',
    function () {
        initialLoading(gameDataMaster);
    });

// prevButtonを押下した際のイベント
document.getElementById('prevButton')?.addEventListener('click',
    function () {
        prevButtonEvent(gameDataMaster);
    });

// nextButtonを押下した際のイベント
document.getElementById('nextButton')?.addEventListener('click',
    function () {
        nextButtonEvent(gameDataMaster);
    });

// Add Commentを押下した際のイベント
document.getElementById('commentButton')?.addEventListener('click',
    function () {
        addComment(gameDataMaster);
    });

// キーボードを押下した際のイベント
document.addEventListener('keydown', function (event) {
    // キーボードの左キーを押下した際のイベント
    if (event.key === 'ArrowLeft') {
        prevButtonEvent(gameDataMaster);
    }
    // キーボードの右キーを押下した際のイベント
    if (event.key === 'ArrowRight') {
        nextButtonEvent(gameDataMaster);
    }
});

