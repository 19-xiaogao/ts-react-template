import React from 'react'
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import Login from '../Login'
import Home from '../Home'
import { getToken } from '../../utils/session'
import PrivateRoute from '../../components/privateRouter/index'

function App() {

  return (
    <BrowserRouter>
      <Route path="/login" render={() => getToken() ? <Redirect to="/" /> : <Login />} />
      <PrivateRoute path="/" component={Home} />
    </BrowserRouter>
  )
}

export default App;
