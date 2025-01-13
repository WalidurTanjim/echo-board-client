import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import MainLayout from './layout/MainLayout'
import Home from './pages/Home/Home/Home'
import ErrorPage from './pages/ErrorPage/ErrorPage'
import SignIn from './authentication/SignIn/SignIn'
import SignUp from './authentication/SignUp/SignUp'

function App() {
  const routes = createBrowserRouter([
    {path: '/', element: <MainLayout />, errorElement: <ErrorPage />, children: [
      {path: '/', element: <Home />},
      {path: 'sign-in', element: <SignIn />},
      {path: 'sign-up', element: <SignUp />}
    ]}
  ])

  return <RouterProvider router={routes} />
}

export default App
