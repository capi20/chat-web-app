import { Route, Switch } from 'react-router';
import 'rsuite/dist/rsuite.min.css'
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import './styles/main.scss'
import { ProfileProvider } from './context/profile.context';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';

function App() {
  return (
    <ProfileProvider>
      <Switch>
        <Route path="/signin">
          <PublicRoute path="/signin"><SignIn/></PublicRoute>
        </Route>
        <Route path="/">
          <PrivateRoute path="/"><Home/></PrivateRoute>
        </Route>
      </Switch>
    </ProfileProvider>
  )
}

export default App;
