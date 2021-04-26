import { getUrlContent, UrlContent } from './index';

test('should return invalid input error for bad request', async (): Promise<void> => {
  const res = (await getUrlContent([])) as UrlContent;
  expect(res.error).toBe('Invalid input!');
});
