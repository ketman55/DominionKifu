import { Supply } from '../model/Supply';
import { Player } from '../model/Player';

export interface LogSectionInterface {
    supply: Supply;
    firstPlayer: Player;
    secondPlayer: Player;
    logSection: string; // ログの断面（1行分）
}