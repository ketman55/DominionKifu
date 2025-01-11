import { Kingdom } from '../model/Kingdom';
import { Player } from '../model/Player';

export interface LogSectionInterface {
    kingdom: Kingdom;
    firstPlayer: Player;
    secondPlayer: Player;
    logSection: string; // ログの断面（1行分）
}