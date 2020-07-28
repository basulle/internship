import React, { useState, useCallback } from 'react';
import { TextField, Button } from '@material-ui/core';
import { Link } from 'react-router-dom';
// import * as moment from 'moment';
import firebase from 'firebase';
import { Props } from './types';
import { checkCorrectName } from './checker';
import './styles.css';

const Register = (props: Props): JSX.Element => {
  const [email, setEmail] = useState<string>('');

  const [name, setName] = useState<string>('');
  const [nameError, setNameError] = useState<string>('');
  const [secondName, setSecondName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [rpassword, setRpassword] = useState<string>('');
  const [birthday, setBirthday] = useState<string>('');

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
    setBirthday(value);
  }, []);

  const register = useCallback(() => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((res) => {
        firebase.database().ref().child('users').child(res.user.uid).set({ email, name, secondName, birthday });
      });
  }, [email, password, name, secondName, birthday]);

  return (
    <div className="container">
      <h1>Registration {birthday}</h1>
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
        defaultValue="2020-05-27"
        onChange={onBirthdayChange}
      />
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

// new ((Date().getTime() - new Date(value)) / (24 * 3600 * 365.25 * 1000))() | 0