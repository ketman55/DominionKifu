import { API_BASE_URL } from "../../enum/clientEnv";

export async function getGameNumberList(): Promise<string[]> {
    try {
      const response = await fetch(API_BASE_URL + '/api/all/gamenumber', {
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