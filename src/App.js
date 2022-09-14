import { useState } from 'react';
import styled from 'styled-components';
import { Routes, Route } from 'react-router-dom';
import WelcomeScreen from './components/login/register/WelcomeScreen';
import './App.css';
import HomeScreen from './components/home/HomeScreen';
import RegistrationScreen from './components/login/register/RegistrationScreen';
import LoginScreen from './components/login/register/LoginScreen';

// Command to set up the database again:
// psql -h localhost -p 5432 -U marieimpens -d react_message_app -f db/init.sql (in the api)

// TODO: add error component

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

  console.log('>>> currentUser: ', currentUser);

  return (
    <StyledAppContainer>
      <Routes>
        <Route exact path="/" element={<WelcomeScreen serverError={serverError} handleServerErrorMessage={handleServerErrorMessage} />} />
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
            <HomeScreen
              serverError={serverError}
              currentUser={currentUser}
              handleServerErrorMessage={handleServerErrorMessage} />
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
