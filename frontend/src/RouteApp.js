import React from 'react'
import { Redirect ,Route , Switch ,BrowserRouter } from 'react-router-dom'
import Home from './admin/Home'
import App from './App'
import Header from './layout/Header'
import MHome from './mutfak/Home'
import PHome from './personal/Home'
import MasaSiparisEkle from './personal/MasaSiparisEkle'

const RouteApp = () => {
  return (
    <BrowserRouter>
        <Header  />
        <Switch>
            <Route exact path='/'>
                <Redirect to='/home' />
            </Route>
            <Route path='/home' component={App} />
            <Route exact path='/admin/home' component={Home} />
            <Route exact path='/personel/home' component={PHome} />
            <Route exact path='/mutfak/home' component={MHome} />
            <Route exact path='/personel/masa/siparis-ver/:name' component={MasaSiparisEkle} />
        </Switch>
    </BrowserRouter>
  )
}

export default RouteApp