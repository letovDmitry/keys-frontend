import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Authorization from './components/Authorization';
import Client from './components/Client';
import Main from './components/Main';
import Product from './components/Product';
import Signup from './components/Signup';
import Subtype from './components/Subtype';
import logo from './logo.svg';
import History from './components/History';
import Profile from './components/Profile';

function App() {
  const [ isAuthorized, setIsAuthorized ] = useState(false)

  useEffect(() => {
    document.title = 'plati.market';
    const token = localStorage.getItem('jwt')
    
    
    if (token) {
      setIsAuthorized(true)
    } else {
      setIsAuthorized(false)
    }

  }, [])


  return (
    <div className="App">
      { isAuthorized ? 
      
        <Routes>

          <Route path='/seller/products/' element={<Main />} />
          <Route path='/seller/products/:id/' element={<Product />} />
          <Route path='/seller/history/' element={<History />} />
          <Route path='/profile/' element={<Profile />} />
          <Route path='/product/:username/get' element={<Client />} />
        
        </Routes>
        : 
        
        <Routes>

          <Route path='/signin' element={<Authorization />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/product/:username/get' element={<Client />} />
        
        </Routes>
      }

      {/* <Routes>

      <Route path='/seller/products/' element={<Main />} />
      <Route path='/seller/products/:id' element={<Product />} />
      <Route path='/profile/' element={<Profile />} />
      <Route path='/product' element={<Client />} />
      <Route path='/seller/history/' element={<History />} />


      </Routes> */}
    </div>
  );
}

export default App;
