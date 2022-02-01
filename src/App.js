import { Navigate, Route, Routes } from 'react-router';
import 'rsuite/dist/rsuite.min.css'
import SignIn from "./pages/SignIn";
import Home from "./pages/Home";
import './styles/main.scss'

function App() {
  const profile = false
  
  return (
    <Routes>
      <Route path="/signin" element={!profile ? <SignIn/> : <Navigate to="/" />}/>
      <Route path="/" element={profile ? <Home/> : <Navigate to="/signin" />}/>
    </Routes>
  )
}

export default App;
