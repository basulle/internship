import React, { useCallback, useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { TextField, Button } from '@material-ui/core';
import firebase from 'firebase';
import { useSelector, useDispatch } from 'react-redux';
import { signInAction } from '../../core/actions/signInAction';
import { testState } from '../../core/selectors/signIn';

const Login = (): JSX.Element => {
  const test = useSelector(testState);
  const dispatch = useDispatch();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const history = useHistory();
  const logIn = useCallback(() => {
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => dispatch(signInAction('')))
      .then(() => history.push('/'));
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
