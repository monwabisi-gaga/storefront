import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './state/store';
import App from './App';
import './styles/global.scss';

// Get the root element from the DOM
const rootElement = document.getElementById('root');

// Check if the root element exists before creating a root and rendering the app
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);

  root.render(
    <Provider store={store}>
      <App />
    </Provider>
  );
} else {
  console.error('Root element not found');
}
