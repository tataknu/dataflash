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
  width: 400px;
  min-height: 100px;
  height: auto;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
  cursor: default;
  user-select: none;
  color: #1a1a1a;
  box-sizing: border-box;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  overflow: hidden;
  transform-origin: center;
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
  margin-bottom: 8px;
  padding-bottom: 8px;
  border-bottom: 1px solid #e9ecef;
  cursor: move;
  flex-shrink: 0;
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
  object-fit: contain;
  opacity: 0.9;
  display: none;
}

.dataflash-panel.expanded {
  width: 1000px !important;
}

.dataflash-content {
  margin-top: 8px;
  display: flex;
  flex-direction: column;
  min-height: auto;
  height: fit-content;
}
`;

export const buttonStyles = `
.dataflash-minimize,
.dataflash-close,
.dataflash-reset {
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

.dataflash-reset {
  background-color: #51cf66;
}

.dataflash-minimize:hover,
.dataflash-close:hover,
.dataflash-reset:hover {
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
.dataflash-section {
  margin-bottom: 8px;
  display: flex;
  flex-direction: column;
  min-height: auto;
  height: fit-content;
}

.dataflash-section:last-child {
  margin-bottom: 0;
  min-height: auto;
  height: fit-content;
}

.dataflash-section-header {
  margin-bottom: 4px;
}

.dataflash-section-header h4 {
  margin: 0;
  color: #1a1a1a;
  font-size: 14px;
  font-weight: 600;
}

.dataflash-input-wrapper {
  position: relative;
  width: 100%;
  margin-bottom: 8px;
}

.dataflash-clear-text {
  position: absolute;
  bottom: 8px;
  right: 8px;
  font-size: 12px;
  color: #868e96;
  cursor: pointer;
  padding: 2px 4px;
  border-radius: 4px;
  transition: all 0.2s ease;
  user-select: none;
}

.dataflash-clear-text:hover {
  color: #495057;
  background-color: #f1f3f5;
}

.dataflash-input {
  cursor: text;
  width: 100%;
  padding: 8px;
  padding-bottom: 28px;
  margin-bottom: 0;
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
  flex-shrink: 0;
}

.dataflash-input:focus {
  outline: none;
  border-color: #4dabf7;
  background: #ffffff;
  box-shadow: 0 0 0 3px rgba(77, 171, 247, 0.1);
}

.dataflash-actions {
  margin-bottom: 8px;
  display: flex;
  gap: 8px;
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

.dataflash-metrics {
  background: #f8f9fa;
  padding: 8px;
  border-radius: 8px;
  font-size: 13px;
  border: 1px solid #e9ecef;
  overflow-y: auto;
  min-height: auto;
  height: fit-content;
  transition: all 0.3s ease;
}

.dataflash-metrics:not(:empty) {
  min-height: auto;
}

.dataflash-metrics.has-content {
  min-height: auto;
}

.dataflash-current-metrics {
  min-height: auto;
  height: fit-content;
}

.dataflash-saved {
  margin-top: 8px;
  min-height: auto;
  height: fit-content;
}

.dataflash-metrics::-webkit-scrollbar {
  width: 8px;
}

.dataflash-metrics::-webkit-scrollbar-track {
  background: #f1f3f5;
  border-radius: 4px;
}

.dataflash-metrics::-webkit-scrollbar-thumb {
  background: #ced4da;
  border-radius: 4px;
}

.dataflash-metrics::-webkit-scrollbar-thumb:hover {
  background: #adb5bd;
}

.dataflash-df-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  padding-bottom: 4px;
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
  padding: 4px;
  font-size: 14px;
  color: #1971c2;
  width: 28px;
  height: 28px;
  line-height: 1;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
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
  gap: 8px;
  align-items: center;
  padding: 4px 0;
  border-bottom: 1px solid #e9ecef;
}

.dataflash-metric-row.header {
  font-weight: 600;
  color: #495057;
  padding-bottom: 6px;
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

.dataflash-tab-actions {
  display: flex;
  gap: 4px;
  align-items: center;
}

.dataflash-add-tab,
.dataflash-calc-btn {
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
  display: flex;
  align-items: center;
  justify-content: center;
}

.dataflash-add-tab:hover,
.dataflash-calc-btn:hover {
  background: #d0ebff;
  border-color: #339af0;
  transform: translateY(-1px);
}

.dataflash-calc-btn.active {
  background: #1971c2;
  border-color: #1864ab;
  color: #ffffff;
}

.dataflash-calc-btn.active:hover {
  background: #1864ab;
  border-color: #145591;
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
  width: 62px !important;
  height: 62px !important;
  min-height: 62px !important;
  padding: 6px !important;
  border-radius: 50% !important;
  cursor: move;
  background: #ffffff;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  position: fixed;
  z-index: 2147483647;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  transform-origin: center;
}

.dataflash-panel.minimized .dataflash-icon {
  display: block;
  width: 54px;
  height: 54px;
  margin: 0;
  opacity: 1;
  transition: opacity 0.3s ease;
  object-fit: contain;
}

.dataflash-panel.minimized:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.08);
}

.dataflash-panel.minimized .dataflash-content,
.dataflash-panel.minimized .dataflash-controls,
.dataflash-panel.minimized .dataflash-title,
.dataflash-panel.minimized .dataflash-tabs,
.dataflash-panel.minimized .dataflash-header {
  opacity: 0;
  visibility: hidden;
  display: none;
  transition: opacity 0.2s ease, visibility 0.2s ease;
}

.dataflash-panel.minimized.dragging {
  transition: none;
  opacity: 0.9;
}
`;

export const calculatorStyles = `
.dataflash-calculator-toggle {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  font-size: 13px;
  padding: 8px;
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

.dataflash-saved {
  margin-top: 8px;
}

.dataflash-saved-item {
  padding: 4px 0;
  border-bottom: 1px solid #e9ecef;
}

.dataflash-saved-item.dataframe {
  padding: 6px 0;
}

.dataflash-saved-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
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
  gap: 8px;
  padding: 6px 8px;
  background: #e9ecef;
  font-weight: 600;
  color: #495057;
}

.dataflash-table-row {
  display: grid;
  grid-template-columns: 1fr 1fr 120px;
  gap: 8px;
  padding: 6px 8px;
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

.dataflash-saved-controls .dataflash-delete-btn,
.dataflash-column-controls .dataflash-delete-btn {
  background: #ffe3e3;
  border: 1px solid #ffa8a8;
  padding: 4px;
  cursor: pointer;
  transition: all 0.2s ease;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  color: #e03131;
}

.dataflash-saved-controls .dataflash-delete-btn:hover,
.dataflash-column-controls .dataflash-delete-btn:hover {
  background: #ffc9c9;
  border-color: #ff8787;
  transform: translateY(-1px);
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

export const statsStyles = `
.dataflash-stats-data,
.dataflash-reloaded-data {
  background: #ffffff;
  border: 1px solid #e9ecef;
  border-radius: 6px;
  overflow: hidden;
  margin-bottom: 8px;
}

.dataflash-stats-header,
.dataflash-reloaded-header {
  background: #f8f9fa;
  padding: 8px;
  border-bottom: 1px solid #e9ecef;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dataflash-stats-header h4,
.dataflash-reloaded-header h4 {
  margin: 0;
  color: #1a1a1a;
  font-size: 14px;
  font-weight: 600;
}

.dataflash-stats-title h4,
.dataflash-reloaded-header h4 {
  margin: 0;
  color: #1a1a1a;
  font-size: 14px;
  font-weight: 600;
}

.dataflash-stats-content,
.dataflash-reloaded-content {
  padding: 8px;
  width: 100%;
  overflow: hidden;
  height: fit-content;
  min-height: auto;
}

.dataflash-stats-section {
  margin-bottom: 8px;
  padding-bottom: 8px;
  border-bottom: 1px solid #e9ecef;
}

.dataflash-stats-section:last-child {
  margin-bottom: 0;
  padding-bottom: 0;
  border-bottom: none;
}

.dataflash-stats-section-header {
  color: #1971c2;
  font-weight: 600;
  font-size: 13px;
  margin-bottom: 8px;
}

.dataflash-stats-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4px 0;
}

.dataflash-stats-row:not(:last-child) {
  border-bottom: 1px solid #e9ecef;
}

.dataflash-stats-label {
  color: #495057;
  font-weight: 500;
}

.dataflash-stats-value {
  color: #1971c2;
  font-weight: 500;
  cursor: pointer;
  padding: 2px 6px;
  border-radius: 4px;
  transition: all 0.2s ease;
}

.dataflash-stats-value:hover {
  background-color: #e7f5ff;
}

.dataflash-stats-value.copied {
  background-color: #d3f9d8;
  color: #2b8a3e;
}

.dataflash-reloaded-row {
  padding: 6px 0;
  color: #495057;
}

.dataflash-reloaded-row:not(:last-child) {
  border-bottom: 1px solid #e9ecef;
}

.dataflash-stats-actions {
  display: flex;
  gap: 4px;
}

.dataflash-clear-stats-btn {
  background: #ffe3e3;
  border: 1px solid #ffa8a8;
  border-radius: 6px;
  cursor: pointer;
  padding: 4px 12px;
  font-size: 14px;
  color: #e03131;
  height: 28px;
  line-height: 1;
  transition: all 0.2s ease;
}

.dataflash-clear-stats-btn:hover {
  background: #ffc9c9;
  border-color: #ff8787;
  transform: translateY(-1px);
}
`;

export const dfControlsStyles = `
.dataflash-df-controls {
  display: flex;
  gap: 4px;
}

.dataflash-reload-df-btn,
.dataflash-minimize-df-btn {
  background: #fff3bf;
  border: 1px solid #ffd43b;
  border-radius: 6px;
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  color: #f08c00;
  transition: all 0.2s ease;
}

.dataflash-minimize-df-btn {
  background: #e7f5ff;
  border-color: #74c0fc;
  color: #1971c2;
}

.dataflash-reload-df-btn:hover {
  background: #fff3bf;
  border-color: #ffd43b;
  color: #f08c00;
  transform: translateY(-1px);
}

.dataflash-minimize-df-btn:hover {
  background: #d0ebff;
  border-color: #339af0;
  transform: translateY(-1px);
}

.dataflash-minimize-df-btn svg {
  transition: transform 0.2s ease;
}

.dataflash-saved-item.minimized .dataflash-minimize-df-btn svg {
  transform: rotate(-180deg);
}

.dataflash-saved-item.minimized .dataflash-saved-table {
  display: none;
}

.dataflash-reload-df-btn svg,
.dataflash-minimize-df-btn svg {
  width: 13px;
  height: 13px;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.dataflash-df-controls .dataflash-delete-btn {
  background: #ffe3e3;
  border: 1px solid #ffa8a8;
  border-radius: 6px;
  cursor: pointer;
  padding: 4px;
  font-size: 14px;
  color: #e03131;
  width: 28px;
  height: 28px;
  line-height: 1;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dataflash-df-controls .dataflash-delete-btn svg {
  width: 13px;
  height: 13px;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  display: block;
}

.dataflash-df-controls .dataflash-delete-btn:hover {
  background: #ffc9c9;
  border-color: #ff8787;
  transform: translateY(-1px);
}

.dataflash-reloaded-content .dataflash-table-wrapper {
  overflow: auto;
  width: 100%;
  max-height: none;
  height: auto;
  scrollbar-width: thin;
  border: 1px solid #e9ecef;
  border-radius: 6px;
}

.dataflash-reloaded-content .dataflash-table-wrapper::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

.dataflash-reloaded-content .dataflash-table-wrapper::-webkit-scrollbar-track {
  background: #f1f3f5;
  border-radius: 4px;
}

.dataflash-reloaded-content .dataflash-table-wrapper::-webkit-scrollbar-thumb {
  background: #ced4da;
  border-radius: 4px;
}

.dataflash-reloaded-content .dataflash-table-wrapper::-webkit-scrollbar-thumb:hover {
  background: #adb5bd;
}

.dataflash-reloaded-content .dataflash-table {
  width: 100%;
  min-width: max-content;
}

.dataflash-reloaded-content .dataflash-table-header,
.dataflash-reloaded-content .dataflash-table-row {
  display: grid;
  grid-template-columns: repeat(var(--num-columns, 3), minmax(120px, 1fr));
  gap: 12px;
  padding: 8px 12px;
}

.dataflash-reloaded-content .dataflash-table-header {
  background: #e9ecef;
  font-weight: 600;
  color: #495057;
  border-bottom: 1px solid #dee2e6;
}

.dataflash-reloaded-content .dataflash-table-row {
  border-bottom: 1px solid #e9ecef;
}

.dataflash-reloaded-content .dataflash-table-row:last-child {
  border-bottom: none;
}

.dataflash-reloaded-content .dataflash-table-col {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
`;

export const expandStyles = `
.dataflash-expand-btn {
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
  display: flex;
  align-items: center;
  justify-content: center;
}

.dataflash-expand-btn:hover {
  background: #d0ebff;
  border-color: #339af0;
  transform: translateY(-1px);
}

.dataflash-expand-btn::before {
  content: "⤢";
  display: inline-block;
  transition: transform 0.2s ease;
}

.dataflash-expand-btn.expanded::before {
  transform: rotate(180deg);
}

.dataflash-reloaded-content {
  transition: all 0.3s ease;
}

.dataflash-panel.expanded .dataflash-reloaded-content {
  width: 100%;
}
`;

export const dfNameInputStyles = `
.dataflash-df-name-input {
  background: transparent;
  border: 1px solid transparent;
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 14px;
  font-weight: 600;
  color: #1a1a1a;
  width: 150px;
  transition: all 0.2s ease;
}

.dataflash-df-name-input:hover {
  border-color: #e9ecef;
}

.dataflash-df-name-input:focus {
  outline: none;
  background: #ffffff;
  border-color: #74c0fc;
}
`;

export const addTabStyles = `
.dataflash-add-tab {
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
  display: flex;
  align-items: center;
  justify-content: center;
}

.dataflash-add-tab:hover {
  background: #d0ebff;
  border-color: #339af0;
  transform: translateY(-1px);
}
`;

export const clearDfBtnStyles = `
.dataflash-df-actions {
  display: flex;
  gap: 4px;
  align-items: center;
}

.dataflash-clear-df-btn {
  background: #ffe3e3;
  border: 1px solid #ffa8a8;
  border-radius: 6px;
  cursor: pointer;
  padding: 4px;
  font-size: 14px;
  color: #e03131;
  width: 28px;
  height: 28px;
  line-height: 1;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dataflash-clear-df-btn svg {
  width: 13px;
  height: 13px;
  fill: none;
  stroke: currentColor;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
  display: block;
}

.dataflash-clear-df-btn:hover {
  background: #ffc9c9;
  border-color: #ff8787;
  transform: translateY(-1px);
}

.dataflash-save-df-btn {
  background: #e7f5ff;
  border: 1px solid #74c0fc;
  border-radius: 6px;
  cursor: pointer;
  padding: 4px;
  font-size: 14px;
  color: #1971c2;
  width: 28px;
  height: 28px;
  line-height: 1;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.dataflash-save-df-btn:hover {
  background: #d0ebff;
  border-color: #339af0;
  transform: translateY(-1px);
}

.dataflash-stats-actions {
  display: flex;
  gap: 4px;
  align-items: center;
}
`;

// Combine all styles
export const allStyles = [
  panelStyles,
  buttonStyles,
  contentStyles,
  tabStyles,
  minimizedStyles,
  calculatorStyles,
  statsStyles,
  dfControlsStyles,
  expandStyles,
  dfNameInputStyles,
  addTabStyles,
  clearDfBtnStyles
].join('\n');
