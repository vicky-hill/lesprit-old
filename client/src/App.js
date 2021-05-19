import { Provider } from 'react-redux';
import { store } from './store';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Navbar from './components/elements/Navbar';
import Vocabulary from './components/pages/Vocabulary';

import './main.scss';

import Home from './components/pages/Home';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="window">
          <Navbar authenticated={true} username="username" />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/vocabulary' component={Vocabulary} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
