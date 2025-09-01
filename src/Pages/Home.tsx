import React from "react";
import { Container, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import Attribute from "../Components/Attribute";

const Home = () => {
  const navigate = useNavigate();

  const handleStartQuiz = () => {
    navigate("/setup-quiz");
  };

  const randomQuizQuotes = [
    'Knowledge is knowing a tomato is a fruit; wisdom is not putting it in a fruit salad" — Miles Kington',
    "A wise man once said nothing. Probably because he knew better than to get involved",

    "I came for the quiz, stayed for the glory, and left with random facts I’ll never use again… until the next quiz!",
    "Winning a quiz doesn’t mean I know everything… it just means I guessed better than everyone else.",
    "I’m not a quiz whiz, but I know enough to know I’m not a quiz whiz.",
    "The best part about winning a quiz? Discovering that all those useless facts I hoarded actually have a purpose.",
    "I thought I was just learning random trivia… turns out I was secretly training to become the ultimate quiz champion",
    "A quiz win today, eternal random-fact superiority tomorrow.",
    "Quiz victories are like Wi-Fi passwords — once you have them, you suddenly feel smarter than everyone else.",
  ];

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
      <Typography variant="h4" gutterBottom sx={{ textAlign: "center" }}>
        Welcome to the AZ900 Practice Quiz
      </Typography>
      <Typography
        variant="body1"
        gutterBottom
        sx={{ maxWidth: "550px", textAlign: "center" }}
      >
        {randomQuizQuotes[Math.floor(Math.random() * randomQuizQuotes.length)]}
      </Typography>
      <Button variant="contained" color="primary" onClick={handleStartQuiz}>
        Start A Quiz
      </Button>

      <Attribute />
    </Container>
  );
};

export default Home;
