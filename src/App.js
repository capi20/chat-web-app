import { Route, Routes } from 'react-router';
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
      <Routes>
        <Route path="/signin" element={<PublicRoute path="/signin" element={<SignIn/>}></PublicRoute>}/>
        <Route path="/" element={<PrivateRoute path="/" element={<Home/>}></PrivateRoute>}/>
      </Routes>
    </ProfileProvider>
  )
}

export default App;
