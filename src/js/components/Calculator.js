import { evaluateExpression } from '../utils/calculator.js';
import { DOMService } from '../services/domService.js';

export class Calculator {
  constructor() {
    this.isEnabled = false;
  }

  /**
   * Creates calculator toggle UI
   * @returns {HTMLElement} Calculator toggle element
   */
  createToggle() {
    const button = DOMService.createElement('button', {
      className: 'dataflash-calc-btn',
      textContent: '=',
      title: 'Toggle Calculator Mode'
    });

    // Add initial state class if calculator is enabled
    if (this.isEnabled) {
      button.classList.add('active');
    }

    return button;
  }

  /**
   * Handles calculator mode toggle
   * @param {HTMLElement} textarea - The input textarea
   * @param {Function} updateUI - Function to update the UI
   */
  handleToggle(textarea, updateUI) {
    const calcBtn = document.querySelector('.dataflash-calc-btn');
    if (!calcBtn) {
      console.error('Calculator button not found');
      return;
    }

    // Add click handler to the button
    calcBtn.addEventListener('click', () => {
      this.isEnabled = !this.isEnabled;
      console.log('Calculator enabled:', this.isEnabled);
      
      // Update button state
      calcBtn.classList.toggle('active', this.isEnabled);
      
      // Update textarea placeholder based on calculator mode
      textarea.placeholder = this.isEnabled ? 'Try writing here "1 + 2 + 3"' : 'Paste data here...';
      
      // Process current input if calculator is enabled
      if (this.isEnabled && textarea.value.trim()) {
        this.processExpression(textarea.value.trim(), updateUI);
      } else {
        this.updateResult('');
      }

      // Call the updateUI callback
      if (updateUI) {
        updateUI();
      }
    });

    // Set initial state
    calcBtn.classList.toggle('active', this.isEnabled);
    // Set initial placeholder
    textarea.placeholder = this.isEnabled ? 'Try writing here "1 + 2 + 3"' : 'Paste data here...';
  }

  /**
   * Updates the calculator result display
   * @param {string|number} result - The result to display
   */
  updateResult(result) {
    const metricsContainer = document.querySelector('.dataflash-metrics');
    if (!metricsContainer) return;

    // Clear existing content
    metricsContainer.innerHTML = '';

    if (result === '' || result === 'Invalid' || result === 'Na') {
      return;
    }

    // Create current metrics div
    const currentMetricsDiv = DOMService.createElement('div', {
      className: 'dataflash-current-metrics'
    });

    // Add result display
    const resultDiv = DOMService.createElement('div', {
      className: 'dataflash-metric-row',
      innerHTML: `
        <div class="dataflash-metric-col">Result</div>
        <div class="dataflash-metric-col">${typeof result === 'number' ? result.toLocaleString() : result}</div>
      `
    });

    currentMetricsDiv.appendChild(resultDiv);
    metricsContainer.appendChild(currentMetricsDiv);

    // Add click-to-copy functionality
    const resultValue = resultDiv.querySelector('.dataflash-metric-col:last-child');
    if (resultValue) {
      resultValue.style.cursor = 'pointer';
      resultValue.title = 'Click to copy';
      resultValue.addEventListener('click', async () => {
        const value = typeof result === 'number' ? result.toString() : result;
        await DOMService.copyToClipboard(value);
        
        const originalText = resultValue.textContent;
        resultValue.textContent = '✓ Copied!';
        setTimeout(() => {
          resultValue.textContent = originalText;
        }, 1000);
      });
    }
  }

  /**
   * Processes a calculator expression
   * @param {string} expr - The expression to evaluate
   * @param {Function} updateUI - Function to update the UI
   */
  processExpression(expr, updateUI) {
    if (!this.isEnabled || !expr) {
      this.updateResult('');
      return;
    }

    try {
      console.log('Processing expression:', expr); // Debug log
      const result = evaluateExpression(expr);
      console.log('Evaluation result:', result); // Debug log
      
      // Handle empty or invalid results
      if (result === '' || result === 'Invalid') {
        this.updateResult(result);
        return;
      }

      // Convert result to number for calculations
      const numericResult = typeof result === 'number' ? result : parseFloat(result);
      
      if (!isNaN(numericResult)) {
        this.updateResult(numericResult);
      } else {
        this.updateResult('Invalid');
      }
    } catch (error) {
      console.error('Calculator error:', error);
      this.updateResult('Invalid');
    }
  }

  /**
   * Handles input changes in calculator mode
   * @param {string} text - The input text
   * @param {Function} updateUI - Function to update the UI
   */
  handleInput(text, updateUI) {
    if (this.isEnabled) {
      this.processExpression(text, updateUI);
    }
  }
}
