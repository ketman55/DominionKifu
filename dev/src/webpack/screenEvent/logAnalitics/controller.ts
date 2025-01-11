import { GameLog } from "../../model/GameData";
import { init } from "./initialLoading";
import { prevButtonEvent, nextButtonEvent } from "./logPrevNextButton";

const gameLogMaster = new GameLog();

// ページロード時にlogAnaliticsInitを呼び出す
window.addEventListener('load',
    function () {
        init(gameLogMaster);
    });

// prevButtonを押下した際のイベント
document.getElementById('prevButton')?.addEventListener('click',
    function () {
        prevButtonEvent(gameLogMaster);
    });

// nextButtonを押下した際のイベント
document.getElementById('nextButton')?.addEventListener('click',
    function () {
        nextButtonEvent(gameLogMaster);
    });

// キーボードを押下した際のイベント
document.addEventListener('keydown', function (event) {
    // キーボードの左キーを押下した際のイベント
    if (event.key === 'ArrowLeft') {
        prevButtonEvent(gameLogMaster);
    }
    // キーボードの右キーを押下した際のイベント
    if (event.key === 'ArrowRight') {
        nextButtonEvent(gameLogMaster);
    }
});

