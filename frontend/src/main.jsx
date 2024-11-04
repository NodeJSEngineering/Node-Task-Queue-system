import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {NextUIProvider} from '@nextui-org/react'
import App from './App.jsx'
import {createBrowserRouter , RouterProvider} from "react-router-dom"
import './index.css'
import { AuthProvider } from './context/Authcontext.jsx'
import ErrorPage from './pages/Errorpage.jsx'
import Register from './pages/Regitserpage.jsx'
import Login from './pages/Loginpage.jsx'
import TaskQueue from './pages/AddTask.jsx'
import AllTasks from './pages/Taskpage.jsx'
import NewTask from './pages/NewTask.jsx'
import TaskDetail from './pages/TaskDetail.jsx'
import PrivateRoute from './utils/UserAuthorization.jsx'
import MyTasks from './pages/MyTasks.jsx'
import RequestTask from './pages/RequestTask.jsx'


const router = createBrowserRouter([
  {
    path:"/",
    element:<App/>,
    errorElement:<ErrorPage/>,
    children:[
      {
        path:"",
        element:<AllTasks/>
      },
      {
        path:"register",
        element:<Register/>
      },
      {
        path:"login",
        element:<Login/>
      },
      {
        path:"queuetask",
        element:<PrivateRoute><TaskQueue/></PrivateRoute>
      },
      {
        path:"newtask",
        element:<PrivateRoute><NewTask/></PrivateRoute>
      },
      {
        path:"taskDetail/:taskId",
        element:<PrivateRoute><TaskDetail/></PrivateRoute>
      },
      {
        path:"mytask",
        element:<PrivateRoute><MyTasks/></PrivateRoute>
      },
      {
        path:"requesttask/:taskId",
        element:<PrivateRoute><RequestTask/></PrivateRoute>
      }
    ]
  },
  
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}>
          <NextUIProvider>
            <App />
          </NextUIProvider>
      </RouterProvider>
    </AuthProvider>
  </StrictMode>,
)
