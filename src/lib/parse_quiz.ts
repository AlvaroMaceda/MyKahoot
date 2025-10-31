import { v4 as uuidv4 } from 'uuid';
import Papa from 'papaparse';
import type { QuizData } from '../types/quiz';

export default function parseCSVQuiz(csvContent: string): QuizData {
  const result = Papa.parse<string[]>(csvContent, {
    delimiter: ',',
    quoteChar: '"',
    skipEmptyLines: true,
  });

  const data = result.data;
  if (!Array.isArray(data) || data.length < 2) {
    throw new Error('CSV content is too short. Must have at least a title and one question.');
  }

  const quizTitle = Array.isArray(data[0]) ? data[0][0] : data[0];
  const questions = data.slice(1).map((parts: string[], index: number) => {
    if (parts.length < 3) {
      throw new Error(`Invalid question format on line ${index + 2}. Each question must have at least one correct and one incorrect answer.`);
    }
    const questionText = parts[0];
    const correctAnswer = parts[1];
    const incorrectAnswers = parts.slice(2);

    const options = [correctAnswer, ...incorrectAnswers].sort(() => Math.random() - 0.5);
    const correctOptionIndex = options.indexOf(correctAnswer);

    return {
      id: (index + 1).toString(),
      text: questionText,
      correctOption: correctOptionIndex,
      options: options,
    };
  });

  return {
    id: uuidv4(),
    name: quizTitle,
    questions: questions,
  };
}
