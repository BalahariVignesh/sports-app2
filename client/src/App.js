import React, {Component} from 'react';
import AppNavBar from './components/AppHome';
import EventList from './components/EventList';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';

import EventModal from './components/eventModal';

import {Container} from 'reactstrap';

import { Provider } from 'react-redux';
import store from './store';

import {loadUser} from'./actions/authActions';

class App extends Component {
  componentDidMount(){
    store.dispatch(loadUser());
    
  }
  render(){
    return (
      <Provider store ={store} >
      
        <div className="App">
          <header className="App-header">
            <AppNavBar/> 
            <Container>
              <EventModal/>
              <EventList/>
            </Container>
           
        
          </header>
        </div>
      </Provider>
    );
  }
  
}

export default App;