import { GameLog } from "../../model/GameLog";
import { init } from "./initialLoading";
import { prevButtonEvent, nextButtonEvent } from "./logPrevNextButton";

const gameLogMaster = new GameLog();

// ページロード時にlogAnaliticsInitを呼び出す
window.addEventListener('load', callInit);
function callInit() {
    init(gameLogMaster);
}

// prevButtonを押下した際のイベント
document.getElementById('prevButton')?.addEventListener('click', callPrevButtonEvent);
function callPrevButtonEvent() {
    prevButtonEvent(gameLogMaster);
}

// nextButtonを押下した際のイベント
document.getElementById('nextButton')?.addEventListener('click', callNextButtonEvent);
function callNextButtonEvent() {
    nextButtonEvent(gameLogMaster);
}

