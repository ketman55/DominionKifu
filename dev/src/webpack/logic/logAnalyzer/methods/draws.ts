import { initialCardCounts } from "../../../enum/initialCardCounts";
import { Player } from "../../../model/Player";

export function draws(player: Player, logArray: string[]): void {
    
    let count = 0;
    logArray.forEach((text, index) => {
        
        // textが数字だった場合はcountに代入
        if (!isNaN(Number(text))) {
            count = Number(text);
        }

        // textがinitialCardCountsに含まれる場合は更新
        if (text in initialCardCounts) {
            // 手札は増やす
            player.addHand(text, count);

            // デッキは減らす   

        }
    });    
}