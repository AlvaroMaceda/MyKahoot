# MyKahoot

## What is this project?

MyKahoot is a web application designed to create, upload, preview, and play quizzes. The quizzes are stored locally in your browser's local storage. This app does not need a backend server, making it easy to use and maintain.

You can generate a test using a LLM and upload it as a CSV file to interactively answer the questions.

## Test format
The test format is a CSV file with the following structure:
- The first row contains the quiz title (no headers).
- Each subsequent row represents a question. The format is:
	- First column: question text
	- Second column: correct answer
	- Remaining columns: incorrect answers (one or more)

Example:
```csv
Trivia General
"¿Cuál es el planeta más grande del sistema solar?","Júpiter","Marte","Saturno","Venus"
"¿Quién escribió "Cien años de soledad"?","Gabriel García Márquez","Mario Vargas Llosa","Isabel Allende","Julio Cortázar"
"¿En qué año llegó el hombre a la Luna?","1969","1959","1975","1981"
"¿Cuál es el símbolo químico del oro?","Au","Ag","O","Fe"
"¿Qué país tiene la mayor población del mundo?","China","India","Estados Unidos","Brasil"
```

The correct answer is always the second column. The app will randomize the order of options when displaying questions.

## Getting Started
1. Install dependencies:
	 ```bash
	 yarn install
	 ```
2. Run the development server:
	 ```bash
	 yarn dev
	 ```
3. Build for production:
	 ```bash
	 yarn build
	 ```

## License
This project is open source under the stack overflow license. See the LICENSE file for details.
