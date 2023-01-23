import styled from 'styled-components';
import { Routes, Route } from 'react-router-dom';

import './App.css';

import WelcomeScreen from './components/auth/WelcomeScreen';
import HomeScreen from './components/home/HomeScreen';
import RegistrationScreen from './components/auth/RegistrationScreen';
import LoginScreen from './components/auth/LoginScreen';
import AutoLogin from './components/auth/AutoLogin';
import PageNotFound from './components/PageNotFound';
import RedirectLoggedInUser from './components/auth/RedirectLoggedInUser';

const App = () => {
  return (
    <StyledAppContainer>
      <Routes>
        <Route
          exact
          path="/"
          element={(
            <RedirectLoggedInUser>
              <WelcomeScreen />
            </RedirectLoggedInUser>
          )} />
        <Route
          exact
          path="/register"
          element={(
            <RedirectLoggedInUser>
              <RegistrationScreen />
            </RedirectLoggedInUser>
          )} />
        <Route
          exact
          path="/login"
          element={(
            <RedirectLoggedInUser>
              <LoginScreen />
            </RedirectLoggedInUser>
          )} />
        <Route
          exact
          path="/home"
          element={(
            <AutoLogin>
              <HomeScreen />
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
  background-color: #f8f7f7;
`;

export default App;
