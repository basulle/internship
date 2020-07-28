import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import firebase from 'firebase';
import { useDispatch } from 'react-redux';
import { signInAction } from './core/actions/signInAction';
import { testState } from './core/selectors/signIn';

const AppLoading = (): JSX.Element => {
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        if (user.emailVerified) {
          dispatch(signInAction(user.uid));
          history.push('/home');
        } else {
          user.sendEmailVerification();
          history.push('/confirm');
        }
      } else {
        history.push('/login');
      }
    });
  }, [history, dispatch]);

  return null;
};

export default AppLoading;
