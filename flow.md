# DataFlash Component Flow

## File Structure References

### Core Components
- Panel: `src/js/components/Panel.js`
  - Main UI component
  - Panel state management
  - Event handling
  - Reset and minimize functionality
- Calculator: `src/js/components/Calculator.js`
  - Calculator mode toggle
  - Expression processing
  - Result display
- Tabs: `src/js/components/Tabs.js`
  - Tab management
  - State persistence
- DOMService: `src/js/services/domService.js`
  - DOM manipulation utilities
  - Clipboard operations

### Utilities
- Data Processing: `src/js/utils/parser.js`
  - `parseClipboardData`: Data parsing
  - `calculateMetrics`: Metrics computation

### Styles
- Component Styles: `src/js/styles/styles.js`
  - Panel styles
  - Button styles
  - Table styles
  - Animation styles
  - Clear text styles
  - Responsive layout styles

### Constants
- Configuration: `src/js/constants/config.js`
  - Icon URLs
  - Default values

## Component Interactions

### Panel Component
1. **Initialization**
   - Creates main UI structure
   - Sets up event listeners
   - Initializes calculator and tabs
   - Sets default dimensions

2. **State Management**
   - Tracks panel position
   - Manages minimize/maximize state
   - Handles expanded state
   - Controls reset functionality

3. **UI Updates**
   - Updates metrics display
   - Manages saved items
   - Handles clear functionality
   - Controls panel dimensions

### Calculator Component
1. **Mode Management**
   - Toggles calculator mode
   - Updates UI state
   - Processes expressions

2. **Result Handling**
   - Displays calculation results
   - Updates metrics display
   - Manages copy functionality

### Panel Dimensions
1. **Default State**
   - Width: 400px
   - Min Height: 100px
   - Max Height: 90vh
   - Auto Height

2. **Minimized State**
   - Width: 32px
   - Height: 32px
   - Border Radius: 50%

3. **Expanded State**
   - Width: 1000px
   - Maintains height constraints

### Event Flow
1. **Panel Controls**
   - Reset: Restores initial dimensions and position
   - Minimize: Toggles minimized state
   - Close: Removes panel

2. **Input Handling**
   - Clear text click: Clears input and results
   - Calculator toggle: Switches calculator mode
   - Data input: Processes and displays results

3. **Drag Functionality**
   - Mouse down: Initiates drag
   - Mouse move: Updates position
   - Mouse up: Finalizes position

## State Management

### Panel States
1. **Normal**
   - Full functionality
   - Standard dimensions
   - All features accessible

2. **Minimized**
   - Icon only
   - Circular shape
   - Click to restore

3. **Expanded**
   - Wider view
   - Enhanced data display
   - Toggle via expand button

### Data States
1. **Input Processing**
   - Raw data parsing
   - Metrics calculation
   - Result display

2. **Calculator Mode**
   - Expression evaluation
   - Result display
   - Copy functionality

3. **Saved Data**
   - DataFrame storage
   - Statistics view
   - Column management

## UI Components

### Input Section
- Textarea for data input
- Clear text in bottom right
- Placeholder text
- Auto-resize behavior

### Output Section
- Metrics display
- Saved items
- Statistics view
- Copy functionality

### Controls
- Panel manipulation
- Calculator toggle
- Tab management
- Clear functionality

## Style Organization

### Panel Layout
- Flex-based structure
- Responsive dimensions
- Smooth transitions
- State-based styling

### Interactive Elements
- Hover effects
- Click feedback
- Transition animations
- Clear text styling

### Responsive Behavior
- Max height constraints
- Auto-sizing
- Overflow management
- Mobile considerations

## Recent Updates

### UI Improvements
- Replaced clear button with text
- Enhanced reset functionality
- Improved dimension management
- Added transition effects

### Functionality Updates
- Better state management
- Improved reset behavior
- Enhanced minimize/maximize
- Optimized panel dimensions

### Code Organization
- Structured component logic
- Clear state management
- Documented changes
- Improved maintainability

## Class Diagram

