import { BadRequest } from 'http-errors';

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
    const contents: UrlContent[] = [];

    return contents;
  } catch (error) {
    return {
      error: error?.message ?? 'Error on getting url content!',
    };
  }
}
