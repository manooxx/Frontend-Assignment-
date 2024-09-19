import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import store from './store/store.js';  // Import the Redux store
import App from './App.jsx';
import './index.css';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>  {/* Wrap the app with the Provider */}
      <App />
    </Provider>
  </StrictMode>,
);