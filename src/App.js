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

const App = () => {
  const [error, setError] = useState('');
  const [newUserName, setNewUserName] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [isNameMissing, setIsNameMissing] = useState(false);
  const [isPasswordMissing, setIsPasswordMissing] = useState(false);
  const [isPasswordTooShort, setIsPasswordTooShort] = useState(false);

  const handleErrorMessage = (e) => {
    console.log(e);
    setError('Something went wrong with your request');
  };

  const onChangeUserName = (event) => {
    setNewUserName(event.target.value);
    setIsNameMissing(false);
  };

  const onChangePassword = (event) => {
    setNewPassword(event.target.value);
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
        <Route exact path="/" element={<WelcomeScreen error={error} handleErrorMessage={handleErrorMessage} />} />
        <Route
          exact
          path="/register"
          element={(
            <RegistrationScreen
              error={error}
              newUserName={newUserName}
              newPassword={newPassword}
              setNewUserName={setNewUserName}
              setNewPassword={setNewPassword}
              isNameMissing={isNameMissing}
              setIsNameMissing={setIsNameMissing}
              isPasswordMissing={isPasswordMissing}
              setIsPasswordMissing={setIsPasswordMissing}
              isPasswordTooShort={isPasswordTooShort}
              onChangeUserName={onChangeUserName}
              onChangePassword={onChangePassword}
              handleErrorMessage={handleErrorMessage} />
          )} />
        <Route
          exact
          path="/login"
          element={(
            <LoginScreen
              error={error}
              newUserName={newUserName}
              newPassword={newPassword}
              setNewUserName={setNewUserName}
              setNewPassword={setNewPassword}
              isNameMissing={isNameMissing}
              isPasswordMissing={isPasswordMissing}
              setIsNameMissing={setIsNameMissing}
              setIsPasswordMissing={setIsPasswordMissing}
              onChangeUserName={onChangeUserName}
              onChangePassword={onChangePassword}
              handleErrorMessage={handleErrorMessage} />
          )} />
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
