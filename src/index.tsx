import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';

import App from './features/App/ui';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <div>
    <App />
  </div>
);

// Hot reloadable translation json files
if (module.hot) {
  module.hot.accept([], () => {});
}
