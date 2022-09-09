import styled from 'styled-components';
import { useState } from 'react';
import WelcomeScreen from './components/login/register/WelcomeScreen';
import './App.css';
import HomeScreen from './components/messaging/HomeScreen';
import RegistrationScreen from './components/login/register/RegistrationScreen';

// TODO: use React Router for smoother page transitions?

const App = () => {
  const [hasLocalStorageData, setHasLocalStorageData] = useState(false);

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
