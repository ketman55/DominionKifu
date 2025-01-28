import sanitizeHtml from 'sanitize-html';

/**
 * HTMLインジェクションを防ぐために、入力された文字列をサニタイズします。
 * @param input 
 * @returns 
 */
export function sanitizeInput(input: string): string {
  return sanitizeHtml(input);
}