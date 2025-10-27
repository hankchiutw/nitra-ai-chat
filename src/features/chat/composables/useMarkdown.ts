import DOMPurify from 'dompurify';
import { marked } from 'marked';

// Configure marked options
marked.setOptions({
  breaks: true, // Convert \n to <br>
  gfm: true, // GitHub Flavored Markdown
});

/**
 * Composable for rendering markdown content safely
 */
export function useMarkdown() {
  /**
   * Parse markdown to HTML and sanitize it
   */
  function parseMarkdown(content: string): string {
    try {
      const html = marked.parse(content) as string;
      return DOMPurify.sanitize(html, {
        ALLOWED_TAGS: [
          'p',
          'br',
          'strong',
          'em',
          'u',
          'a',
          'ul',
          'ol',
          'li',
          'h1',
          'h2',
          'h3',
          'h4',
          'h5',
          'h6',
          'code',
          'pre',
          'blockquote',
        ],
        ALLOWED_ATTR: ['href', 'target', 'rel'],
      });
    } catch (error) {
      console.error('Error parsing markdown:', error);
      return content;
    }
  }

  return {
    parseMarkdown,
  };
}
