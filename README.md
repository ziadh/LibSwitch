# CompSwitch

CompSwitch is a React application designed to convert code snippets between different libraries. Currently, it supports converting code between Flutter, React Native, and React. Leveraging Google's Generative AI, this tool simplifies the process of translating code between these frameworks with ease.

## Features

- **Code Conversion**: Automatically convert code from one library to another (e.g., from Flutter to React Native).
- **Intuitive UI**: Simple and clean user interface with easy code input and output display.
- **Clipboard Integration**: Easily copy the converted code to your clipboard with a single click.

## Installation

### Prerequisites

- [Node.js](https://nodejs.org/) (v16 or later)
- [npm](https://www.npmjs.com/) (v8 or later)
### Getting Started

1. **Clone the Repository**

   ```bash
   git clone https://github.com/ziadh/CompSwitch.git
   cd CompSwitch
   ```
2. **Install Dependencies**

   ```bash
   npm install
   ```
3. **Set Up Environment Variables**
Create a .env file in the root directory and add your Google Generative AI API key:



   ```bash
   VITE_GEMINI_KEY=your_google_generative_ai_api_key
   ```
4. **Start the Development Server**

   ```bash
   npm start
   ```

The app will be running on http://localhost:3000.
## Usage

1. **Select Libraries**

   - Choose the source library (From) and target library (To) from the dropdown menus.

2. **Enter Code**

   - Input the code snippet you want to convert in the provided textarea.

3. **Convert Code**

   - Click the "Convert" button to initiate the code conversion.

4. **View and Copy Output**

   - The converted code will be displayed in a read-only textarea. Click the copy button to copy the code to your clipboard.

## Libraries Used

- **React**: JavaScript library for building user interfaces.
- **@google/generative-ai**: Google's API for generative AI models.
- **react-daisyui**: UI components library for a consistent and modern look.
- **react-icons**: A collection of popular icons to enhance the UI.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request on GitHub if you have any improvements or bug fixes.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact

For any questions or support, open an issue. 

---

Happy coding! 🚀


