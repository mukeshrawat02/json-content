import { BadRequest } from 'http-errors';
import axios from 'axios';

export type UrlContent = {
  url?: string;
  content?: unknown;
  error?: string;
};

export async function getUrlContent(urls: string[]): Promise<UrlContent[] | UrlContent> {
  try {
    if (!urls || !urls.length) {
      throw new BadRequest('Invalid input!');
    }
    const regEx: RegExp = /^(https?):\/\/[^\s]+(.json)$/;
    const contents: UrlContent[] = [];

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

    return contents;
  } catch (error) {
    return {
      error: error?.message ?? 'Error on getting url content!',
    };
  }
}
