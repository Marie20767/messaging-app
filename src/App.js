import styled from 'styled-components';
import { useState } from 'react';
import WelcomeScreen from './components/login/register/WelcomeScreen';
import './App.css';
import HomeScreen from './components/home/HomeScreen';
import RegistrationScreen from './components/login/register/RegistrationScreen';

// Command to set up the database again:
// psql -h localhost -p 5432 -U marieimpens -d react_message_app -f db/init.sql (in the api)

// TODO: use React Router for smoother page transitions?
// Write the front end functions so when you create a user it sends the info to the backend
// Make a log in screen

const App = () => {
  const [hasLocalStorageData, setHasLocalStorageData] = useState(true);

  return (
    <StyledAppContainer>
      {!hasLocalStorageData
        ? <RegistrationScreen />
        : <HomeScreen />
      }
    </StyledAppContainer>
  );
};

const StyledAppContainer = styled.div`
  height: 100%;
  width: 100%;
`;

export default App;
