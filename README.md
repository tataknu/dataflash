# DataFlash

<p align="center">
  <img src="public/john.png" alt="DataFlash Logo" width="200"/>
</p>

> Your AI-Powered Data Analysis Companion in Chrome

DataFlash brings powerful data analysis directly to your browser. Perfect for data engineers and analysts who want to validate hypotheses and gain quick insights without interrupting their workflow.

## 📥 Quick Installation

1. **Chrome Web Store** (Coming Soon!)
   - Installation will be just one click away!

2. **Manual Installation (For Developers)**
   - Clone this repository
   - Open Chrome and go to `chrome://extensions/`
   - Toggle "Developer mode" in the top right
   - Click "Load unpacked" and select the extension directory

## ⚙️ Supported Sites

DataFlash works natively with Databricks! You can use it right away on any Databricks workspace without additional configuration.

To use DataFlash on other sites:

1. Open `manifest.json`
2. Find the `host_permissions` section and add your domain:
   ```json
   "host_permissions": [
     "*://*.databricks.com/*",
     "*://your-domain.com/*"
   ]
   ```
3. Reload the extension in Chrome:
   - Go to `chrome://extensions/`
   - Find DataFlash
   - Click the refresh icon

## 🌟 What Can DataFlash Do For You?

- **Instant Analysis**: Get immediate data insights while browsing
- **Zero Setup**: Works right in your browser - no configuration needed
- **Workflow Integration**: Analyze data without switching contexts

## 🎯 Problem We Solve

Data professionals often need to:
- Quickly validate data patterns and hypotheses
- Get instant insights without leaving their workflow
- Analyze data without setting up complex tools
- Save time on routine data validation tasks

## ✨ Features

- **Instant Analysis**: Get immediate insights about your data directly in the browser
- **Context-Aware**: Works seamlessly within your existing workflow
- **No Setup Required**: Start analyzing data right in your browser without additional configuration

## 🚀 Getting Started

1. Install DataFlash from the Chrome Web Store (coming soon)
   - Or clone this repository for development
2. Navigate to `chrome://extensions/`
3. Enable "Developer mode" in the top right corner
4. Click "Load unpacked" and select the extension directory

## 💡 How It Works

DataFlash integrates with your browser to:
1. Detect data patterns on web pages
2. Process information using advanced AI
3. Provide instant insights and validation
4. Help you make data-driven decisions faster

## 🔧 Development

### Project Structure
```
src/
├── background.js        # Chrome extension background script
├── js/
    ├── components/     # Reusable UI components
    ├── constants/      # Application constants and configurations
    ├── services/       # Business logic and API services
    ├── styles/        # Component-specific styles
    ├── utils/         # Helper functions and utilities
    └── main.js        # Main application entry point
```

### Key Components
- `manifest.json`: Extension configuration and permissions
- `background.js`: Chrome extension background script
- `src/js/main.js`: Main entry point for the application
- `webpack.config.js`: Build configuration with aliases and optimizations

### Development Setup
1. Install dependencies:
   ```bash
   npm install
   ```

2. Start development build with watch mode:
   ```bash
   npm run dev
   ```

3. For production build:
   ```bash
   npm run build
   ```

### Build Features
- Babel transpilation for modern JavaScript
- CSS processing with style-loader
- Source maps for debugging
- Code splitting and optimization
- Hot module replacement in development

## 🆚 Why DataFlash?

Unlike traditional data analysis tools that require:
- Complex setup processes
- Context switching
- Manual coding
- Separate applications

DataFlash brings the power of data analysis directly to your browser, making it instantly accessible when you need it.

## 📝 License

MIT License - Feel free to use this code for your own projects.

## 🤝 Contributing

We welcome contributions! Please feel free to submit a Pull Request. 

## AI Disclosure <img src="public/alien_left.png" alt="AI Icon" width="25"/> 

This project was heavily created and assisted by AI technologies. We believe in transparency and acknowledge the significant role of artificial intelligence in shaping this tool's development. 