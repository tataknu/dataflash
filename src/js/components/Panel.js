import { DOMService } from '../services/domService.js';
import { Calculator } from './Calculator.js';
import { Tabs } from './Tabs.js';
import { parseClipboardData, calculateMetrics } from '../utils/parser.js';
import { ICON_URL } from '../constants/config.js';

export class Panel {
  constructor() {
    this.calculator = new Calculator();
    this.tabs = new Tabs();
    this.isDragging = false;
    this.currentX = 0;
    this.currentY = 0;
    this.initialX = 0;
    this.initialY = 0;
    this.xOffset = 0;
    this.yOffset = 0;
    this.dfCounter = 1; // Add counter for dataframes
    this.initialWidth = 400; // Default panel width
    this.initialHeight = 600; // Increased default panel height
    this.isMinimized = false;
  }

  /**
   * Creates the floating panel UI
   * @returns {HTMLElement} The panel element
   */
  create() {
    const panel = DOMService.createElement('div', {
      className: 'dataflash-panel',
      style: `
        width: 400px;
        min-height: 100px;
        height: auto;
        max-height: 90vh;
        transform: translate(0px, 0px);
      `
    });
    
    // Add minimized icon (separate from header)
    const minimizedIcon = DOMService.createElement('img', {
      className: 'dataflash-icon',
      src: ICON_URL,
      alt: 'DataFlash'
    });
    panel.appendChild(minimizedIcon);
    
    // Create header with controls
    const header = DOMService.createElement('div', { className: 'dataflash-header' });
    const title = DOMService.createElement('div', { className: 'dataflash-title', textContent: 'DataFlash' });
    const controls = DOMService.createElement('div', { className: 'dataflash-controls' });

    // Add reset button
    const resetButton = DOMService.createElement('button', {
      className: 'dataflash-reset',
      title: 'Reset Position'
    });

    const minimizeButton = DOMService.createElement('button', {
      className: 'dataflash-minimize',
      title: 'Minimize'
    });

    const closeButton = DOMService.createElement('button', {
      className: 'dataflash-close',
      title: 'Close'
    });

    // Build the header structure
    controls.appendChild(resetButton);
    controls.appendChild(minimizeButton);
    controls.appendChild(closeButton);
    header.appendChild(title);
    header.appendChild(controls);
    panel.appendChild(header);

    // Create tabs section
    const tabsSection = DOMService.createElement('div', { className: 'dataflash-tabs' });
    const tabList = DOMService.createElement('div', { className: 'dataflash-tab-list' });
    const tabActions = DOMService.createElement('div', { className: 'dataflash-tab-actions' });
    
    const addTabButton = DOMService.createElement('button', { 
      className: 'dataflash-add-tab',
      textContent: '+',
      title: 'Add New Tab'
    });
    
    tabActions.appendChild(addTabButton);
    tabActions.appendChild(this.calculator.createToggle());
    tabsSection.appendChild(tabList);
    tabsSection.appendChild(tabActions);
    panel.appendChild(tabsSection);

    // Create content section
    const content = DOMService.createElement('div', { className: 'dataflash-content' });

    // Create input section
    const inputSection = DOMService.createElement('div', { className: 'dataflash-section' });
    const inputHeader = DOMService.createElement('div', { 
      className: 'dataflash-section-header',
      innerHTML: '<h4>Input</h4>'
    });
    const inputWrapper = DOMService.createElement('div', { className: 'dataflash-input-wrapper' });
    const textarea = DOMService.createElement('textarea', {
      className: 'dataflash-input',
      placeholder: 'Paste data here...',
      rows: '6'
    });
    const clearText = DOMService.createElement('span', {
      className: 'dataflash-clear-text',
      textContent: 'Clear'
    });
    inputWrapper.appendChild(textarea);
    inputWrapper.appendChild(clearText);
    inputSection.appendChild(inputHeader);
    inputSection.appendChild(inputWrapper);

    // Create output section
    const outputSection = DOMService.createElement('div', { className: 'dataflash-section' });
    const outputHeader = DOMService.createElement('div', {
      className: 'dataflash-section-header',
      innerHTML: '<h4>Output</h4>'
    });
    const metrics = DOMService.createElement('div', { className: 'dataflash-metrics' });
    const saved = DOMService.createElement('div', { className: 'dataflash-saved' });
    metrics.appendChild(saved);
    outputSection.appendChild(outputHeader);
    outputSection.appendChild(metrics);
    
    // Add all sections to content
    content.appendChild(inputSection);
    content.appendChild(outputSection);

    // Add content to panel
    panel.appendChild(content);

    // Add panel to DOM
    document.body.appendChild(panel);

    // Now that elements exist in DOM, add event listeners
    this.addEventListeners(panel);

    // Initialize tabs after panel is in DOM
    this.tabs.updateTabs(panel, () => this.updateSavedDisplay());

    // Add reset functionality after panel is in DOM
    if (resetButton) {
      resetButton.addEventListener('click', () => this.resetPanel());
    }

    // Store initial position after panel is added to DOM
    requestAnimationFrame(() => {
      const rect = panel.getBoundingClientRect();
      this.initialX = rect.left;
      this.initialY = rect.top;
    });

    return panel;
  }

