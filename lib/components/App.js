
import React from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import InputId from './InputId';
import UserInfo from './UserInfo';
import Welcome from './Welcome';

const App = () => (
  <Router>
    <div>
      <Route exact path="/" component={InputId} />
      <Route exact path="/userInfo" component={UserInfo} />
      <Route exact path="/welcome" component={Welcome} />
    </div>
  </Router>
);


export default App;
