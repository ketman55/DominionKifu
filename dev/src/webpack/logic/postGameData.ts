import { GameData } from "../interface/GameData";
import { Comment } from "../model/Comment";

export async function postGameData(gameNumber: string, gameSupply: string, gameLog: string): Promise<boolean> {
    try {
      const comment = new Comment();
      const gameData: GameData = {gameNumber, gameSupply, gameLog, comment};

      const response = await fetch('http://localhost:3000/api/gamedata', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(gameData)
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