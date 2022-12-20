import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { App } from '~app/App';
import { TaskService } from '~app/services/TaskService';
import { store } from '~app/store';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('app') as HTMLElement);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <TaskService />
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
);

reportWebVitals();
