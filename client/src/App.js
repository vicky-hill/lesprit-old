import { Provider } from 'react-redux';
import { store } from './store';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/elements/Navbar';

import './main.scss';
import MenuCard from './components/elements/MenuCard';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="window">
          <Navbar authenticated={true} username="username" />
          <Switch>

          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
