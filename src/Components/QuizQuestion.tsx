import {
  Button,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Container,
  FormGroup,
  Checkbox,
} from "@mui/material";
import { Question } from "./QuizAnsBox";

interface QuizQuestionProps {
  handleAnswerChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleNextQuestion: () => void;
  handlePreviousQuestion: () => void;
  handleSubmitQuiz: () => void;
  currentQuestion: Question;
  currentQuestionIndex: number;
  selectedAnswers: string[];
  questions: {
    question: string;
    options: {
      [key: string]: string;
    };
  }[];
}

const QuizQuestion = ({
  handleAnswerChange,
  handleNextQuestion,
  handlePreviousQuestion,
  handleSubmitQuiz,
  currentQuestion,
  currentQuestionIndex,
  selectedAnswers,
  questions,
}: QuizQuestionProps) => {
  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const currentAnswers = selectedAnswers[currentQuestionIndex]
      ? selectedAnswers[currentQuestionIndex].split(",")
      : [];

    if (event.target.checked) {
      currentAnswers.push(value);
    } else {
      const index = currentAnswers.indexOf(value);
      if (index > -1) {
        currentAnswers.splice(index, 1);
      }
    }

    const newEvent = {
      ...event,
      target: {
        ...event.target,
        value: currentAnswers.join(","),
      },
    };

    handleAnswerChange(newEvent);
  };

  return (
    <Container
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        border: "1px solid #ccc",
        padding: "10px",
        borderRadius: "5px",
        minHeight: "600px",
        maxHeight: "100vh",
        height: "auto",
        backgroundColor: "rgba(255, 255, 255)",
      }}
    >
      <article style={{ display: "flex", flexDirection: "column", flex: 1, marginInline: "1%",         overflowY: "auto", }}>
        <Typography variant="h6" style={{ marginBottom: "20px" }}>
          {currentQuestion.question}
          {currentQuestion.questionImage && (
            <div style={{ display: "flex", justifyContent: "center" }}>
              <img
                src={currentQuestion.questionImage}
                alt="Question"
                style={
                  currentQuestion.questionImageLong
                    ? { width: "100%", maxWidth: "700px", height: "auto" }
                    : { width: "400px", height: "auto" }
                }
              />
            </div>
          )}
          {currentQuestion.questionPart2 && (
            <Typography variant="h6" sx={{ marginTop: "10px" }}>
              {currentQuestion.questionPart2}
              {currentQuestion.questionImage2 && (
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <img
                    src={currentQuestion.questionImage2}
                    alt="Question"
                    style={{ width: "auto", height: "400px" }}
                  />
                </div>
              )}
              {currentQuestion.questionPart3 && (
                <Typography variant="h6" sx={{ marginTop: "10px" }}>
                  {currentQuestion.questionPart3}
                </Typography>
              )}
            </Typography>
          )}
        </Typography>
        <section
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "70%",
            marginInline: "5%",
          }}
        >
          <FormControl component="fieldset">
            <FormLabel component="legend">
              {" "}
              {currentQuestion.multiOption
                ? "Select multiple options"
                : "Select one option"}
              .
            </FormLabel>
            {currentQuestion.multiOption ? (
              <FormGroup>
                {Object.entries(currentQuestion.options).map(([key, value]) => (
                  <FormControlLabel
                    key={key}
                    control={
                      <Checkbox
                        checked={selectedAnswers[currentQuestionIndex]
                          ?.split(",")
                          .includes(key)}
                        onChange={handleCheckboxChange}
                        value={key}
                      />
                    }
                    label={`${key}. ${value as string}`}
                  />
                ))}
              </FormGroup>
            ) : (
              <RadioGroup
                value={selectedAnswers[currentQuestionIndex]}
                onChange={handleAnswerChange}
              >
                {Object.entries(currentQuestion.options).map(([key, value]) => (
                  <FormControlLabel
                    key={key}
                    value={key}
                    control={<Radio />}
                    label={`${key}. ${value as string}`}
                  />
                ))}
              </RadioGroup>
            )}
          </FormControl>
        </section>
      </article>
      <nav style={{ display: "flex", gap: "10px", justifyContent: "flex-end" }}>
        <Button
          variant="contained"
          color="primary"
          onClick={handlePreviousQuestion}
          disabled={currentQuestionIndex <= 0}
        >
          ‹ Previous
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleNextQuestion}
          disabled={currentQuestionIndex >= questions.length - 1}
        >
          Next ›
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={handleSubmitQuiz}
        >
          Submit Quiz
        </Button>
      </nav>
    </Container>
  );
};

export default QuizQuestion;
