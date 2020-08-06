import React, { useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useHistory, Link } from 'react-router-dom';
import { TextField, Button } from '@material-ui/core';
import { signIn } from '../../core/services/auth';
import { signingIn, signInSuccess, signInError } from '../../core/actions/authActions';

const Login = (): JSX.Element => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const history = useHistory();
  const logIn = useCallback(() => {
    dispatch(signingIn());
    setError('');
    signIn(email, password).then((err) => {
      if (err.message) {
        setError(err.message);
        dispatch(signInError());
      } else if (!err.message) {
        dispatch(signInSuccess());
        history.push('/');
      }
    });
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
