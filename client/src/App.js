import { Provider } from 'react-redux';
import { store } from './store';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/elements/Navbar';

import './main.scss';
import MenuCard from './components/elements/MenuCard';

import speechbubble from './assets/icons/speechbubble-icon.png';
import book from './assets/icons/book-icon.png';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="window">
          <Navbar authenticated={true} username="username" />
          <MenuCard icon={speechbubble} title="Conjugation" bigger />
          <MenuCard icon={book} title="Vocabulary" />
          <Switch>

          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
