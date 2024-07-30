import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '../src/App';

document.addEventListener('DOMContentLoaded', () => {
  let rootElement = document.createElement('div');
  rootElement.id = "root";
  document.body.appendChild(rootElement);

  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );

});