import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const QuizApp = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [quizCompleted, setQuizCompleted] = useState(false);

  useEffect(() => {
    fetch("/path-to-your-csv-file.csv")
      .then((response) => response.text())
      .then((data) => {
        const rows = data.split("\n").map((row) => row.split("\t"));
        const parsedQuestions = rows.slice(1).map((row) => ({
          question: row[0],
          answers: row.slice(1, 5),
          timeLimit: parseInt(row[5], 10),
          correctAnswers: row[6].split(",").map(Number),
        }));
        setQuestions(parsedQuestions);
      });
  }, []);

  const handleAnswerClick = (index) => {
    setSelectedAnswers((prev) => [...prev, index + 1]);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setQuizCompleted(true);
    }
  };

  return (
    <div className="p-4 max-w-xl mx-auto">
      {!quizCompleted ? (
        questions.length > 0 && (
          <Card>
            <CardContent className="p-4">
              <h2 className="text-xl font-bold mb-4">
                {questions[currentQuestionIndex].question}
              </h2>
              <div className="space-y-2">
                {questions[currentQuestionIndex].answers.map((answer, index) => (
                  <Button
                    key={index}
                    className="w-full"
                    onClick={() => handleAnswerClick(index)}
                  >
                    {answer}
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        )
      ) : (
        <h2 className="text-xl font-bold text-center">Quiz completado!</h2>
      )}
    </div>
  );
};

export default QuizApp;
