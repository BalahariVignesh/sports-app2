import React from 'react';
import AppNavBar from './components/AppNavBar';
import EventList from './components/EventList';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';

import { Provider } from 'react-redux';
import store from './store';

function App() {
  return (
    <Provider store ={store} >
    
      <div className="App">
        <header className="App-header">
          <AppNavBar/>
          <EventList/>
      
        </header>
      </div>
    </Provider>
  );
}

export default App;