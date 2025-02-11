/**
 * Service for handling DOM-related operations
 */
export class DOMService {
  /**
   * Creates a new element with given properties
   * @param {string} tag - HTML tag name
   * @param {Object} props - Properties to set on element
   * @returns {HTMLElement} Created element
   */
  static createElement(tag, props = {}) {
    const element = document.createElement(tag);
    Object.entries(props).forEach(([key, value]) => {
      if (key === 'className') {
        element.className = value;
      } else if (key === 'innerHTML') {
        element.innerHTML = value;
      } else if (key === 'textContent') {
        element.textContent = value;
      } else {
        element.setAttribute(key, value);
      }
    });
    return element;
  }

  /**
   * Injects styles into the document head
   * @param {string} styles - CSS styles to inject
   */
  static injectStyles(styles) {
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
  }

  /**
   * Creates a button element with given properties
   * @param {Object} props - Button properties
   * @returns {HTMLButtonElement} Created button
   */
  static createButton(props = {}) {
    return this.createElement('button', {
      type: 'button',
      ...props
    });
  }

  /**
   * Creates a textarea element with given properties
   * @param {Object} props - Textarea properties
   * @returns {HTMLTextAreaElement} Created textarea
   */
  static createTextarea(props = {}) {
    return this.createElement('textarea', props);
  }

  /**
   * Adds event listeners to an element
   * @param {HTMLElement} element - Target element
   * @param {Object} listeners - Event listeners object
   */
  static addEventListeners(element, listeners) {
    Object.entries(listeners).forEach(([event, handler]) => {
      element.addEventListener(event, handler);
    });
  }

  /**
   * Creates a download link for content
   * @param {string} content - Content to download
   * @param {string} filename - Name of file to download
   */
  static downloadContent(content, filename) {
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = this.createElement('a', { href: url, download: filename });
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  /**
   * Copies text to clipboard
   * @param {string} text - Text to copy
   * @returns {Promise} Promise that resolves when text is copied
   */
  static copyToClipboard(text) {
    return navigator.clipboard.writeText(text);
  }
}
