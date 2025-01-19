import { API_BASE_URL } from "../../enum/clientEnv";
import { GameLogInterface } from "../../interface/GameLogInterface";

export async function getGameLog(gameNumber:string): Promise<GameLogInterface> {
    const gameLog: GameLogInterface = {gameNumber: '', gameSupply: '', gameLog: ''};

    try {
      const response = await fetch(API_BASE_URL + '/api/gamelog/'+gameNumber, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });
  
      if (response.ok) {
        // レスポンスをGameLogInterfaceに変換して返す
        return await response.json();

      } else {
        console.error('Error:', response.statusText);
      }

      return gameLog;
    } catch (error) {
      console.error('Error:', error);
      return gameLog;
    }
  }