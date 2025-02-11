import { Panel } from './components/Panel.js';
import { DOMService } from './services/domService.js';
import { allStyles } from './styles/styles.js';
import { KEYBOARD_SHORTCUTS, WHITELISTED_DOMAINS } from './constants/config.js';

class DataFlash {
  constructor() {
    this.panel = null;
    this.isWhitelistedDomain = false;
  }

  /**
   * Initializes the DataFlash extension
   */
  initialize() {
    // Inject styles
    DOMService.injectStyles(allStyles);

    // Create panel
    this.panel = new Panel();
    this.panel.create();

    // Add keyboard shortcut
    this.addKeyboardShortcut();
  }

  /**
   * Adds keyboard shortcut for toggling panel
   * @private
   */
  addKeyboardShortcut() {
    document.addEventListener('keydown', (e) => {
      const shortcut = KEYBOARD_SHORTCUTS.TOGGLE_PANEL;
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === shortcut.key) {
        const existingPanel = document.querySelector('.dataflash-panel');
        if (existingPanel) {
          existingPanel.remove();
          this.panel = null;
        } else {
          this.panel = new Panel();
          this.panel.create();
        }
      }
    });
  }

  /**
   * Checks if current domain is whitelisted
   * @returns {boolean} Whether domain is whitelisted
   */
  checkWhitelistedDomain() {
    const currentUrl = window.location.hostname;
    return WHITELISTED_DOMAINS.some(domain => currentUrl.includes(domain));
  }
}

// Initialize extension
const app = new DataFlash();

// Check if we're on a whitelisted domain
app.isWhitelistedDomain = app.checkWhitelistedDomain();

// Listen for messages from the background script
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "activate_extension") {
    // Force activation regardless of domain
    app.initialize();
  }
});

// Only auto-initialize if we're on a whitelisted domain
if (app.isWhitelistedDomain) {
  app.initialize();
}

// Log initialization
console.log('DataFlash content script loaded');
