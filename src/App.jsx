import { useState , useEffect } from 'react'
import { useDispatch , useSelector } from 'react-redux'
import authService from './appwrite_services/authentication'
import {login , logout} from './features/authSlice'
import {Header , Footer} from './components'
import { Outlet } from 'react-router-dom'
import Toast from './Toast'

function App() {

  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  const toast = useSelector(state => state.toast) // reading everything from store

  useEffect( () => {
    authService.getUser()
    .then( (userData) => {
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
  }, [dispatch])

  return !loading ? (
    <>
      { toast.visible && (<Toast message = {toast.message} type={toast.type}/>) }

      <div className='min-h-screen flex flex-col bg-slate-50'>
        <div className='w-full flex flex-col min-h-screen'>
          <Header />
          <main className='flex-1'>
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    </>
  ) : (null)
}

export default App