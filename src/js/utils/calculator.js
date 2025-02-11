/**
 * Evaluates a mathematical expression string
 * @param {string} expr - The expression to evaluate
 * @returns {string|number} - The result or 'Invalid' if expression is invalid
 */
export function evaluateExpression(expr) {
  try {
    // Remove all spaces first
    expr = expr.replace(/\s+/g, '').trim();
    
    // Return empty if no input
    if (expr === '') {
      return '';
    }
    
    // If it's just a number (including negative), return it directly
    if (/^-?\d+\.?\d*$/.test(expr)) {
      return parseFloat(expr);
    }
    
    // Basic validation - allow negative numbers
    if (!/^[-\d+*/().]+$/.test(expr)) {
      return 'Invalid';
    }

    // Handle negative numbers by marking them
    expr = expr
      .replace(/^-|\G(?:[-+*/])-/g, '~')
      .replace(/\(-/g, '(~');
    
    const tokens = parseTokens(expr);
    const result = calculate(tokens);
    
    // Validate the result
    if (typeof result !== 'number' || !isFinite(result)) {
      return 'Invalid';
    }
    
    // Format the result
    return Number.isInteger(result) ? result : parseFloat(result.toFixed(4));
    
  } catch (e) {
    console.error('Calculator error:', e);
    return 'Invalid';
  }
}

function parseTokens(expr) {
  const tokens = [];
  let numBuffer = '';
  let isNegative = false;

  for (let i = 0; i < expr.length; i++) {
    const char = expr[i];
    if (char === '~') {
      isNegative = true;
    } else if (/\d/.test(char) || char === '.') {
      numBuffer += char;
    } else {
      if (numBuffer) {
        tokens.push(isNegative ? -parseFloat(numBuffer) : parseFloat(numBuffer));
        numBuffer = '';
        isNegative = false;
      }
      if ('+-*/()'.includes(char)) {
        tokens.push(char);
      }
    }
  }
  
  if (numBuffer) {
    tokens.push(isNegative ? -parseFloat(numBuffer) : parseFloat(numBuffer));
  }
  
  return tokens;
}

function calculate(tokens) {
  let numbers = [];
  let operators = [];
  
  const precedence = {
    '+': 1,
    '-': 1,
    '*': 2,
    '/': 2
  };
  
  function applyOp() {
    const op = operators.pop();
    const b = numbers.pop();
    const a = numbers.pop();
    
    switch(op) {
      case '+': numbers.push(a + b); break;
      case '-': numbers.push(a - b); break;
      case '*': numbers.push(a * b); break;
      case '/': numbers.push(a / b); break;
    }
  }
  
  for (let token of tokens) {
    if (typeof token === 'number') {
      numbers.push(token);
    } else if ('+-*/'.includes(token)) {
      while (operators.length && precedence[operators[operators.length - 1]] >= precedence[token]) {
        applyOp();
      }
      operators.push(token);
    }
  }
  
  while (operators.length) {
    applyOp();
  }
  
  return numbers[0];
}
