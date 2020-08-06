import React, { useState, useCallback } from 'react';
import { TextField, Button } from '@material-ui/core';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { checkCorrectName } from './checker';
import { register } from '../../core/services/auth';
import './styles.css';
import { registerError, register as registerStart, registerSuccess } from '../../core/actions/authActions';

const Register = (): JSX.Element => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [email, setEmail] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [nameError, setNameError] = useState<string>('');
  const [secondNameError, setsecondNameError] = useState<string>('');
  const [secondName, setSecondName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [rpassword, setRpassword] = useState<string>('');
  const [birthday, setBirthday] = useState<string>('');
  const [birthError, setBirthError] = useState<boolean>(false);
  const [regError, setRegError] = useState<string>('');

  const onEmailChange = useCallback(({ target: { value } }) => {
    setEmail(value);
  }, []);

  const onNameChange = useCallback(({ target: { value } }) => {
    setNameError(checkCorrectName('Имя', value));
    setName(value);
  }, []);

  const onSecondNameChange = useCallback(({ target: { value } }) => {
    setsecondNameError(checkCorrectName('Фамилия', value));
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

  const handleRegister = useCallback(() => {
    setRegError('');
    if (password !== rpassword) {
      setRegError('Пароли не совпадают.');
    }
    if (name.length === 0) {
      setNameError('Введите свое Имя.');
    }
    if (secondName.length === 0) {
      setSecondName('Введите свою Фамилию.');
    }
    if (birthday.length === 0) {
      setBirthError(true);
    }

    if (!nameError && !secondNameError && !birthError && password === rpassword) {
      dispatch(registerStart());
      register(email, password, name, secondName, birthday)
        .then(() => {
          dispatch(registerSuccess());
          history.push('/');
        })
        .catch((error) => {
          dispatch(registerError());
          setRegError(error.message);
        });
    }
  }, [
    email,
    password,
    name,
    secondName,
    birthday,
    history,
    rpassword,
    nameError,
    secondNameError,
    birthError,
    dispatch,
  ]);

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
        error={!!secondNameError}
        onChange={onSecondNameChange}
      />
      {!!secondNameError && <p className="error">{secondNameError}</p>}
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
        <Button variant="contained" color="primary" onClick={handleRegister}>
          Register
        </Button>
      </div>
      {regError}
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