  /**
   * Adds event listeners to panel elements
   * @private
   */
  addEventListeners(panel) {
    const textarea = panel.querySelector('.dataflash-input');
    const minimizeBtn = panel.querySelector('.dataflash-minimize');
    const closeBtn = panel.querySelector('.dataflash-close');
    const addTabBtn = panel.querySelector('.dataflash-add-tab');
    const clearText = panel.querySelector('.dataflash-clear-text');

    // Panel controls
    minimizeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      panel.classList.toggle('minimized');
    });

    closeBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      panel.remove();
    });

    // Restore from minimized
    panel.addEventListener('click', (e) => {
      if (panel.classList.contains('minimized')) {
        e.preventDefault();
        e.stopPropagation();
        this.isDragging = false;
        
        if (e.target === panel || 
            e.target.classList.contains('dataflash-icon') ||
            e.target.classList.contains('dataflash-title')) {
          panel.classList.remove('minimized');
          panel.style.transform = `translate(${this.xOffset}px, ${this.yOffset}px)`;
        }
      }
    });

    // Dragging
    panel.addEventListener('mousedown', this.dragStart.bind(this));
    document.addEventListener('mousemove', this.drag.bind(this));
    document.addEventListener('mouseup', this.dragEnd.bind(this));

    // Calculator toggle
    this.calculator.handleToggle(textarea, () => {
      // Clear existing metrics when toggling calculator
      const metricsContainer = document.querySelector('.dataflash-metrics');
      if (metricsContainer) {
        metricsContainer.innerHTML = '';
      }
      
      // Process current input if calculator is enabled
      if (this.calculator.isEnabled) {
        console.log('Calculator mode enabled, processing input:', textarea.value.trim());
        if (textarea.value.trim()) {
          this.calculator.processExpression(textarea.value.trim(), null);
        }
      } else {
        console.log('Calculator mode disabled, clearing input');
        textarea.value = '';
        this.calculator.updateResult('');
      }
    });

    // Input handling
    textarea.addEventListener('input', (e) => {
      const text = e.target.value.trim();
      
      // Check if calculator is enabled
      if (this.calculator.isEnabled) {
        console.log('Processing calculator input:', text);
        // Calculator mode - process as expression
        if (text) {
          this.calculator.processExpression(text, null);
        } else {
          this.calculator.updateResult('');
        }
        return; // Exit early to prevent data parsing
      }
      
      // Normal mode - process as data
      if (text) {
        const groupedData = parseClipboardData(text);
        if (groupedData.length > 0) {
          const metrics = calculateMetrics(groupedData);
          this.updateUI(metrics);
        }
      }
    });

    // Tab management
    addTabBtn.addEventListener('click', () => {
      this.tabs.addTab();
      this.tabs.updateTabs(panel, () => this.updateSavedDisplay());
    });

    // Clear text
    clearText.addEventListener('click', () => {
      textarea.value = '';
      textarea.dispatchEvent(new Event('input'));
    });
  }

  /**
   * Updates the UI with new metrics
   * @private
   */
  updateUI(metrics) {
    const metricsContainer = document.querySelector('.dataflash-metrics');
    const currentMetricsDiv = DOMService.createElement('div', {
      className: 'dataflash-current-metrics'
    });
    
    // Add df label and save button if metrics exist
    if (metrics.length > 0) {
      metricsContainer.classList.add('has-content');
      const headerDiv = DOMService.createElement('div', {
        className: 'dataflash-df-header',
        innerHTML: `
          <div class="dataflash-df-title">
            <input type="text" class="dataflash-df-name-input" value="df${this.dfCounter}" placeholder="Enter dataframe name">
          </div>
          <div class="dataflash-df-actions">
            <button class="dataflash-save-df-btn" title="Save Dataframe">+</button>
            <button class="dataflash-clear-df-btn" title="Clear Dataframe">
              <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        `
      });
      currentMetricsDiv.appendChild(headerDiv);
    } else {
      metricsContainer.classList.remove('has-content');
    }

    // Add table header
    const tableHeader = DOMService.createElement('div', {
      className: 'dataflash-metrics-header',
      innerHTML: `
        <div class="dataflash-metric-row header">
          <div class="dataflash-metric-col">Columns</div>
          <div class="dataflash-metric-col">Total Sum</div>
        </div>
      `
    });
    currentMetricsDiv.appendChild(tableHeader);
    
    metrics.forEach((metric, index) => {
      const metricDiv = DOMService.createElement('div', {
        className: 'dataflash-metric-row',
        innerHTML: `
          <div class="dataflash-metric-col">${metric.label}</div>
          <div class="dataflash-metric-col">${metric.sum.toLocaleString()}</div>
        `
      });
      currentMetricsDiv.appendChild(metricDiv);
    });

    // Clear and update metrics
    metricsContainer.innerHTML = '';
    
    const savedDiv = DOMService.createElement('div', {
      className: 'dataflash-saved'
    });
    
    metricsContainer.appendChild(currentMetricsDiv);
    metricsContainer.appendChild(savedDiv);

    this.addMetricEventListeners(currentMetricsDiv, metrics);
  }

  /**
   * Updates the saved sums display
   * @private
   */
  updateSavedDisplay() {
    const activeTab = this.tabs.getActiveTab();
    if (!activeTab) return;

    const savedDisplay = document.querySelector('.dataflash-saved');
    if (!savedDisplay) return;

    savedDisplay.innerHTML = activeTab.savedSums.map((sum, index) => {
      // If it's a dataframe (has columns)
      if (sum.columns) {
        return `
          <div class="dataflash-saved-item dataframe">
            <div class="dataflash-saved-header">
              <span class="dataflash-saved-label" data-index="${index}">${sum.label}</span>
              <div class="dataflash-df-controls">
                <button class="dataflash-reload-df-btn" data-index="${index}" title="Reload Dataframe">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4M17 8l-5-5-5 5M12 3v12"/>
                  </svg>
                </button>
                <button class="dataflash-minimize-df-btn" data-index="${index}" title="Minimize Dataframe">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M18 15l-6 6-6-6"/>
                  </svg>
                </button>
                <button class="dataflash-delete-btn" data-index="${index}" title="Delete">
                  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
            <div class="dataflash-saved-table">
              <div class="dataflash-table-header">
                <div class="dataflash-table-col">Column</div>
                <div class="dataflash-table-col">Total Amount</div>
                <div class="dataflash-table-col">Actions</div>
              </div>
              ${sum.columns.map((col, colIndex) => `
                <div class="dataflash-table-row">
                  <div class="dataflash-table-col">${col.label}</div>
                  <div class="dataflash-table-col">${col.sum.toLocaleString()}</div>
                  <div class="dataflash-table-col">
                    <div class="dataflash-column-controls">
                      <button class="dataflash-copy-btn" data-index="${index}" data-col="${colIndex}" title="Copy">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                        </svg>
                      </button>
                      ${!this.calculator.isEnabled ? `
                        <button class="dataflash-stats-btn" data-index="${index}" data-col="${colIndex}" title="Statistics">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                            <path d="M18 20V10M12 20V4M6 20v-6"/>
                          </svg>
                        </button>
                      ` : ''}
                    </div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        `;
      } else {
        // Regular saved sum (not a dataframe)
        return `
          <div class="dataflash-saved-item">
            <div class="dataflash-saved-info">
              <span class="dataflash-saved-label" data-index="${index}">${sum.label}</span>
              <span class="dataflash-saved-value">${sum.value.toLocaleString()}</span>
            </div>
            <div class="dataflash-saved-controls">
              <button class="dataflash-delete-btn" data-index="${index}" title="Delete">
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            </div>
          </div>
        `;
      }
    }).join('');

    this.addSavedItemEventListeners(savedDisplay, activeTab);
  }

  /**
   * Adds event listeners to metric elements
   * @private
   */
  addMetricEventListeners(container, metrics) {
    const saveButton = container.querySelector('.dataflash-save-df-btn');
    const clearButton = container.querySelector('.dataflash-clear-df-btn');

    if (saveButton) {
      saveButton.addEventListener('click', () => {
        const activeTab = this.tabs.getActiveTab();
        if (activeTab) {
          if (!activeTab.savedSums) {
            activeTab.savedSums = [];
          }
          
          const nameInput = container.querySelector('.dataflash-df-name-input');
          const dfName = nameInput ? nameInput.value.trim() : `df${this.dfCounter}`;
          
          // Save all metrics as one dataframe entry
          activeTab.savedSums.push({
            value: metrics.reduce((sum, m) => sum + m.sum, 0),
            label: dfName || `df${this.dfCounter}`,
            numbers: metrics.map(m => m.numbers).flat(),
            isNumeric: true,
            columns: metrics.map(m => ({
              label: m.label,
              sum: m.sum,
              numbers: m.numbers,
              isNumeric: m.isNumeric
            }))
          });
          
          this.dfCounter++; // Increment counter after saving
          this.updateSavedDisplay();

          // Clear the current metrics display
          const currentMetricsDiv = document.querySelector('.dataflash-current-metrics');
          if (currentMetricsDiv) {
            currentMetricsDiv.innerHTML = '';
          }
        }
        
        const textarea = document.querySelector('.dataflash-input');
        if (textarea) {
          textarea.value = '';
          textarea.dispatchEvent(new Event('input'));
        }
      });
    }

    if (clearButton) {
      clearButton.addEventListener('click', () => {
        // Clear the current metrics display
        const currentMetricsDiv = document.querySelector('.dataflash-current-metrics');
        if (currentMetricsDiv) {
          currentMetricsDiv.innerHTML = '';
        }
        
        // Clear the textarea
        const textarea = document.querySelector('.dataflash-input');
        if (textarea) {
          textarea.value = '';
          textarea.dispatchEvent(new Event('input'));
        }
      });
    }
  }

  /**
   * Adds event listeners to saved item elements
   * @private
   */
  addSavedItemEventListeners(container, activeTab) {
    // Label editing
    container.querySelectorAll('.dataflash-saved-label').forEach(label => {
      label.addEventListener('click', (e) => {
        const index = parseInt(e.target.dataset.index);
        const currentLabel = activeTab.savedSums[index].label;
        
        const input = DOMService.createElement('input', {
          className: 'dataflash-saved-input',
          value: currentLabel
        });
        
        e.target.replaceWith(input);
        input.focus();
        
        const saveLabel = () => {
          activeTab.savedSums[index].label = input.value || `Sum ${index + 1}`;
          this.updateSavedDisplay();
        };
        
        input.addEventListener('blur', saveLabel);
        input.addEventListener('keydown', (e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            saveLabel();
          }
        });
      });
    });

    // Copy buttons
    container.querySelectorAll('.dataflash-copy-btn').forEach(btn => {
      btn.addEventListener('click', async () => {
        const index = parseInt(btn.dataset.index);
        const colIndex = btn.dataset.col ? parseInt(btn.dataset.col) : null;
        
        let value;
        if (colIndex !== null) {
          // Copy column data
          const column = activeTab.savedSums[index].columns[colIndex];
          value = column.numbers.join('\n');
        } else {
          // Copy regular sum
          value = activeTab.savedSums[index].value;
        }
        
        await DOMService.copyToClipboard(value.toString());
        
        const originalHTML = btn.innerHTML;
        btn.innerHTML = '✓';
        setTimeout(() => {
          btn.innerHTML = originalHTML;
        }, 1000);
      });
    });

    // Reload dataframe button
    container.querySelectorAll('.dataflash-reload-df-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const index = parseInt(btn.dataset.index);
        const dataframe = activeTab.savedSums[index];
        
        if (dataframe.columns && dataframe.columns.length > 0) {
          const metricsContainer = document.querySelector('.dataflash-metrics');
          const currentMetricsDiv = document.querySelector('.dataflash-current-metrics');
          
          if (currentMetricsDiv) {
            currentMetricsDiv.innerHTML = '';
          }

          const reloadedData = DOMService.createElement('div', {
            className: 'dataflash-reloaded-data',
            innerHTML: `
              <div class="dataflash-reloaded-header">
                <h4>Reloaded Data: ${dataframe.label}</h4>
                <div class="dataflash-stats-actions">
                  <button class="dataflash-expand-btn" title="Expand">⤢</button>
                  <button class="dataflash-clear-df-btn" title="Clear">
                    <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
              <div class="dataflash-reloaded-content" style="--num-columns: ${dataframe.columns.length}">
                <div class="dataflash-table-wrapper">
                  <div class="dataflash-table">
                    <div class="dataflash-table-header">
                      ${dataframe.columns.map(col => `
                        <div class="dataflash-table-col">${col.label}</div>
                      `).join('')}
                    </div>
                    ${Array.from({ length: Math.max(...dataframe.columns.map(col => col.numbers.length)) }, (_, i) => `
                      <div class="dataflash-table-row">
                        ${dataframe.columns.map(col => `
                          <div class="dataflash-table-col">${col.numbers[i] !== undefined ? col.numbers[i] : ''}</div>
                        `).join('')}
                      </div>
                    `).join('')}
                  </div>
                </div>
              </div>
            `
          });

          if (!currentMetricsDiv) {
            const newCurrentMetricsDiv = DOMService.createElement('div', {
              className: 'dataflash-current-metrics'
            });
            metricsContainer.insertBefore(newCurrentMetricsDiv, metricsContainer.firstChild);
            newCurrentMetricsDiv.appendChild(reloadedData);
          } else {
            currentMetricsDiv.appendChild(reloadedData);
          }

          // Add clear button event listener
          const clearButton = reloadedData.querySelector('.dataflash-clear-df-btn');
          if (clearButton) {
            clearButton.addEventListener('click', () => {
              if (currentMetricsDiv) {
                currentMetricsDiv.innerHTML = '';
              }
            });
          }

          // Add expand button event listener
          const expandButton = reloadedData.querySelector('.dataflash-expand-btn');
          if (expandButton) {
            expandButton.addEventListener('click', () => {
              const panel = document.querySelector('.dataflash-panel');
              if (panel) {
                panel.classList.toggle('expanded');
                // Update button state
                expandButton.classList.toggle('expanded');
                // Ensure proper width transition
                if (panel.classList.contains('expanded')) {
                  panel.style.width = '1000px';
                } else {
                  panel.style.width = `${this.initialWidth}px`;
                }
              }
            });
          }
        }
      });
    });

    // Delete buttons
    container.querySelectorAll('.dataflash-delete-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const index = parseInt(btn.dataset.index);
        activeTab.savedSums.splice(index, 1);
        this.updateSavedDisplay();
      });
    });

    // Statistics buttons
    container.querySelectorAll('.dataflash-stats-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const index = parseInt(btn.dataset.index);
        const colIndex = parseInt(btn.dataset.col);
        const column = activeTab.savedSums[index].columns[colIndex];
        
        if (column.numbers && column.numbers.length > 0) {
          // Count nulls and empty values first
          const nullCount = column.numbers.filter(n => 
            n === null || 
            n === 'null' || 
            n === 'NULL' || 
            n === 'None' || 
            n === 'NONE' || 
            n === 'none'
          ).length;

          const emptyCount = column.numbers.filter(n => 
            n === '' || 
            n === undefined || 
            (typeof n === 'string' && n.trim() === '')
          ).length;

          // Filter out nulls and empty values for numeric calculations
          const validNumbers = column.numbers
            .filter(n => {
              const isNull = n === null || 
                           n === 'null' || 
                           n === 'NULL' || 
                           n === 'None' || 
                           n === 'NONE' || 
                           n === 'none';
              const isEmpty = n === '' || 
                            n === undefined || 
                            (typeof n === 'string' && n.trim() === '');
              return !isNull && !isEmpty;
            })
            .map(n => typeof n === 'string' ? parseFloat(n.replace(/,/g, '')) : parseFloat(n))
            .filter(n => !isNaN(n));
          
          const count = validNumbers.length;
          const sum = validNumbers.reduce((a, b) => a + b, 0);
          const average = count > 0 ? sum / count : 0;
          const min = count > 0 ? Math.min(...validNumbers) : 0;
          const max = count > 0 ? Math.max(...validNumbers) : 0;
          
          const metricsContainer = document.querySelector('.dataflash-metrics');
          const currentMetricsDiv = document.querySelector('.dataflash-current-metrics');
          
          if (currentMetricsDiv) {
            currentMetricsDiv.innerHTML = '';
          }

          const statsDiv = DOMService.createElement('div', {
            className: 'dataflash-stats-data',
            innerHTML: `
              <div class="dataflash-stats-header">
                <div class="dataflash-stats-title">
                  <h4>Statistics for ${column.label}</h4>
                </div>
                <div class="dataflash-stats-actions">
                  <button class="dataflash-clear-stats-btn" title="Clear Statistics">-</button>
                </div>
              </div>
              <div class="dataflash-stats-content">
                <div class="dataflash-stats-section">
                  <div class="dataflash-stats-section-header">Data Quality</div>
                  <div class="dataflash-stats-row">
                    <span class="dataflash-stats-label">Null/None Values:</span>
                    <span class="dataflash-stats-value" title="Click to copy">${nullCount}</span>
                  </div>
                  <div class="dataflash-stats-row">
                    <span class="dataflash-stats-label">Empty/Blank Values:</span>
                    <span class="dataflash-stats-value" title="Click to copy">${emptyCount}</span>
                  </div>
                </div>
                <div class="dataflash-stats-section">
                  <div class="dataflash-stats-section-header">Numeric Statistics</div>
                  <div class="dataflash-stats-row">
                    <span class="dataflash-stats-label">Total Sum:</span>
                    <span class="dataflash-stats-value" title="Click to copy">${sum.toLocaleString()}</span>
                  </div>
                  <div class="dataflash-stats-row">
                    <span class="dataflash-stats-label">Valid Numbers:</span>
                    <span class="dataflash-stats-value" title="Click to copy">${count}</span>
                  </div>
                  <div class="dataflash-stats-row">
                    <span class="dataflash-stats-label">Average:</span>
                    <span class="dataflash-stats-value" title="Click to copy">${average.toLocaleString()}</span>
                  </div>
                  <div class="dataflash-stats-row">
                    <span class="dataflash-stats-label">Min:</span>
                    <span class="dataflash-stats-value" title="Click to copy">${min.toLocaleString()}</span>
                  </div>
                  <div class="dataflash-stats-row">
                    <span class="dataflash-stats-label">Max:</span>
                    <span class="dataflash-stats-value" title="Click to copy">${max.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            `
          });

          if (!currentMetricsDiv) {
            const newCurrentMetricsDiv = DOMService.createElement('div', {
              className: 'dataflash-current-metrics'
            });
            metricsContainer.insertBefore(newCurrentMetricsDiv, metricsContainer.firstChild);
            newCurrentMetricsDiv.appendChild(statsDiv);
          } else {
            currentMetricsDiv.appendChild(statsDiv);
          }

          // Add clear button event listener
          const clearStatsButton = statsDiv.querySelector('.dataflash-clear-stats-btn');
          if (clearStatsButton) {
            clearStatsButton.addEventListener('click', () => {
              if (currentMetricsDiv) {
                currentMetricsDiv.innerHTML = '';
              }
            });
          }

          // Add click-to-copy for all stat values
          statsDiv.querySelectorAll('.dataflash-stats-value').forEach(valueSpan => {
            valueSpan.addEventListener('click', async () => {
              const value = valueSpan.textContent;
              await DOMService.copyToClipboard(value.replace(/,/g, ''));
              
              // Visual feedback
              const originalText = valueSpan.textContent;
              valueSpan.textContent = '✓ Copied!';
              valueSpan.classList.add('copied');
              
              setTimeout(() => {
                valueSpan.textContent = originalText;
                valueSpan.classList.remove('copied');
              }, 1000);
            });
          });
        }
      });
    });

    // Minimize dataframe buttons
    container.querySelectorAll('.dataflash-minimize-df-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const savedItem = btn.closest('.dataflash-saved-item');
        if (savedItem) {
          savedItem.classList.toggle('minimized');
        }
      });
    });
  }

  /**
   * Handles start of panel dragging
   * @private
   */
  dragStart(e) {
    const panel = e.currentTarget;
    
    if (panel.classList.contains('minimized')) {
      return;
    }

    if (e.target.classList.contains('dataflash-input') || 
        e.target.classList.contains('dataflash-minimize') ||
        e.target.classList.contains('dataflash-close') ||
        e.target.classList.contains('dataflash-add-btn') ||
        e.target.classList.contains('dataflash-copy-btn') ||
        e.target.classList.contains('dataflash-load-btn') ||
        e.target.classList.contains('dataflash-delete-btn')) {
      return;
    }
    
    this.initialX = e.clientX - this.xOffset;
    this.initialY = e.clientY - this.yOffset;

    if (e.target === panel || e.target.closest('.dataflash-header')) {
      this.isDragging = true;
      panel.classList.add('dragging');
    }
  }

  /**
   * Handles panel dragging
   * @private
   */
  drag(e) {
    if (this.isDragging) {
      e.preventDefault();

      this.currentX = e.clientX - this.initialX;
      this.currentY = e.clientY - this.initialY;

      this.xOffset = this.currentX;
      this.yOffset = this.currentY;

      const panel = document.querySelector('.dataflash-panel');
      if (panel) {
        panel.style.transform = `translate(${this.currentX}px, ${this.currentY}px)`;
      }
    }
  }

  /**
   * Handles end of panel dragging
   * @private
   */
  dragEnd() {
    this.initialX = this.currentX;
    this.initialY = this.currentY;
    this.isDragging = false;

    const panel = document.querySelector('.dataflash-panel');
    if (panel) {
      panel.classList.remove('dragging');
    }
  }

  resetPanel() {
    const panel = document.querySelector('.dataflash-panel');
    if (!panel) return;

    // If panel is minimized, restore it first
    if (panel.classList.contains('minimized')) {
      panel.classList.remove('minimized');
    }

    // Reset position and transform
    this.xOffset = 0;
    this.yOffset = 0;
    panel.style.transform = `translate(${this.xOffset}px, ${this.yOffset}px)`;
    
    // Reset size to initial dimensions
    panel.style.width = `${this.initialWidth}px`;
    panel.style.height = 'auto';
    panel.style.minHeight = '100px';
    panel.style.maxHeight = '90vh';
    panel.style.padding = '16px';
    panel.style.borderRadius = '12px';
    
    // Remove expanded state if present
    panel.classList.remove('expanded');
    
    // Reset dragging state
    this.isDragging = false;
    this.currentX = 0;
    this.currentY = 0;
    this.isMinimized = false;
  }

  toggleMinimize() {
    const panel = document.querySelector('.dataflash-panel');
    if (!panel) return;

    this.isMinimized = !this.isMinimized;
    
    if (this.isMinimized) {
      // First add the class to start the transition
      panel.classList.add('minimized');
      
      // Force a reflow to ensure the transition starts
      panel.offsetHeight;
      
      // Then apply the size changes
      panel.style.width = '32px';
      panel.style.height = '32px';
      panel.style.minHeight = '32px';
      panel.style.padding = '4px';
      panel.style.borderRadius = '50%';
    } else {
      // Remove minimized class first
      panel.classList.remove('minimized');
      
      // Force a reflow to ensure the transition starts
      panel.offsetHeight;
      
      // Then restore original dimensions
      panel.style.width = `${this.initialWidth}px`;
      panel.style.height = `${this.initialHeight}px`;
      panel.style.minHeight = `${this.initialHeight}px`;
      panel.style.padding = '16px';
      panel.style.borderRadius = '12px';
    }
  }
}
