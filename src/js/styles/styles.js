export const panelStyles = `
.dataflash-panel {
  position: fixed;
  top: 20px;
  right: 20px;
  background: #ffffff;
  border: none;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
  z-index: 2147483647;
  min-width: 280px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  cursor: default;
  user-select: none;
  color: #1a1a1a;
  box-sizing: border-box;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.dataflash-panel.dragging {
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12);
  transition: none;
}

.dataflash-panel * {
  box-sizing: border-box;
}

.dataflash-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid #e9ecef;
  cursor: move;
}

.dataflash-title {
  font-weight: 600;
  margin: 0;
  font-size: 16px;
  display: flex;
  align-items: center;
  color: #1a1a1a;
  letter-spacing: -0.01em;
}

.dataflash-icon {
  width: 24px;
  height: 24px;
  margin-right: 8px;
  object-fit: contain;
  opacity: 0.9;
  display: none;
}
`;

export const buttonStyles = `
.dataflash-minimize,
.dataflash-close {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  width: 16px;
  height: 16px;
  border-radius: 50%;
  margin-left: 6px;
  position: relative;
  transition: all 0.2s ease;
  opacity: 0.6;
}

.dataflash-close {
  background-color: #ff4757;
}

.dataflash-minimize {
  background-color: #ffa502;
}

.dataflash-minimize:hover,
.dataflash-close:hover {
  opacity: 1;
  transform: scale(1.05);
}

.dataflash-controls {
  display: flex;
  gap: 4px;
  padding-left: 8px;
}

.dataflash-add-btn {
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 6px;
  cursor: pointer;
  padding: 4px 8px;
  font-size: 12px;
  color: #495057;
  height: 24px;
  line-height: 1;
  transition: all 0.2s ease;
}

.dataflash-add-btn:hover {
  background: #e9ecef;
  border-color: #dee2e6;
}
`;

export const contentStyles = `
.dataflash-content {
  margin-top: 12px;
}

.dataflash-input {
  cursor: text;
  width: 100%;
  padding: 12px;
  margin-bottom: 12px;
  border: 1px solid #e9ecef;
  border-radius: 8px;
  font-size: 13px;
  background: #f8f9fa;
  resize: none;
  height: 100px;
  color: #495057;
  display: block;
  transition: all 0.2s ease;
  font-family: inherit;
}

.dataflash-input:focus {
  outline: none;
  border-color: #4dabf7;
  background: #ffffff;
  box-shadow: 0 0 0 3px rgba(77, 171, 247, 0.1);
}

.dataflash-metrics {
  background: #f8f9fa;
  padding: 12px;
  border-radius: 8px;
  font-size: 13px;
  border: 1px solid #e9ecef;
}

.dataflash-df-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid #e9ecef;
}

.dataflash-df-title h4 {
  margin: 0;
  color: #1a1a1a;
  font-size: 14px;
  font-weight: 600;
}

.dataflash-save-df-btn {
  background: #e7f5ff;
  border: 1px solid #74c0fc;
  border-radius: 6px;
  cursor: pointer;
  padding: 4px 12px;
  font-size: 14px;
  color: #1971c2;
  height: 28px;
  line-height: 1;
  transition: all 0.2s ease;
}

.dataflash-save-df-btn:hover {
  background: #d0ebff;
  border-color: #339af0;
  transform: translateY(-1px);
}

.dataflash-metrics-header {
  margin-bottom: 8px;
}

.dataflash-metric-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
  align-items: center;
  padding: 8px 0;
  border-bottom: 1px solid #e9ecef;
}

.dataflash-metric-row.header {
  font-weight: 600;
  color: #495057;
  padding-bottom: 12px;
  border-bottom: 2px solid #e9ecef;
}

.dataflash-metric-col {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.dataflash-metric-col:last-child {
  text-align: right;
}

.dataflash-sum-container {
  display: flex;
  align-items: center;
  gap: 8px;
}

.dataflash-current-sum {
  color: #1a1a1a;
  font-weight: 500;
}
`;

export const tabStyles = `
.dataflash-tabs {
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 8px 0;
  padding-bottom: 8px;
}

.dataflash-tab-list {
  display: flex;
  gap: 4px;
  flex-grow: 1;
  overflow-x: auto;
  scrollbar-width: none;
  padding: 0 4px;
}

.dataflash-tab-list::-webkit-scrollbar {
  display: none;
}

.dataflash-tab {
  padding: 6px 12px;
  border: none;
  cursor: pointer;
  font-size: 12px;
  background: transparent;
  white-space: nowrap;
  display: flex;
  align-items: center;
  gap: 8px;
  color: #868e96;
  position: relative;
  border-radius: 6px;
  transition: all 0.2s ease;
}

.dataflash-tab:hover {
  background: #f1f3f5;
  color: #495057;
}

.dataflash-tab.active {
  background: #e7f5ff;
  color: #1971c2;
  font-weight: 500;
}

.dataflash-tab-close {
  opacity: 0.6;
  font-size: 14px;
  transition: opacity 0.2s ease;
}

.dataflash-tab:hover .dataflash-tab-close {
  opacity: 1;
}

.dataflash-tab-input {
  background: none;
  border: none;
  font-size: 12px;
  color: inherit;
  padding: 0;
  width: 60px;
  outline: none;
}
`;

