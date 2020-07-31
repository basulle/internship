import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AppLoading from './AppLoading';
import Register from './pages/Register/Register';
import Login from './pages/Login/Login';
import Confirm from './pages/Confirm/Confirm';
import Home from './pages/Home/Home';
import Graph from './pages/Graph/Graph';

const App = (): JSX.Element => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={AppLoading} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/home" component={Home} />
        <Route path="/confirm" component={Confirm} />
        <Route path="/graphs" component={Graph} />
      </Switch>
    </Router>
  );
};

export default App;
