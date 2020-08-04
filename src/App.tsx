import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import firebase from 'firebase';
import AppLoading from './AppLoading';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import Confirm from './pages/Confirm/Confirm';
import Home from './pages/Home/Home';
import Graph from './pages/Graph/Graph';

const App = (): JSX.Element => {
  const [user, setUser] = useState<boolean>(false);
  useEffect(() => {
    firebase.auth().onAuthStateChanged((u) => {
      if (u) {
        setUser(true);
      } else {
        setUser(false);
      }
    });
  }, []);

  if (user) {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={AppLoading} />
          <Route path="/home" component={Home} />
          <Route path="/confirm" component={Confirm} />
          <Route path="/graphs" component={Graph} />
        </Switch>
      </Router>
    );
  }
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={AppLoading} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Switch>
    </Router>
  );
};

export default App;
