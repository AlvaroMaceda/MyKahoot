import type { Question, QuizData } from "../types/quiz"
import Papa from 'papaparse';

function quizToCSV(quiz: QuizData): string {
  const rows: string[][] = [];
  rows.push([quiz.name]);

  quiz.questions.forEach((question: Question) => {
    const line: string[] = [];
    line.push(question.text);
    // Put correct option first, then the rest (excluding correct)
    line.push(question.options[question.correctOption]);
    question.options.forEach((option: string, idx: number) => {
      if (idx !== question.correctOption) {
        line.push(option);
      }
    });
    rows.push(line);
  });

  return Papa.unparse(rows, { delimiter: "," });
}

export { quizToCSV }
