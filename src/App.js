import { useState } from 'react';
import styled from 'styled-components';
import { Routes, Route } from 'react-router-dom';
import WelcomeScreen from './components/auth/WelcomeScreen';
import './App.css';
import HomeScreen from './components/home/HomeScreen';
import RegistrationScreen from './components/auth/RegistrationScreen';
import LoginScreen from './components/auth/LoginScreen';
import AutoLogin from './components/auth/AutoLogin';
import PageNotFound from './components/PageNotFound';
import RedirectLoggedInUser from './components/auth/RedirectLoggedInUser';

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <StyledAppContainer>
      <Routes>
        <Route
          exact
          path="/"
          element={(
            <RedirectLoggedInUser setCurrentUser={setCurrentUser}>
              <WelcomeScreen />
            </RedirectLoggedInUser>
          )} />
        <Route
          exact
          path="/register"
          element={(
            <RedirectLoggedInUser setCurrentUser={setCurrentUser}>
              <RegistrationScreen setCurrentUser={setCurrentUser} />
            </RedirectLoggedInUser>
          )} />
        <Route
          exact
          path="/login"
          element={(
            <RedirectLoggedInUser setCurrentUser={setCurrentUser}>
              <LoginScreen setCurrentUser={setCurrentUser} />
            </RedirectLoggedInUser>
          )} />
        <Route
          exact
          path="/home"
          element={(
            <AutoLogin setCurrentUser={setCurrentUser}>
              <HomeScreen
                currentUser={currentUser}
                setCurrentUser={setCurrentUser} />
            </AutoLogin>
          )} />
        <Route exact path="*" element={<PageNotFound />} />
      </Routes>
    </StyledAppContainer>
  );
};

const StyledAppContainer = styled.div`
  height: 100%;
  width: 100%;
`;

export default App;
