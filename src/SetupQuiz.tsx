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
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const SetupQuiz: React.FC = () => {
  const [questionOrder, setQuestionOrder] = useState("random");
  const [numberOfQuestions, setNumberOfQuestions] = useState(10);
  const [startingQuestionNumber, setStartingQuestionNumber] = useState(0);
  const [showStartingNumber, setShowStartingNumber] = useState(false);
  const navigate = useNavigate();

  const handleStartQuiz = () => {
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

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
      }}
    >
      <div style={{ border: "1px solid black", padding: "20px" }}>
        <Typography variant="h4" gutterBottom>
          Setup Quiz
        </Typography>
        <FormControl component="fieldset">
          <FormLabel component="legend">Question Order</FormLabel>
          <RadioGroup
            value={questionOrder}
            onChange={(e) => setQuestionOrder(e.target.value)}
          >
            <FormControlLabel
              value="sequential"
              control={<Radio />}
              label="Sequential"
            />
            <FormControlLabel
              value="random"
              control={<Radio />}
              label="Random"
            />
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
          inputProps={{ min: 1, max: 100 }}
          fullWidth
          margin="normal"
        />
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            width: "500px",
            marginTop: "20px",
          }}
        >
          <Button variant="contained" color="primary" onClick={handleStartQuiz}>
            Start Quiz
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default SetupQuiz;
