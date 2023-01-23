import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Authorization from './Components/Authorization';
import Client from './Components/Client';
import Main from './Components/Main';
import Product from './Components/Product';
import Signup from './Components/Signup';
import History from './Components/History';
import Profile from './Components/Profile';
import Keys from './Components/Keys';
import Transaction from './Components/Transaction';
import { Api } from './api/api';

function App() {
  const [ isAuthorized, setIsAuthorized ] = useState(false)

  useEffect(() => {
    document.title = 'plati.market';
    const token = localStorage.getItem('jwt')
    
    if (token) {
      Api.get('seller/me').then(r => setIsAuthorized(true)).catch(e => {
        setIsAuthorized(false)
        localStorage.deleteItem('jwt')
      })

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
          <Route path='/seller/products/:id/keys/:sid' element={<Keys />} />
          <Route path='/seller/history/' element={<History />} />
          <Route path='/seller/history/transaction/:id' element={<Transaction />} />
          <Route path='/profile/' element={<Profile />} />
          <Route path='/product/:username' element={<Client />} />
        
        </Routes>
        : 
        
        <Routes>

          <Route path='/signin' element={<Authorization />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/product/:username' element={<Client />} />
        
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
