import { getUrlContent, UrlContent } from './index';
import axios from 'axios';

jest.mock('axios');

test('should return invalid input error for bad request', async (): Promise<void> => {
  const res: UrlContent[]  = (await getUrlContent([]));
  expect(res).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        error: 'Invalid input!'
      })
    ]),
  );
});

test('should return error for invalid urls', async (): Promise<void> => {
  const urls = ['', 'invalid_url', 'htt://wrong-url'];
  const res: UrlContent[]  = (await getUrlContent(urls));
  expect(res).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ error: 'Invalid file url!', url: '' }),
      expect.objectContaining({ error: 'Invalid file url!', url: 'invalid_url' }),
      expect.objectContaining({ error: 'Invalid file url!', url: 'htt://wrong-url' }),
    ]),
  );
});

test('should return content for valid urls', async (): Promise<void> => {
  (axios as jest.Mocked<typeof axios>).get.mockResolvedValue({ data: 'test data' });

  const urls = ['https://example.com/ftse-fsi.json', 'https://example.com/gbp-hkd.json'];

  const res: UrlContent[]  = (await getUrlContent(urls));

  expect(res).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        content: 'test data',
        url: 'https://example.com/ftse-fsi.json',
      }),
      expect.objectContaining({
        content: 'test data',
        url: 'https://example.com/gbp-hkd.json',
      }),
    ]),
  );
});

test('should return error when failed to get json file', async (): Promise<void> => {
  (axios as jest.Mocked<typeof axios>).get.mockImplementationOnce(() => Promise.reject());

  const res: UrlContent[] = (await getUrlContent(['https://example.com/ftse-fsi.json']));
  expect(res).toEqual(
    expect.arrayContaining([
      expect.objectContaining({
        error: 'Error on getting url content!'
      })
    ]),
  );
});
