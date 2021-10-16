import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import './main.scss';

import Navbar from './components/elements/Navbar';
import Vocabulary from './components/pages/Vocabulary';
import Login from './components/pages/Login';
import Home from './components/pages/Home';
import Register from './components/pages/Register';

import PrivateRoute from './components/elements/PrivateRoute';
import { getUser, loginCheck } from './actions/auth'; 
import { store } from './store';



function App({ isAuthenticated }) {
  
  useEffect(() => {
    store.dispatch(loginCheck());
    store.dispatch(getUser());
  }, [])

  return (
      <Router>
        <div className="window">
          <Navbar authenticated={isAuthenticated} username="username" />
          <Switch>
            <PrivateRoute exact path='/' component={Home} />
            <Route exact path='/vocabulary' component={Vocabulary} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
          </Switch>
        </div>
      </Router>
  );
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, {})(App);
