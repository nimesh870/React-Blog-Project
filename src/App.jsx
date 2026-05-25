import { useState , useEffect } from 'react'
import { useDispatch } from 'react-redux'
import authService from './appwrite_services/authentication'
import {login , logout} from './features/authSlice'
import {Header , Footer} from './components'
import { Outlet } from 'react-router-dom'

function App() {
  
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect( () => {
    authService.getUser()
    .then( (userData) =>{
      if (userData) {
        dispatch(login({
          $id : userData.$id,
          name : userData.name,
          email : userData.email
        })) // dispatch data to store
      }
      else {
        dispatch(logout())
      }
    })
    .finally( () => setLoading(false))
  }, [])

  return !loading ? (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
        <Outlet />
        <Footer />
      </div>
    </div>
  ) : (null)
}

export default App