import React, { useMemo, useState } from "react";
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
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>(
    Array(questions.slice(0, numberOfQuestions).length).fill("")
  );
  const [showResults, setShowResults] = useState(false);

  const offsetIndex = useMemo(() => {
    return Math.floor(Math.random() * questions.length);
  }, []);

  const questionsSample = useMemo(() => {
    if (questionOrder === "random") {
      const shuffledQuestions = [...questions].sort(() => Math.random() - 0.5);
      return shuffledQuestions.slice(
        offsetIndex,
        offsetIndex + numberOfQuestions
      );
    } else {
      if (startingQuestionNumber > 0) {
        return questions.slice(
          startingQuestionNumber - 1,
          startingQuestionNumber + numberOfQuestions - 1
        );
      } else {
        console.log(offsetIndex, numberOfQuestions);
        return questions.slice(offsetIndex, offsetIndex + numberOfQuestions);
      }
    }
  }, [questionOrder, offsetIndex, numberOfQuestions, startingQuestionNumber]);

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
        marginTop: "20px",
      }}
    >
      <Typography variant="h4" gutterBottom>
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
          <Typography variant="h5">Results</Typography>
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
              Score:{" "}
              {
                selectedAnswers.filter((answer, index) => {
                  const correctAnswer = questionsSample[index].answer
                    .replace(" ", "")
                    .split(",")
                    .sort()
                    .join(",");
                  const userAnswer = answer
                    .replace(" ", "")
                    .split(",")
                    .sort()
                    .join(",");
                  return userAnswer === correctAnswer;
                }).length
              }{" "}
              / {questionsSample.length}
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
