import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Loader from './componenets/Loader';
import { useDispatch, useSelector } from 'react-redux';
import Home from './pages/Home';
import { useEffect, useState } from 'react';
import { isAuth } from './functions/authFunctions';
import Opl from './pages/Opl';
import Container from './componenets/Container';
import { Helmet } from 'react-helmet';  
import Exit from './pages/Exit';
import Name from './pages/Entry/Name';
import VisitorMail from './pages/Entry/VisitorMail';
import Card from './pages/Entry/Card';
import FinalCheck from './pages/Entry/FinalCheck';


function App() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth);
  const [loading, setLoading] = useState(true);  // State to track loading
const navigate = useNavigate()
  useEffect(() => {
    const checkAuth = async () => {
      await isAuth(dispatch, navigate);
      setLoading(false);  // Set loading to false once the authentication check is complete
    };
    
    checkAuth();
  }, [dispatch]);

  if (loading) {
    return <Loader />;  // Show a loading spinner or your `Loader` component while waiting
  }

  return (
    <Routes>
      <Route path='/' element={user.auth ? <Home /> : <Navigate to="/opl" />} />
      <Route path='/o/name' element={user.auth ? <Name /> : <Navigate to="/opl" />} />
      <Route path='/o/email' element={user.auth ? <VisitorMail  /> : <Navigate to="/opl" />} />
      <Route path='/o/card' element={user.auth ? <Card  /> : <Navigate to="/opl" />} />
      <Route path='/o/finalCheck' element={user.auth ? <FinalCheck  /> : <Navigate to="/opl" />} />
      <Route path='/o/exit' element={user.auth ? <Exit /> : <Navigate to="/opl" />} />
      <Route path='/opl' element={<Opl />} />
      <Route path='*' element={<Container>
        <Helmet>
          <title>404 | Page not found</title>
        </Helmet>
        <h2>404 | Page not found</h2>
      </Container>} />
      {/* Add a route for the Logout component */}
      {/* <Route path="/opl" element={<Logout />} /> */}
    </Routes>
  );
}

export default App;
