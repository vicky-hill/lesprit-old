import { Provider } from 'react-redux';
import { store } from './store';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/elements/Navbar';

import './main.scss';

import Home from './components/pages/Home';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="window">
          <Navbar authenticated={true} username="username" />

          <Home />
          <Switch>

          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
