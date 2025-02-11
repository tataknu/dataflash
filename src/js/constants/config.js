export const KEYBOARD_SHORTCUTS = {
  TOGGLE_PANEL: {
    ctrl: true,
    shift: true,
    key: 'D'
  }
};

export const UI_CONSTANTS = {
  PANEL_CLASS: 'dataflash-panel',
  MINIMIZED_CLASS: 'minimized',
  MAX_RESULTS: 50,
  ANIMATION_DURATION: 1000
};

export const WHITELISTED_DOMAINS = [
  'databricks.com'
];

export const ICON_URL = chrome.runtime.getURL('public/john.png');
