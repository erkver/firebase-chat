import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './views/Home/Home';
import Login from './views/Login/Login';
import Username from './views/Username/Username';

export default (
  <Switch>
    <Route path="/" exact component={Login} />
    <Route path="/home" component={Home} />
    <Route path="/username" component={Username} />
  </Switch>
);
