
/**
 * 改行区切りのゲームログを分割して配列を返すメソッド
 */
export function loadGameLog(gameLog: string) : string[] {
  
    return gameLog.split('\n');

}