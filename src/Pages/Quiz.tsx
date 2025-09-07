import React, { useMemo, useState, useEffect } from "react";
import { Button, Container, Typography } from "@mui/material";
import questions from "../Data/questions.json";
import QuizAnsBox, { Question } from "../Components/QuizAnsBox";
import QuizQuestion from "../Components/QuizQuestion";
import { useLocation, useNavigate } from "react-router-dom";

const Quiz = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { questionOrder, numberOfQuestions, startingQuestionNumber } =
    location.state || {};
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [showResults, setShowResults] = useState(false);

  const offsetIndex = useMemo(() => {
    return Math.floor(Math.random() * questions.length);
  }, []);

  const questionsSample = useMemo(() => {
    if (questionOrder === "random") {
      const shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);
      return shuffledQuestions.slice(0, numberOfQuestions);
    } else {
      if (startingQuestionNumber > 0) {
        const startIndex = startingQuestionNumber - 1;
        const endIndex = Math.min(
          startIndex + numberOfQuestions,
          questions.length
        );
        return questions.slice(startIndex, endIndex);
      } else {
        const endIndex = Math.min(
          offsetIndex + numberOfQuestions,
          questions.length
        );
        return questions.slice(offsetIndex, endIndex);
      }
    }
  }, [questionOrder, offsetIndex, numberOfQuestions, startingQuestionNumber]);

  const getFinalScore = ():string => {
    return `${selectedAnswers.filter((answer, index) => {
      // Safety check to ensure questionsSample[index] exists
      if (!questionsSample[index] || !questionsSample[index].answer) {
        return false;
      }
      const correctAnswer = questionsSample[index].answer
        .replace(" ", "")
        .split(",")
        .sort()
        .join(",");
      const userAnswer = answer.replace(" ", "").split(",").sort().join(",");
      return userAnswer === correctAnswer;
    }).length} / ${questionsSample.length}`;
  };

  // Initialize selectedAnswers array when questionsSample changes
  useEffect(() => {
    setSelectedAnswers(Array(questionsSample.length).fill(""));
  }, [questionsSample]);

  const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = event.target.value;
    setSelectedAnswers(newAnswers);
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };

  const handlePreviousQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
  };

  const handleSubmitQuiz = () => {
    setShowResults(true);
  };

  const currentQuestion = questionsSample[currentQuestionIndex];

  const handleRetryQuiz = () => {
    setShowResults(false);
    setCurrentQuestionIndex(0);
    setSelectedAnswers(Array(questionsSample.length).fill(""));
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        maxWidth: "1000px",
      }}
    >
      <Typography variant="h4" gutterBottom sx={{ marginTop: "20px" }}>
        AZ900 Quiz Practice
      </Typography>
      {!showResults ? (
        <>
          <QuizQuestion
            handleAnswerChange={handleAnswerChange}
            handleNextQuestion={handleNextQuestion}
            handlePreviousQuestion={handlePreviousQuestion}
            handleSubmitQuiz={handleSubmitQuiz}
            currentQuestion={currentQuestion as Question}
            currentQuestionIndex={currentQuestionIndex}
            selectedAnswers={selectedAnswers}
            questions={questionsSample as Question[]}
          />
        </>
      ) : (
        <div style={{ marginTop: "40px" }}>
          <div style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
          <Typography variant="h5">Results</Typography>
          <Typography variant="h5">Score:{" "}{getFinalScore()}</Typography>
          </div>
          {questionsSample.map((question, index) => (
            <QuizAnsBox
              key={index}
              question={question as Question}
              userAnswer={selectedAnswers[index]}
            />
          ))}
          <div
            style={{
              marginBottom: "40px",
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h6">
              Score: {getFinalScore()}
            </Typography>
            <div style={{ display: "flex", gap: "10px" }}>
              <Button
                variant="contained"
                color="primary"
                onClick={() => navigate("/setup-quiz")}
              >
                Setup new quiz
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={() => handleRetryQuiz()}
              >
                Retry quiz
              </Button>
            </div>
          </div>
        </div>
      )}
      {!showResults && (
        <>
          Question {currentQuestionIndex + 1} of {questionsSample.length}
        </>
      )}
    </Container>
  );
};

export default Quiz;
