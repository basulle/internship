import React, { useState, useCallback } from 'react';
import { TextField, Button } from '@material-ui/core';
import { useHistory, Link } from 'react-router-dom';
import firebase from 'firebase';
import { checkCorrectName } from './checker';

import './styles.css';

const Register = (): JSX.Element => {
  const history = useHistory();
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [nameError, setNameError] = useState<string>('');
  const [secondName, setSecondName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [rpassword, setRpassword] = useState<string>('');
  const [birthday, setBirthday] = useState<string>('');
  const [birthError, setBirthError] = useState<boolean>(false);

  const onEmailChange = useCallback(({ target: { value } }) => {
    setEmail(value);
  }, []);

  const onNameChange = useCallback(({ target: { value } }) => {
    setNameError(checkCorrectName('Имя', value));
    setName(value);
  }, []);

  const onSecondNameChange = useCallback(({ target: { value } }) => {
    setSecondName(value);
  }, []);

  const onPasswordChange = useCallback(({ target: { value } }) => {
    setPassword(value);
  }, []);

  const onRpasswordChange = useCallback(({ target: { value } }) => {
    setRpassword(value);
  }, []);

  const onBirthdayChange = useCallback(({ target: { value } }) => {
    getCurrentAge(value) < 18 ? setBirthError(true) : setBirthError(false);
    setBirthday(value);
  }, []);

  const getCurrentAge = (date: string) => {
    return (new Date().getTime() - new Date(date).getTime()) / (24 * 3600 * 365.25 * 1000);
  };

  const register = useCallback(() => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        firebase.database().ref().child('users').child(res.user.uid).set({ email, name, secondName, birthday });
      })
      .then(() => history.push('/'));
  }, [email, password, name, secondName, birthday, history]);

  return (
    <div className="container">
      <h1>Registration</h1>
      <TextField
        id="standard-name"
        label="Эл. почта"
        variant="outlined"
        margin="normal"
        value={email}
        onChange={onEmailChange}
      />
      <TextField
        id="standard-name"
        label="Имя"
        variant="outlined"
        margin="normal"
        value={name}
        error={!!nameError}
        onChange={onNameChange}
      />
      {!!nameError && <p className="error">{nameError}</p>}
      <TextField
        id="standard-name"
        label="Фамилия"
        variant="outlined"
        margin="normal"
        value={secondName}
        onChange={onSecondNameChange}
      />
      <TextField
        id="standard-name"
        type="password"
        label="Пароль"
        variant="outlined"
        margin="normal"
        value={password}
        onChange={onPasswordChange}
      />
      <TextField
        id="standard-name"
        type="password"
        label="Повторите пароль"
        variant="outlined"
        margin="normal"
        value={rpassword}
        onChange={onRpasswordChange}
      />
      <TextField
        id="date"
        label="Дата рождения"
        type="date"
        InputLabelProps={{
          shrink: true,
        }}
        value={birthday}
        onChange={onBirthdayChange}
        error={!!birthError}
      />
      {!!birthError && <p className="error">{'<18 years old'}</p>}
      <div className="button">
        <Button variant="contained" color="primary" onClick={register}>
          Register
        </Button>
      </div>
      <h4>
        {'Уже имеется аккаунт? '}
        <Link to="/login" style={{ textDecoration: 'none' }}>
          Login
        </Link>
      </h4>
    </div>
  );
};

export default Register;
