import { GameLogInterface } from "../interface/GameLogInterface";

export async function getGameNumberList(): Promise<string[]> {
    try {
      const response = await fetch('http://localhost:3000/api/all/gamenumber', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });
  
      if (response.ok) {
        // レスポンスをstring[]に変換して返す
        return await response.json();
      } else {
        console.error('Error:', response.statusText);
        return [];
      }
    } catch (error) {
      console.error('Error:', error);
      return [];
    }
  }