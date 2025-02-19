import './App.css';
import Counter from './component/counter';
import RichText from './component/richtext'; 
import UserForm from './component/userdata';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Dashboard from './component/dashboard';
import Navbar from './component/navbar';


function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/counter" element={<Counter />} />
          <Route path="/editor" element={<RichText />} />
          <Route path="/user" element={<UserForm />} />
        </Routes> {/* Closing Routes here */}
      </Router>
    </div>
  );
}

export default App;
