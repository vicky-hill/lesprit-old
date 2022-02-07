import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import './main.scss';

import Navbar from './components/elements/Navbar';
import Vocabulary from './pages/Vocabulary';
import Login from './pages/Login';
import Home from './pages/Home';
import Register from './pages/Register';
import Words from './pages/Words';

import PrivateRoute from './components/elements/PrivateRoute';
import { getUser, loginCheck, logout } from 'actions/auth'; 
import { store } from './store';
import Overview from 'pages/Overview';


function App({ isAuthenticated, token }) {
  
  useEffect(() => {
      store.dispatch(getUser());
      store.dispatch(loginCheck());
  }, [token])



  return (
      <Router>
        <div className="window">
          <Navbar authenticated={isAuthenticated} username="username" logout={() => store.dispatch(logout())} />
          <Switch>
            <PrivateRoute exact path='/' component={Home} />
            <Route exact path='/vocabulary' component={Vocabulary} />
            <Route exact path='/vocabulary/:title' component={Words} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/overview' component={Overview} />
          </Switch>
        </div>
      </Router>
  );
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  token: state.auth.token
})

export default connect(mapStateToProps, {})(App);
