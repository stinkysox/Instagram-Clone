import './App.css'
import {Switch, Route} from 'react-router-dom'
import LoginRoute from './components/LoginRoute'
import ProtectedRoute from './components/ProtectedRoute'
import Home from './components/HomeRoute'
import UserDetails from './components/UserDetails'
import MyProfile from './components/MyProfile'
import NotFound from './components/NotFound'

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginRoute} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/users/:id" component={UserDetails} />
    <ProtectedRoute exact path="/my-profile" component={MyProfile} />
    <Route component={NotFound} />
  </Switch>
)

export default App
