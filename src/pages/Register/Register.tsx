import React, { useState, useCallback, useEffect } from 'react';
import { TextField, Button, CircularProgress } from '@material-ui/core';
import { useHistory, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { selectRegisterErrorState, selectIsLoadingState } from '../../core/selectors/auth';
import { checkCorrectName } from './checker';
import { register } from '../../core/thunks/auth';
import './styles.css';

const Register = (): JSX.Element => {
  const history = useHistory();
  const errorState = useSelector(selectRegisterErrorState);
  const isLoadingState = useSelector(selectIsLoadingState);
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
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setRegError(errorState);
    setIsLoading(isLoadingState);
  }, [errorState, isLoadingState]);

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
    setRegError(password !== rpassword ? 'Пароли не совпадают.' : '');
    setNameError(name.length === 0 ? 'Введите свое Имя.' : '');
    setsecondNameError(secondName.length === 0 ? 'Введите свою Фамилию.' : '');
    setBirthError(birthday.length === 0);
    if (!nameError && !secondNameError && !birthError && password === rpassword) {
      dispatch(register(email, password, name, secondName, birthday, history));
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
      {isLoading ? (
        <div className="loader">
          <CircularProgress color="secondary" size="6rem" />
        </div>
      ) : null}
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
