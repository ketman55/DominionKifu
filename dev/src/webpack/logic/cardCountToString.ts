import { CardInterface } from "../interface/CardInterface";

export function cardCountToString(count :Number) {
    try {
        if (count !== undefined) {
            return count.toString();
        } else {
            return 'N/A'; // `count`が`undefined`の場合のデフォルト値
        }
    } catch (error) {
        console.log(count, error);
        return 'Error'; // エラーが発生した場合のデフォルト値
    }
}