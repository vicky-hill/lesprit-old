import { Provider } from 'react-redux';
import { store } from './store';

import './main.scss';

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <h1>Linguar</h1>
      </div>
    </Provider>
  );
}

export default App;
