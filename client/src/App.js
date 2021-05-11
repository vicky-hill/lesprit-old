import { Provider } from 'react-redux';
import { store } from './store';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/elements/Navbar';

import './main.scss';

function App() {
  return (
    <Provider store={store}>
      <Router>
          <Navbar authenticated={true} username="username" />
            <Switch>
              {/* <Route exact path='/register' component={Register} /> */}
              {/* <Route exact path='/register' component={Login} /> */}
            </Switch>
      </Router>
    </Provider>
  );
}

export default App;
