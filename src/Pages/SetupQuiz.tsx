import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Typography,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Checkbox,
  Tooltip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Attribute from "../Components/Attribute";
import questions from "../Data/questions.json";

const SetupQuiz = () => {
  const [questionOrder, setQuestionOrder] = useState("random");
  const [numberOfQuestions, setNumberOfQuestions] = useState(10);
  const [startingQuestionNumber, setStartingQuestionNumber] = useState(0);
  const [showStartingNumber, setShowStartingNumber] = useState(false);
  const navigate = useNavigate();
  
  const totalQuestions = questions.length;
  const maxQuestionsForSequential = questionOrder === "sequential" && startingQuestionNumber > 0 
    ? totalQuestions - startingQuestionNumber + 1 
    : totalQuestions;

  const handleStartQuiz = () => {
    if (numberOfQuestions > maxQuestionsForSequential) {
      return; // Don't start quiz if too many questions requested
    }
    navigate("/quiz", {
      state: { questionOrder, numberOfQuestions, startingQuestionNumber },
    });
  };

  useEffect(() => {
    if (showStartingNumber) {
      setStartingQuestionNumber(1);
    } else {
      setStartingQuestionNumber(0);
    }
  }, [showStartingNumber]);

  // Auto-adjust numberOfQuestions if it exceeds the maximum available
  useEffect(() => {
    if (numberOfQuestions > maxQuestionsForSequential) {
      setNumberOfQuestions(Math.max(1, maxQuestionsForSequential));
    }
  }, [maxQuestionsForSequential, numberOfQuestions]);

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        backgroundImage: 'url("/assets/bg.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        style={{
          border: "1px solid black",
          padding: "20px",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
        }}
      >
        <Typography variant="h4" gutterBottom>
          Setup Quiz
        </Typography>
        <FormControl component="fieldset">
          <FormLabel component="legend">Question Order</FormLabel>
          <RadioGroup
            value={questionOrder}
            onChange={(e) => setQuestionOrder(e.target.value)}
          >
            <Tooltip
              title="Questions will be in the order from the database."
              placement="right"
            >
              <FormControlLabel
                value="sequential"
                control={<Radio />}
                label="Sequential"
              />
            </Tooltip>
            <Tooltip
              title="Questions will be in random order."
              placement="right"
            >
              <FormControlLabel
                value="random"
                control={<Radio />}
                label="Random"
              />
            </Tooltip>
          </RadioGroup>
        </FormControl>
        {questionOrder === "sequential" && (
          <div>
            <FormControlLabel
              label="Start from a specific question"
              control={
                <Checkbox
                  checked={showStartingNumber}
                  onChange={(e) => setShowStartingNumber(e.target.checked)}
                />
              }
            />
            {showStartingNumber && (
              <TextField
                label="Starting Question Number"
                type="number"
                value={startingQuestionNumber}
                onChange={(e) =>
                  setStartingQuestionNumber(Number(e.target.value))
                }
                inputProps={{ min: 1, max: 200 }}
                fullWidth
                margin="normal"
              />
            )}
          </div>
        )}
        <TextField
          label="Number of Questions"
          type="number"
          value={numberOfQuestions}
          onChange={(e) => setNumberOfQuestions(Number(e.target.value))}
          inputProps={{ min: 1, max: maxQuestionsForSequential }}
          fullWidth
          margin="normal"
          error={numberOfQuestions > maxQuestionsForSequential}
          helperText={
            numberOfQuestions > maxQuestionsForSequential
              ? `Maximum ${maxQuestionsForSequential} questions available${
                  questionOrder === "sequential" && startingQuestionNumber > 0
                    ? ` (starting from question ${startingQuestionNumber})`
                    : ""
                }`
              : `Total questions available: ${totalQuestions}`
          }
        />
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            minWidth: "300px",
            marginTop: "20px",
          }}
        >
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleStartQuiz}
            disabled={numberOfQuestions > maxQuestionsForSequential || numberOfQuestions < 1}
          >
            Start Quiz
          </Button>
        </div>
      </div>
      <Attribute />
    </Container>
  );
};

export default SetupQuiz;
