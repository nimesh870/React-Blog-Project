import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import {store} from './store/store.js'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { AuthLayout , Signup } from './components/index.js'
import Home from './components/pages/Home.jsx'
import Login from './components/Login.jsx'
import AllPost from './components/pages/AllPost.jsx'
import EditPost from './components/pages/EditPost.jsx'
import UserPost from './components/pages/UserPost.jsx'
import AddPost from './components/pages/AddPost.jsx'

const router = createBrowserRouter([
  {
    path : '/',
    element : <App />,
    children : [
      {
        path : '/',
        element : <Home />
      },

      {
        path : '/login',
        element : (
          <AuthLayout authentication = {false}>
            <Login />
          </AuthLayout>
        )
      },

      {
        path : '/signup',
        element : (
          <AuthLayout authentication={false}>
            <Signup />
          </AuthLayout>
        )
      },

      {
        path: "/all-posts",
        element: (
            <AuthLayout authentication>
              {" "}
              <AllPost />
            </AuthLayout>
          ),
      },

      {
        path: "/edit-post/:slug",
        element: (
            <AuthLayout authentication>
                {" "}
                <EditPost />
            </AuthLayout>
            ),
      },

      {
        path: "/post/:slug",
        element: <UserPost />,
      },

      {
        path: "/add-post",
        element: <AddPost />,
      }

    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
