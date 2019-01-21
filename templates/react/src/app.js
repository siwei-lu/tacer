// @flow
import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Index from './pages/Index'

const App = () => (
  <Router>
    <Switch>
      <Route path="/" component={Index} exact />
    </Switch>
  </Router>
)

export default <App />