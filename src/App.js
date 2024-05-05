import React from 'react';
import Body from './components/Body';
import { Toaster } from 'react-hot-toast';
import { Provider } from 'react-redux';
import appStore from './utils/appStore';

function App() {
  return (
    <div>
      <Provider store={appStore}>
        <Body />
      </Provider>
      <Toaster />
    </div>
  );
}

export default App;
