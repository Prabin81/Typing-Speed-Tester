# ⌨️ AI Typing Speed Tester Web App

This is a fully functional Typing Speed Tester built using only **HTML, CSS, and vanilla JavaScript**. It provides real-time feedback on typing performance, calculating Words Per Minute (WPM), Accuracy, and Errors.

## 🌟 Core Features

* **Dynamic, Themed Paragraphs:** The app features a mock "AI-powered" content generation system (`aiParagraphs` object in `script.js`) that allows users to select from themes like **Technology**, **Motivational**, and **Poetry**. This simulates an application that could easily integrate with a real AI text generator API (like OpenAI or Gemini) to dynamically fetch fresh content for each test.
* **Real-Time Statistics:** Live WPM, Accuracy (%), total Characters typed, and Errors are displayed while the user is typing.
* **60-Second Countdown:** A clear, visible timer dictates the length of the test.
* **Error Highlighting:**
    * **Correct** characters are highlighted in **green**.
    * **Incorrect** characters are highlighted in **red**.
    * The **current character** is marked with a blinking **blue/purple** background.
* **Final Results Summary:** A clean summary card appears upon test completion, showing final WPM, Accuracy, Errors, and Time Taken.
* **Responsive Design:** Uses CSS Flexbox and Grid for a modern, responsive layout that works well on both desktop and mobile devices.

## 📁 Project Structure

The project adheres to the principle of **Separation of Concerns (SoC)**:

| File | Role | Description |
| :--- | :--- | :--- |
| `index.html` | **Markup** | Contains the semantic structure (DOM elements) and links to the external CSS and JS files. |
| `style.css` | **Styling** | Contains all the modern, responsive styling, including the background gradient, layout (Flexbox/Grid), and animation keyframes. |
| `script.js` | **Logic** | Contains all the game logic, state management, timer functions, statistical calculations, event listeners, and the mock AI content data. |
| `README.md` | **Documentation** | Provides an overview and instructions for the project. |

## 🧠 The AI Twist

The **AI-powered twist** is implemented via the `aiParagraphs` object within `script.js`.

* **Current State (Mock):** A dictionary of string arrays is used to quickly provide high-quality, themed content. A random paragraph is selected based on the user's theme choice.
* **Future Integration:** This structure is ideal for replacing the mock function with a real API call:
    ```javascript
    async function generateParagraph(theme) {
        // Mock data could be replaced with:
        // const response = await fetch(`YOUR_AI_API_ENDPOINT?theme=${theme}`);
        // const data = await response.json();
        // return data.generatedText;
    }
    ```

## 🛠️ How to Run

1.  Save the four files (`index.html`, `style.css`, `script.js`, and `README.md`) into the same folder.
2.  Open `index.html` in any modern web browser.
3.  Select a theme and click **"Start Test"**.