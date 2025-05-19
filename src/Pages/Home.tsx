import React from 'react';
import { Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const navigate = useNavigate();

  const handleStartQuiz = () => {
    navigate('/setup-quiz');
  };

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <Typography variant="h4" gutterBottom>
        Welcome to the AZ900 Quiz App
      </Typography>
      <Typography variant="body1" gutterBottom>
        Test your knowledge with our fun and interactive quizzes!
      </Typography>
      <Button variant="contained" color="primary" onClick={handleStartQuiz}>
        Start A Quiz
      </Button>
    </Container>
  );
};

export default Home;
