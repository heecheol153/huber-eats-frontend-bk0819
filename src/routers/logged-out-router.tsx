import React from 'react';
import { Switch } from 'react-router-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { CreateAccount } from '../pages/create-account';
import { Login } from '../pages/login';

export const LoggedOutRouter = () => {
  return (
    <Router>
      <Switch>
        <Route path='/create-account'>
          <CreateAccount />
        </Route>
        <Route path='/'>
          <Login />
        </Route>
      </Switch>
    </Router>
  );
};
