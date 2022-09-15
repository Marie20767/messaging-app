import { useState } from 'react';
import styled from 'styled-components';
import { Routes, Route } from 'react-router-dom';
import WelcomeScreen from './components/auth/WelcomeScreen';
import './App.css';
import HomeScreen from './components/home/HomeScreen';
import RegistrationScreen from './components/auth/RegistrationScreen';
import LoginScreen from './components/auth/LoginScreen';
import AutoLogin from './components/auth/AutoLogin';

// Command to set up the database again:
// psql -h localhost -p 5432 -U marieimpens -d react_message_app -f db/init.sql (in the api)

// TODO:
// - handle serverError in each component depending on what you want to happen
//   (e.g. in LoginScreen just show a error message somewhere, in HomeScreen show error with Retry button)
//   Note - you'll want to move serverError state from App into each component

// - when border is red for the Input fields (e.g. when you don't fill them in on the Login screen, make it
// so there is just one border on the input container)

// - rename showErrorMessage to something like showFormInvalidErrorMessage to make it a bit more specific

// - spacing on RegistrationForm when multiple errors are showing

// TODO: together:
// Make it so if I go to login, register or welcome screen, if im already logged in it sends me to the home page
// - Make sure you can't access /home if not logged in
// - Make sure if going to /home and logged in, it keeps you on /home

const App = () => {
  const [serverError, setServerError] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [userNameInput, setUserNameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [isNameMissing, setIsNameMissing] = useState(false);
  const [isPasswordMissing, setIsPasswordMissing] = useState(false);
  const [isPasswordTooShort, setIsPasswordTooShort] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  const [newAvatarId, setNewAvatarId] = useState(null);

  const handleServerErrorMessage = (e) => {
    console.log(e);
    setServerError('Something went wrong with your request');
  };

  const onChangeUserName = (event) => {
    setUserNameInput(event.target.value);
    setIsNameMissing(false);
  };

  const onChangePassword = (event) => {
    setPasswordInput(event.target.value);
    setIsPasswordMissing(false);

    if (event.target.value.length < 8) {
      setIsPasswordTooShort(true);
    } else {
      setIsPasswordTooShort(false);
    }
  };

  return (
    <StyledAppContainer>
      <Routes>
        <Route
          exact
          path="/"
          element={<WelcomeScreen />} />
        <Route
          exact
          path="/register"
          element={(
            <RegistrationScreen
              serverError={serverError}
              userNameInput={userNameInput}
              passwordInput={passwordInput}
              isNameMissing={isNameMissing}
              setIsNameMissing={setIsNameMissing}
              newAvatarId={newAvatarId}
              setNewAvatarId={setNewAvatarId}
              isPasswordMissing={isPasswordMissing}
              setIsPasswordMissing={setIsPasswordMissing}
              showErrorMessage={showErrorMessage}
              setShowErrorMessage={setShowErrorMessage}
              setCurrentUser={setCurrentUser}
              isPasswordTooShort={isPasswordTooShort}
              onChangeUserName={onChangeUserName}
              onChangePassword={onChangePassword}
              handleServerErrorMessage={handleServerErrorMessage} />
          )} />
        <Route
          exact
          path="/login"
          element={(
            <LoginScreen
              serverError={serverError}
              userNameInput={userNameInput}
              passwordInput={passwordInput}
              isNameMissing={isNameMissing}
              isPasswordMissing={isPasswordMissing}
              setIsNameMissing={setIsNameMissing}
              setIsPasswordMissing={setIsPasswordMissing}
              showErrorMessage={showErrorMessage}
              setShowErrorMessage={setShowErrorMessage}
              setCurrentUser={setCurrentUser}
              onChangeUserName={onChangeUserName}
              onChangePassword={onChangePassword}
              handleServerErrorMessage={handleServerErrorMessage} />
          )} />
        <Route
          exact
          path="/home"
          element={(
            <AutoLogin setCurrentUser={setCurrentUser}>
              <HomeScreen
                serverError={serverError}
                currentUser={currentUser}
                handleServerErrorMessage={handleServerErrorMessage} />
            </AutoLogin>
          )} />
      </Routes>
    </StyledAppContainer>
  );
};

const StyledAppContainer = styled.div`
  height: 100%;
  width: 100%;
`;

export default App;
