/**
 * Parses clipboard data and extracts numeric and non-numeric columns
 * @param {string} text - The input text to parse
 * @returns {Array} Array of column data with sums and metadata
 */
export function parseClipboardData(text) {
  const lines = text.trim().split(/[\n\r]+/);
  let headers = null;
  let startIndex = 0;
  let columnSums = new Map();

  // Check for headers
  if (lines.length > 0) {
    const firstLine = lines[0].trim();
    const isHeader = firstLine.includes('\t') || isNaN(parseFloat(firstLine.replace(/,/g, '')));
    
    if (isHeader) {
      headers = firstLine.includes('\t') ? firstLine.split('\t') : [firstLine];
      startIndex = 1;
    }
  }

  // Initialize columns
  initializeColumns(lines, startIndex, headers, columnSums);

  // Process data rows
  processDataRows(lines, startIndex, columnSums);

  // Convert to array of results
  return formatResults(columnSums);
}

function initializeColumns(lines, startIndex, headers, columnSums) {
  const firstDataLine = lines[startIndex].split('\t');
  firstDataLine.forEach((value, index) => {
    const isNumericColumn = checkNumericColumn(lines, startIndex, index);
    columnSums.set(index, {
      label: headers ? headers[index] : `Column ${index + 1}`,
      sum: 0,
      count: 0,
      isNumeric: isNumericColumn,
      numbers: []
    });
  });
}

function checkNumericColumn(lines, startIndex, columnIndex) {
  return lines.slice(startIndex).every(line => {
    const values = line.split('\t');
    const value = values[columnIndex];
    const numValue = parseFloat(value?.replace(/,/g, ''));
    return !isNaN(numValue);
  });
}

function processDataRows(lines, startIndex, columnSums) {
  for (let i = startIndex; i < lines.length; i++) {
    const line = lines[i].trim();
    if (!line) continue;

    const values = line.split('\t');
    values.forEach((value, colIndex) => {
      const column = columnSums.get(colIndex);
      if (column) {
        const cleanValue = value.trim();
        if (column.isNumeric) {
          const numValue = parseFloat(cleanValue.replace(/,/g, ''));
          if (!isNaN(numValue)) {
            column.numbers.push(cleanValue);
            column.sum += numValue;
          }
        } else {
          column.count++;
          column.numbers.push(cleanValue);
        }
      }
    });
  }
}

function formatResults(columnSums) {
  return Array.from(columnSums.values())
    .filter(column => column.numbers.length > 0)
    .map(column => ({
      label: column.label,
      numbers: column.numbers,
      sum: column.isNumeric ? column.sum : column.count,
      isNumeric: column.isNumeric
    }));
}

/**
 * Calculates metrics for grouped data
 * @param {Array} groupedData - Array of grouped data objects
 * @returns {Array} Array of calculated metrics
 */
export function calculateMetrics(groupedData) {
  return groupedData.map(group => ({
    label: group.label,
    sum: group.sum,
    numbers: group.numbers,
    isNumeric: group.isNumeric
  }));
}
