import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import firebase from 'firebase';
import AppLoading from './AppLoading';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import Confirm from './pages/Confirm/Confirm';
import Home from './pages/Home/Home';
import Graph from './pages/Graph/Graph';
import Gallery from './pages/Gallery/Gallery';

const App = (): JSX.Element => {
  const [user, setUser] = useState<boolean>(false);
  const [toLogin, setToLogin] = useState<boolean>(false);
  const [toConfirm, setToConfirm] = useState<boolean>(false);
  useEffect(() => {
    firebase.auth().onAuthStateChanged((u) => {
      if (u === null) {
        setToLogin(true);
      } else if (u.emailVerified) {
        setUser(true);
      } else {
        setToConfirm(true);
        setUser(false);
      }
    });
  }, []);
  return (
    <Router>
      <Switch>
        {user && <Route path="/home" component={Home} />}
        {user && <Route path="/graphs" component={Graph} />}
        {user && <Route path="/gallery" component={Gallery} />}
        <Route exact path="/" component={AppLoading} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        {user && <Route path="/confirm" component={Confirm} /> && <Redirect to="/home" />}
        {toConfirm && <Route path="/confirm" component={Confirm} />}
        {toLogin && <Redirect to="/login" />}
        {toConfirm && <Redirect to="/confirm" />}
      </Switch>
    </Router>
  );
};

export default App;
