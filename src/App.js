import { Route, Routes } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './Context/AuthContext';
import Login from './Components/Login';
import Signup from './Components/Signup';
import IncidentList from './Components/IncidentList';

function App() {
  return (
    <AuthProvider>
      {/* <Router> */}
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/incidents" element={<IncidentList />} />
          <Route path="/" exact element={<Login />} />
        </Routes>
      </div>
      {/* </Router> */}
    </AuthProvider>
  );
}

export default App;
