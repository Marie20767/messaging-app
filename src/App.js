import { useState } from 'react';
import styled from 'styled-components';
import { Routes, Route } from 'react-router-dom';
import WelcomeScreen from './components/login/register/WelcomeScreen';
import './App.css';
import HomeScreen from './components/home/HomeScreen';
import RegistrationScreen from './components/login/register/RegistrationScreen';

// Command to set up the database again:
// psql -h localhost -p 5432 -U marieimpens -d react_message_app -f db/init.sql (in the api)

// TODO:
// Make a log in screen

const App = () => {
  const [error, setError] = useState('');

  const handleErrorMessage = (e) => {
    console.log(e);
    setError('Something went wrong with your request');
  };

  return (
    <StyledAppContainer>
      <Routes>
        <Route exact path="/" element={<WelcomeScreen error={error} handleErrorMessage={handleErrorMessage} />} />
        <Route exact path="/register" element={<RegistrationScreen error={error} handleErrorMessage={handleErrorMessage} />} />
        <Route exact path="/home" element={<HomeScreen error={error} handleErrorMessage={handleErrorMessage} />} />
      </Routes>
    </StyledAppContainer>
  );
};

const StyledAppContainer = styled.div`
  height: 100%;
  width: 100%;
`;

export default App;
