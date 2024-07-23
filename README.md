# Epic Highlighter

**Epic Highlighter** is a Chrome extension designed to highlight elements with the same `data-epic` attribute on any webpage. It allows you to cycle through different groups of elements and visually emphasizes the currently selected group with a glowing blue border.

## Features

- Highlight elements with a specific `data-epic` attribute.
- Cycle through different groups of elements using keyboard shortcuts.
- Automatically cycle through groups with auto mode.
- Customizable highlight effect that matches the element's border radius.

## Installation

1. **Download the repository:**
   - Clone this repository using 
   ```bash
   git clone https://github.com/Raccoon254/highlight-chrome-extension.git
   ```
   - Or download the ZIP file and extract it to a directory on your computer.

2. **Open Chrome Extensions page:**
   - Open Chrome and navigate to `chrome://extensions/`.

3. **Enable Developer Mode:**
   - Toggle the switch for "Developer mode" in the top right corner of the Extensions page.

4. **Load Unpacked Extension:**
   - Click on the "Load unpacked" button and select the directory where you extracted the extension files.

5. **Extension Installed:**
   - You should now see the Epic Highlighter icon in your Chrome extensions toolbar.

## Usage

1. **Navigate to a Webpage:**
   - Open any webpage where you want to use the Epic Highlighter.

2. **Highlight Elements:**
   - The extension automatically detects elements with the `data-epic` attribute and groups them.

3. **Keyboard Shortcuts:**
   - Press `N` to move to the next group of elements.
   - Press `P` to move to the previous group of elements.

4. **Auto Mode:**
   - Toggle auto mode by clicking the extension icon and selecting the auto mode option. This will automatically cycle through groups every 3 seconds.

## Development

### File Structure

- `manifest.json`: The extension manifest file.
- `content.js`: Script that handles highlighting logic and interactions.
- `styles.css`: CSS for the highlight effect.
- `background.js`: Background script for managing extension state and messages.
- `popup.html`: HTML for the extension popup.
- `images/highlight.png`: Icon for the extension.

### How It Works

The extension works by identifying elements with a `data-epic` attribute, grouping them by their `data-epic` value, and then applying a highlight effect to the currently selected group. Users can navigate through these groups using keyboard shortcuts or by enabling auto mode.

### Key Functionalities

- **Highlight Elements:** Adds a glowing blue border around elements with the `data-epic` attribute.
- **Navigate Groups:** Allows users to cycle through different groups of highlighted elements.
- **Auto Mode:** Automatically cycles through the groups of elements at regular intervals.

## Contributing

1. **Fork the repository.**
2. **Create a new branch:**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes.**
4. **Commit your changes:**
   ```bash
   git commit -m 'Add your feature description'
   ```
5. **Push to the branch:**
   ```bash
   git push origin feature/your-feature-name
   ```
6. **Create a pull request.**

## License

This project is licensed under the MIT License.