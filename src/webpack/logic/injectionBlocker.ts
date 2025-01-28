import DOMPurify from 'dompurify';

/**
 * HTMLインジェクションを防ぐために、入力された文字列をサニタイズします。
 * @param input 
 * @returns 
 */
export function sanitizeInput(input: string): string {
  return DOMPurify.sanitize(input);
}
