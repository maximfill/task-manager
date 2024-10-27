import React from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './services/store';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import App from './components/App/App';
import reportWebVitals from './reportWebVitals';

const container = document.getElementById('root');

if (container) {
  const root = createRoot(container);

  root.render(
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<App />} />
        </Routes>
      </Router>
    </Provider>
  );

  reportWebVitals();
} else {
  console.error('Element with ID "root" not found');
}
