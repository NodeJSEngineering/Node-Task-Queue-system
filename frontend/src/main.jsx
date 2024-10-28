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
        element:<TaskQueue/>
      },
      {
        path:"newtask",
        element:<NewTask/>
      },
      {
        path:"taskDetail/:taskId",
        element:<TaskDetail/>
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
