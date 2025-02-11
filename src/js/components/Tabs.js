import { DOMService } from '../services/domService.js';

export class Tabs {
  constructor() {
    this.activeTabs = [{
      id: 'tab1',
      name: 'Tab 1',
      savedSums: []
    }];
    this.activeTabId = 'tab1';
  }

  /**
   * Updates the tabs UI
   * @param {HTMLElement} panel - The panel element
   * @param {Function} onTabChange - Callback for tab changes
   */
  updateTabs(panel, onTabChange) {
    const tabList = panel.querySelector('.dataflash-tab-list');
    const textarea = panel.querySelector('.dataflash-input');
    
    tabList.innerHTML = this.activeTabs.map(tab => `
      <div class="dataflash-tab ${tab.id === this.activeTabId ? 'active' : ''}" data-tab-id="${tab.id}">
        <span class="dataflash-tab-name" data-tab-id="${tab.id}">${tab.name}</span>
        ${this.activeTabs.length > 1 ? `<span class="dataflash-tab-close">×</span>` : ''}
      </div>
    `).join('');

    this.addTabEventListeners(panel, tabList, textarea, onTabChange);
  }

  /**
   * Adds event listeners to tab elements
   * @private
   */
  addTabEventListeners(panel, tabList, textarea, onTabChange) {
    // Tab switching
    tabList.querySelectorAll('.dataflash-tab').forEach(tabEl => {
      const tabId = tabEl.dataset.tabId;
      
      tabEl.addEventListener('click', (e) => {
        if (e.target === tabEl && tabId !== this.activeTabId) {
          this.activeTabId = tabId;
          this.updateTabs(panel, onTabChange);
          onTabChange();
          
          if (textarea) {
            textarea.value = '';
          }
        }
      });
    });

    // Tab name editing
    tabList.querySelectorAll('.dataflash-tab-name').forEach(nameEl => {
      nameEl.addEventListener('dblclick', (e) => {
        e.stopPropagation();
        this.makeTabNameEditable(nameEl, panel, onTabChange);
      });

      nameEl.addEventListener('click', (e) => {
        const tabId = nameEl.dataset.tabId;
        if (tabId !== this.activeTabId) {
          this.activeTabId = tabId;
          this.updateTabs(panel, onTabChange);
          onTabChange();
          
          if (textarea) {
            textarea.value = '';
          }
        }
      });
    });

    // Tab closing
    tabList.querySelectorAll('.dataflash-tab-close').forEach(closeBtn => {
      closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.closeTab(closeBtn, panel, onTabChange);
      });
    });
  }

  /**
   * Makes a tab name editable
   * @private
   */
  makeTabNameEditable(nameEl, panel, onTabChange) {
    const tabId = nameEl.dataset.tabId;
    const tab = this.activeTabs.find(t => t.id === tabId);
    if (!tab) return;

    const input = DOMService.createElement('input', {
      className: 'dataflash-tab-input',
      value: tab.name
    });
    
    const isActive = nameEl.closest('.dataflash-tab').classList.contains('active');
    input.style.fontWeight = isActive ? '500' : 'normal';
    
    nameEl.replaceWith(input);
    input.focus();
    input.select();

    const saveName = () => {
      const newName = input.value.trim() || tab.name;
      tab.name = newName;
      this.updateTabs(panel, onTabChange);
    };

    DOMService.addEventListeners(input, {
      blur: saveName,
      keydown: (e) => {
        if (e.key === 'Enter') {
          e.preventDefault();
          saveName();
        } else if (e.key === 'Escape') {
          this.updateTabs(panel, onTabChange);
        }
      }
    });
  }

  /**
   * Closes a tab
   * @private
   */
  closeTab(closeBtn, panel, onTabChange) {
    const tabId = closeBtn.closest('.dataflash-tab').dataset.tabId;
    const tabIndex = this.activeTabs.findIndex(t => t.id === tabId);
    
    if (tabIndex !== -1) {
      this.activeTabs.splice(tabIndex, 1);
      if (this.activeTabId === tabId) {
        this.activeTabId = this.activeTabs[Math.max(0, tabIndex - 1)].id;
      }
      this.updateTabs(panel, onTabChange);
      onTabChange();
    }
  }

  /**
   * Adds a new tab
   */
  addTab() {
    const newTabId = `tab${this.activeTabs.length + 1}`;
    this.activeTabs.push({
      id: newTabId,
      name: `Tab ${this.activeTabs.length + 1}`,
      savedSums: []
    });
    this.activeTabId = newTabId;
  }

  /**
   * Gets the active tab
   * @returns {Object} The active tab object
   */
  getActiveTab() {
    return this.activeTabs.find(t => t.id === this.activeTabId);
  }
}
