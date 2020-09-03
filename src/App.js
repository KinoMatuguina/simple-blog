import React, { Fragment, createContext } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import ViewAll from './Pages/ViewAll';
import Create from './Pages/Create'
import View from './Pages/View'
import { StateProvider } from './Store/Store';
import Blogs from './Model/Blogs'

export default function App() {
  return (
    <StateProvider value={Blogs}>
      <Fragment>
          <Router>
              <Switch>
                <Route exact path="/">
                  <ViewAll />
                </Route>
                <Route exact path="/view/:id">
                  <View />
                </Route>
                <Route exact path="/create" children={<Create />} />
                <Route path="/create/:id" children={<Create />} />
              </Switch>
          </Router>
      </Fragment>
    </StateProvider>
  );
}
