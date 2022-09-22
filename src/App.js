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

// Command to set up the database again:
// psql -h localhost -p 5432 -U marieimpens -d react_message_app -f db/init.sql (in the api)

// TODO:
// Align the x mark for the search box so that you don't have to use  margins (align self didn't work)
// When you auto fill on the log in or reg screen remove the background
// Fix sidebar view on large laptop screens

// TODO: together:
// Make it so if I go to login, register or welcome screen, if im already logged in it sends me to the home page
// - Make sure you can't access /home if not logged in
// - Make sure if going to /home and logged in, it keeps you on /home

const App = () => {
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <StyledAppContainer>
      <Routes>
        <Route exact path="/" element={<WelcomeScreen />} />
        <Route exact path="/register" element={<RegistrationScreen setCurrentUser={setCurrentUser} />} />
        <Route exact path="/login" element={<LoginScreen setCurrentUser={setCurrentUser} />} />
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
