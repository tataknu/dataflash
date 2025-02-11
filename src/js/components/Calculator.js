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
    const container = DOMService.createElement('div', {
      className: 'dataflash-calculator-toggle'
    });

    const leftSection = DOMService.createElement('div', {
      className: 'dataflash-calc-left'
    });

    const toggle = DOMService.createElement('label', {
      className: 'dataflash-toggle'
    });

    const input = DOMService.createElement('input', {
      type: 'checkbox',
      id: 'calcToggle',
      checked: this.isEnabled
    });

    const slider = DOMService.createElement('span', {
      className: 'dataflash-toggle-slider'
    });

    const label = DOMService.createElement('span', {
      className: 'dataflash-calc-label',
      textContent: 'Calculator'
    });

    const resultContainer = DOMService.createElement('div', {
      className: 'dataflash-calc-container'
    });

    const result = DOMService.createElement('span', {
      className: 'dataflash-calc-result'
    });

    toggle.appendChild(input);
    toggle.appendChild(slider);
    leftSection.appendChild(toggle);
    leftSection.appendChild(label);
    resultContainer.appendChild(result);
    container.appendChild(leftSection);
    container.appendChild(resultContainer);

    // Add initial state class if calculator is enabled
    if (this.isEnabled) {
      container.classList.add('calculator-enabled');
    }

    // Add click handler for the result to copy it
    result.addEventListener('click', () => {
      if (result.textContent) {
        const value = result.textContent.replace('= ', '');
        navigator.clipboard.writeText(value);
      }
    });

    // Add toggle handler directly to the input
    input.addEventListener('change', () => {
      this.isEnabled = input.checked;
      console.log('Calculator enabled:', this.isEnabled);
      container.classList.toggle('calculator-enabled', this.isEnabled);
    });

    return container;
  }

  /**
   * Handles calculator mode toggle
   * @param {HTMLElement} textarea - The input textarea
   * @param {Function} updateUI - Function to update the UI
   */
  handleToggle(textarea, updateUI) {
    // Wait for elements to be available
    const maxAttempts = 10;
    let attempts = 0;

    const initializeToggle = () => {
      const calcToggle = document.querySelector('#calcToggle');
      const container = document.querySelector('.dataflash-calculator-toggle');
      
      if (!calcToggle || !container) {
        if (attempts < maxAttempts) {
          attempts++;
          setTimeout(initializeToggle, 100); // Retry after 100ms
          return;
        }
        console.error('Calculator toggle elements not found after retries');
        return;
      }

      // Add change handler to the toggle
      calcToggle.addEventListener('change', () => {
        this.isEnabled = calcToggle.checked;
        console.log('Calculator enabled:', this.isEnabled);
        
        // Update container class
        container.classList.toggle('calculator-enabled', this.isEnabled);
        
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
      calcToggle.checked = this.isEnabled;
      container.classList.toggle('calculator-enabled', this.isEnabled);
      // Set initial placeholder
      textarea.placeholder = this.isEnabled ? 'Try writing here "1 + 2 + 3"' : 'Paste data here...';
    };

    // Start initialization
    initializeToggle();
  }

  /**
   * Updates the calculator result display
   * @param {string|number} result - The result to display
   */
  updateResult(result) {
    const resultElement = document.querySelector('.dataflash-calc-result');
    if (resultElement) {
      console.log('Updating result element with:', result); // Debug log
      
      if (result === 'Invalid') {
        resultElement.textContent = 'Na';
      } else if (result === '') {
        resultElement.textContent = '';
      } else {
        // Format number with commas for thousands
        const formattedResult = typeof result === 'number' ? 
          result.toLocaleString() : result;
        resultElement.textContent = `= ${formattedResult}`;
      }

      // Make sure the result is visible
      resultElement.style.display = result === '' ? 'none' : 'block';
      console.log('Result element content:', resultElement.textContent); // Debug log
    } else {
      console.error('Result element not found'); // Debug log
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
