import { BadRequest } from 'http-errors';
import axios from 'axios';

export type UrlContent = {
  url?: string;
  content?: unknown;
  error?: string;
};

export async function getUrlContent(urls: string[]): Promise<UrlContent[]> {
  const contents: UrlContent[] = [];

  try {
    if (!urls || !urls.length) {
      throw new BadRequest('Invalid input!');
    }
    const regEx: RegExp = /^(https?):\/\/[^\s]+(.json)$/;

    for (const url of urls) {
      const urlContent: UrlContent = {};
      urlContent.url = url;

      if (!url || !url.match(regEx)) {
        urlContent.error = 'Invalid file url!';
      } else {
        const content = await axios.get(url);
        urlContent.content = content.data;
      }

      contents.push(urlContent);
    }
  } catch (error) {
    contents.push({ error: error?.message ?? 'Error on getting url content!' });
  }

  return contents;
}