export const minimizedStyles = `
.dataflash-panel.minimized {
  padding: 2px;
  min-width: auto;
  width: 48px;
  height: 48px;
  overflow: hidden;
  border-radius: 50%;
  cursor: pointer;
  background: #ffffff;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  transition: all 0.2s ease;
}

.dataflash-panel.minimized .dataflash-icon {
  display: block;
  width: 44px;
  height: 44px;
  margin: 0;
  opacity: 1;
}

.dataflash-panel.minimized:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
}

.dataflash-panel.minimized .dataflash-content,
.dataflash-panel.minimized .dataflash-controls,
.dataflash-panel.minimized .dataflash-title span {
  display: none;
}

.dataflash-panel.minimized .dataflash-header {
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}
`;

export const calculatorStyles = `
.dataflash-calculator-toggle {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  font-size: 13px;
  padding: 12px;
  background: #f8f9fa;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  min-height: 28px;
  transition: all 0.2s ease;
}

.dataflash-calculator-toggle.calculator-enabled {
  background: #e7f5ff;
  border-color: #74c0fc;
}

.dataflash-calc-left {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
}

.dataflash-toggle {
  position: relative;
  display: inline-block;
  width: 36px;
  height: 20px;
  flex-shrink: 0;
}

.dataflash-toggle input {
  opacity: 0;
  width: 0;
  height: 0;
}

.dataflash-toggle-slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ced4da;
  transition: .3s;
  border-radius: 20px;
}

.dataflash-toggle-slider:before {
  position: absolute;
  content: "";
  height: 16px;
  width: 16px;
  left: 2px;
  bottom: 2px;
  background-color: white;
  transition: .3s;
  border-radius: 50%;
}

input:checked + .dataflash-toggle-slider {
  background-color: #1971c2;
}

input:checked + .dataflash-toggle-slider:before {
  transform: translateX(16px);
}

.dataflash-calc-result {
  font-size: 14px;
  font-weight: 500;
  color: #1971c2;
  cursor: pointer;
  padding: 4px 8px;
  border-radius: 4px;
  transition: background-color 0.2s ease;
}

.dataflash-calc-result:hover {
  background-color: rgba(25, 113, 194, 0.1);
}

.dataflash-actions {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}

.dataflash-flush-btn {
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  border-radius: 6px;
  padding: 6px 12px;
  font-size: 12px;
  color: #495057;
  cursor: pointer;
  transition: all 0.2s ease;
}

.dataflash-flush-btn:hover {
  background: #e9ecef;
  border-color: #dee2e6;
}

.dataflash-saved {
  margin-top: 12px;
  border-top: 1px solid #e9ecef;
  padding-top: 12px;
}

.dataflash-saved-item {
  padding: 8px 0;
  border-bottom: 1px solid #e9ecef;
}

.dataflash-saved-item.dataframe {
  padding: 12px 0;
}

.dataflash-saved-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.dataflash-saved-table {
  background: #f8f9fa;
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid #e9ecef;
}

.dataflash-table-header {
  display: grid;
  grid-template-columns: 1fr 1fr 120px;
  gap: 12px;
  padding: 8px 12px;
  background: #e9ecef;
  font-weight: 600;
  color: #495057;
}

.dataflash-table-row {
  display: grid;
  grid-template-columns: 1fr 1fr 120px;
  gap: 12px;
  padding: 8px 12px;
  align-items: center;
  border-bottom: 1px solid #e9ecef;
}

.dataflash-table-row:last-child {
  border-bottom: none;
}

.dataflash-table-col {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.dataflash-table-col:nth-child(2) {
  text-align: right;
}

.dataflash-column-controls {
  display: flex;
  gap: 4px;
  justify-content: flex-end;
}

.dataflash-saved-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.dataflash-saved-label {
  color: #1971c2;
  font-weight: 500;
  cursor: pointer;
  padding: 2px 6px;
  border-radius: 4px;
  transition: background-color 0.2s ease;
}

.dataflash-saved-label:hover {
  background-color: #e7f5ff;
}

.dataflash-saved-value {
  color: #868e96;
  font-size: 12px;
}

.dataflash-saved-controls button,
.dataflash-column-controls button {
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  padding: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  color: #495057;
}

.dataflash-saved-controls button:hover,
.dataflash-column-controls button:hover {
  background: #e7f5ff;
  border-color: #74c0fc;
  transform: translateY(-1px);
}

.dataflash-saved-controls .dataflash-copy-btn:hover,
.dataflash-column-controls .dataflash-copy-btn:hover {
  background: #e7f5ff;
  border-color: #74c0fc;
  color: #1971c2;
}

.dataflash-saved-controls .dataflash-stats-btn:hover,
.dataflash-column-controls .dataflash-stats-btn:hover {
  background: #e6fcf5;
  border-color: #63e6be;
  color: #0ca678;
}

.dataflash-saved-controls .dataflash-load-btn:hover,
.dataflash-column-controls .dataflash-load-btn:hover {
  background: #fff3bf;
  border-color: #ffd43b;
  color: #f08c00;
}

.dataflash-saved-controls .dataflash-delete-btn:hover,
.dataflash-column-controls .dataflash-delete-btn:hover {
  background: #ffe3e3;
  border-color: #ffa8a8;
  color: #e03131;
}

.dataflash-saved-controls svg,
.dataflash-column-controls svg {
  width: 13px;
  height: 13px;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}
`;

// Combine all styles
export const allStyles = [
  panelStyles,
  buttonStyles,
  contentStyles,
  tabStyles,
  minimizedStyles,
  calculatorStyles
].join('\n');
