import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import firebase from 'firebase';
import { useDispatch } from 'react-redux';

const AppLoading = (): JSX.Element => {
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        if (user.emailVerified) {
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
