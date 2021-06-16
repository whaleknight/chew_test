import './App.css';


import {Home} from './Home';
import {Account} from './Account';
import {Transfer} from './Transfer';
import {Navigation} from './Navigation';

import {BrowserRouter, Route, Switch} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
    <div className="container">
     <h3 className="m-3 d-flex justify-content-center">
       Chew Test Account Transfer
     </h3>

     <Navigation/>

     <Switch>
       <Route path='/' component={Home} exact/>
       <Route path='/account' component={Account}/>
       <Route path='/transfer' component={Transfer}/>
     </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
