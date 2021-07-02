import './App.css';
import React from 'react';
import { Route } from 'react-router-dom';


import  LandingPage from './modules/LandingPage';
import  Search  from './modules/Search';
import  Detail from './modules/Detail';
import  Create from './modules/Create';
import About from './modules/About';

function App() {
  return (
    <React.Fragment>
        <Route exact path='/' component={LandingPage} />
        <Route path='/home' component={Search} />
        <Route path='/detail/:id' component={Detail} />
        <Route path='/create' component={Create} /> 
        <Route path='/about' component={About} />
    </React.Fragment>
  );
}
export default App;