```mermaid
classDiagram
    class Panel {
        -calculator: Calculator
        -tabs: Tabs
        -isDragging: boolean
        -currentX: number
        -currentY: number
        -initialX: number
        -initialY: number
        -xOffset: number
        -yOffset: number
        -dfCounter: number
        +create()
        -addEventListeners(panel)
        -updateUI(metrics)
        -updateSavedDisplay()
        -addMetricEventListeners(container, metrics)
        -addSavedItemEventListeners(container, activeTab)
        -dragStart(e)
        -drag(e)
        -dragEnd()
    }

    class Calculator {
        -isEnabled: boolean
        +createToggle()
        +handleToggle(textarea, callback)
        +processExpression(text, callback)
        +updateResult(value)
    }

    class Tabs {
        -tabs: Array
        -activeTabIndex: number
        +addTab()
        +getActiveTab()
        +updateTabs(panel, callback)
    }

    class Tab {
        -label: string
        -savedSums: Array
        -id: string
    }

    class DataFrame {
        -label: string
        -value: number
        -numbers: Array
        -columns: Array
        -isNumeric: boolean
    }

    class Column {
        -label: string
        -sum: number
        -numbers: Array
        -isNumeric: boolean
    }

    class DOMService {
        +createElement(tag, options)
        +copyToClipboard(text)
    }

    Panel --> Calculator : uses
    Panel --> Tabs : uses
    Panel --> DOMService : uses
    Panel ..> parseClipboardData : uses
    Panel ..> calculateMetrics : uses
    Tabs --> Tab : contains
    Tab --> DataFrame : contains
    DataFrame --> Column : contains

    note for Panel "Main UI component managing\nthe floating panel interface"
    note for Calculator "Handles calculator mode\nand expression processing"
    note for Tabs "Manages tab system for\nmultiple data contexts"
    note for DOMService "Utility service for\nDOM operations"
```

## Component Description

### Panel
The main UI component that manages the floating panel interface. It coordinates all other components and handles:
- User interactions
- Data display and updates
- Drag and drop functionality
- Event management

### Calculator
Handles calculator mode functionality including:
- Toggle calculator mode
- Process mathematical expressions
- Display results

### Tabs
Manages the tab system allowing:
- Multiple data contexts
- Tab creation and switching
- State management per tab

### DOMService
Utility service providing:
- DOM element creation
- Clipboard operations
- UI helper functions

### Utility Functions
- `parseClipboardData`: Processes pasted data
- `calculateMetrics`: Computes statistics and metrics 

## Data Flow and Storage

### Data Input Flow
1. User pastes data into textarea (`Panel.js`)
2. Textarea 'input' event triggers (`Panel.js: addEventListeners`)
3. If calculator mode is disabled:
   - Raw text is passed to `parseClipboardData` (`parser.js`)
   - Parsed data is passed to `calculateMetrics` (`parser.js`)
   - Metrics are passed to `updateUI` (`Panel.js`)

### Data Storage Structure

#### Tab Object (`src/js/components/Tabs.js`)
```javascript
{
    label: string,          // Tab name
    savedSums: DataFrame[], // Array of saved dataframes
    id: string             // Unique identifier
}
```

#### DataFrame Object (`src/js/components/Panel.js`)
```javascript
{
    label: string,         // DataFrame name (e.g., "df1")
    value: number,         // Total sum of all columns
    numbers: number[],     // All numbers flattened
    isNumeric: boolean,    // Whether data is numeric
    columns: Column[]      // Array of column objects
}
```

#### Column Object (`src/js/components/Panel.js`)
```javascript
{
    label: string,         // Column name
    sum: number,          // Sum of column values
    numbers: number[],    // Raw column values
    isNumeric: boolean    // Whether column is numeric
}
```

### Data Persistence Flow

1. **Initial Data Processing** (`src/js/utils/parser.js`)
   - Raw pasted data → `parseClipboardData` → Grouped data arrays
   - Grouped data → `calculateMetrics` → Metrics objects with sums and labels

2. **Saving Data** (`src/js/components/Panel.js: addMetricEventListeners`)
   - When "+" button is clicked:
   - New DataFrame object is created
   - Added to active tab's `savedSums` array
   - `dfCounter` is incremented
   - UI is updated via `updateSavedDisplay`

3. **Data Access** (`src/js/components/Panel.js`)
   - Active tab's data accessed via `getActiveTab()` (`Tabs.js`)
   - DataFrame operations (reload, delete) use array index
   - Column operations use both DataFrame and column indices

### Data Manipulation Features

1. **Reload Data** (`src/js/components/Panel.js: addSavedItemEventListeners`)
   - Creates temporary display of DataFrame
   - Maintains original data in `savedSums`
   - Allows horizontal scrolling and column viewing

2. **Statistics View** (`src/js/components/Panel.js: addSavedItemEventListeners`)
   - Calculates on-demand from column's `numbers` array
   - Shows null counts, empty values, sum, average, min, max
   - Temporary display, original data unchanged

3. **Copy Operations** (`src/js/services/domService.js`)
   - Can copy individual column values
   - Uses column's `numbers` array joined with newlines
   - Provides visual feedback via checkmark

### UI Updates

1. **DOM Creation** (`src/js/services/domService.js`)
   - createElement: Creates new DOM elements with attributes
   - Updates UI structure based on data changes

2. **Styling** (`src/js/styles/styles.js`)
   - Applies styles to all components
   - Handles animations and transitions
   - Manages responsive layout 