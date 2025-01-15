import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import MainLayout from './layout/MainLayout'
import Home from './pages/Home/Home/Home'
import ErrorPage from './pages/ErrorPage/ErrorPage'
import SignIn from './authentication/SignIn/SignIn'
import SignUp from './authentication/SignUp/SignUp'
import PostDetails from './pages/PostDetails/PostDetails'
import DashboardLayout from './layout/DashboardLayout'
import MyProfile from './pages/Dashboard/UserDashboard/MyProfile/MyProfile'
import AddPost from './pages/Dashboard/UserDashboard/AddPost/AddPost'
import MyPosts from './pages/Dashboard/UserDashboard/MyPosts/MyPosts'

function App() {
  const routes = createBrowserRouter([
    {path: '/', element: <MainLayout />, errorElement: <ErrorPage />, children: [
      {path: '/', element: <Home />},
      {path: 'post/:id', element: <PostDetails />},
      {path: 'sign-in', element: <SignIn />},
      {path: 'sign-up', element: <SignUp />}
    ]},
    {path: 'dashboard', element: <DashboardLayout />, children: [
      // users dashboard
      {path: 'my-profile', element: <MyProfile />},
      {path: 'add-post', element: <AddPost />},
      {path: 'my-posts', element: <MyPosts />}
    ]}
  ])

  return <RouterProvider router={routes} />
}

export default App
