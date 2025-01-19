import { API_BASE_URL } from "../../enum/clientEnv";
import { GameLogInterface } from "../../interface/GameLogInterface";

export async function postGameLog(gameNumber: string, gameSupply: string, gameLog: string): Promise<boolean> {
    try {
      const request: GameLogInterface = {gameNumber, gameSupply, gameLog};

      const response = await fetch(API_BASE_URL + '/api/gamelog', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(request)
      });
  
      if (response.ok) {
        return true;
      } else {
        console.error('Error:', response.statusText);
        return false;
      }
    } catch (error) {
      console.error('Error:', error);
      return false;
    }
  }