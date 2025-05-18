import { Typography } from "@mui/material";
import Tick from "./Tick";

export type Question = {
  id: number;
  question: string;
  questionPart2?: string;
  questionImage?: string;
  questionImageLong?: boolean;
  questionImage2?: string;
  questionPart3?: string;
  multiOption?: boolean;
  answer: string;
  options: { [key: string]: string };
};

interface QuizAnsBoxProps {
  userAnswer: string;
  question: Question;
  questionImage?: string;
  questionImage2?: string;
  questionPart2?: string;
}

const QuizAnsBox = ({ userAnswer, question }: QuizAnsBoxProps) => {
  const isCorrect = question.multiOption
    ? userAnswer.split(",").sort().join(",") ===
      question.answer.replace(" ", "").split(",").sort().join(",")
    : userAnswer === question.answer;

  return (
    <div
      key={question.id}
      style={{
        border: `2px solid ${isCorrect ? "green" : "red"}`,
        padding: "10px",
        marginBottom: "10px",
      }}
    >
      <Typography>
        <span
          style={{
            fontWeight: "bold",
            backgroundColor: "rgba(211, 211, 211, 0.5)",
            padding: "5px",
            borderRadius: "5px",
          }}
        >
          {question.id}. {question.question}
        </span>
        {question.questionPart2 && <p>{question.questionPart2}</p>}
        {question.questionPart3 && <p>{question.questionPart3}</p>}
        <div>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {Object.entries(question.options).map(([key, value]) => (
              <li key={key}>
                <span
                  style={{
                    display: "inline-block",
                    width: "fit-content",
                    paddingInline: "5px",
                    borderRadius: "5px",
                    backgroundColor: question.answer.split(",").includes(key)
                      ? "rgba(144, 238, 144, 0.3)"
                      : "transparent",
                  }}
                >
                  {key}. {value}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <h3>
          Your answer: {userAnswer}
          {isCorrect ? (
            <span style={{ color: "green" }}>
              {" "}
              <Tick /> Correct
            </span>
          ) : (
            <span style={{ color: "red" }}> ❌ Incorrect</span>
          )}
        </h3>
        {!isCorrect && (
          <div
            style={{
              backgroundColor: "rgba(144, 238, 144, 0.2)",
              padding: "5px",
              border: "2px solid rgba(144, 238, 144, 0.9)",
            }}
          >
            <p style={{ marginTop: 0, marginBottom: 4, fontWeight: "bold" }}>
              Correct answer: {question.answer}
            </p>
            {question.answer
              .split(",")
              .map((answer) => question.options[answer])
              .join(", ")}
          </div>
        )}
      </Typography>
    </div>
  );
};

export default QuizAnsBox;
