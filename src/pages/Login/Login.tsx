import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { TextField, Button, CircularProgress } from '@material-ui/core';
import { signIn } from '../../core/thunks/auth';
import { selectSignInErrorState, selectIsLoadingState } from '../../core/selectors/auth';

const Login = (): JSX.Element => {
  const dispatch = useDispatch();
  const errorState = useSelector(selectSignInErrorState);
  const isLoadingState = useSelector(selectIsLoadingState);
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const history = useHistory();

  useEffect(() => {
    setError(errorState);
    setIsLoading(isLoadingState);
  }, [errorState, isLoadingState]);

  const logIn = useCallback(() => {
    dispatch(signIn(email, password, history));
  }, [email, password, history, dispatch]);

  const onEmailChange = useCallback(({ target: { value } }) => {
    setEmail(value);
  }, []);

  const onPasswordChange = useCallback(({ target: { value } }) => {
    setPassword(value);
  }, []);

  return (
    <div className="container">
      <h1>Login</h1>
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
        type="password"
        label="Пароль"
        variant="outlined"
        margin="normal"
        value={password}
        onChange={onPasswordChange}
      />
      <div className="button">
        <Button variant="contained" color="primary" onClick={logIn}>
          Login
        </Button>
      </div>
      {error}
      <h4>
        {'Нет аккаунта? '}
        <Link to="/register" style={{ textDecoration: 'none' }}>
          Register
        </Link>
      </h4>
    </div>
  );
};

export default Login;
