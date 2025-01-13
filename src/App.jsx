import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import MainLayout from './layout/MainLayout'
import Home from './pages/Home/Home/Home'
import ErrorPage from './pages/ErrorPage/ErrorPage'

function App() {
  const routes = createBrowserRouter([
    {path: '/', element: <MainLayout />, errorElement: <ErrorPage />, children: [
      {path: '/', element: <Home />}
    ]}
  ])

  return <RouterProvider router={routes} />
}

export default App
