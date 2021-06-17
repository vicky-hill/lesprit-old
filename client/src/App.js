
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';

import Navbar from './components/elements/Navbar';
import Vocabulary from './components/pages/Vocabulary';
import Login from './components/pages/Login';

import './main.scss';

import Home from './components/pages/Home';
import Register from './components/pages/Register';

function App({ isAuthenticated }) {
  return (
      <Router>
        <div className="window">
          <Navbar authenticated={isAuthenticated} username="username" />
          <Switch>
            <Route exact path='/' component={Home} />
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
