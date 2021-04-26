export type UrlContent = {
  url?: string;
  content?: unknown;
  error?: string;
};

export async function getUrlContent(urls: string[]): Promise<UrlContent[] | UrlContent> {
  if (!urls || !urls.length) {
    return { error: 'Invalid input!' };
  }
  // getting url content from JSON files
  return {};
}
