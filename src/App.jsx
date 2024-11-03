import { useEffect, useState } from 'react'
import {useDispatch} from 'react-redux'
import Auth from './Appwrite/Auth/Auth';
import {login, logout} from './store/authSlice'
import { Header,Footer } from './components';
function App() {
  const [loading, setloading] = useState(true);
  const dispatch = useDispatch();
  useEffect(
    ()=>{
      Auth.getCurrentUser()
      .then((userData)=>{
        if(userData){
          dispatch(login({userData}));
        }
        else{
          dispatch(logout());
        }
      })
      .finally(()=>setloading(false))
    },[]);

  return !loading ? (
<div className='min-h-sc flex flex-wrap content-between bg-gray-400 '> 
  <div className='w-full block'>
    <Header />
    <Footer />
  </div>
</div>
  ) : null
}

export default App
