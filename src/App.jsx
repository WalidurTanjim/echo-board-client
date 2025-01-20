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
import PostReviews from './components/PostReviews/PostReviews'
import ManageUsers from './pages/Dashboard/AdminDashboard/ManageUsers/ManageUsers'
import AdminRoute from './AdminRoute/AdminRoute'
import Announcement from './pages/Dashboard/AdminDashboard/Announcement/Announcement'
import ReportedComments from './pages/Dashboard/AdminDashboard/ReportedComments/ReportedComments'
import AllPosts from './pages/AllPosts/AllPosts'
import AllAnnouncements from './pages/AllAnnouncements/AllAnnouncements'

function App() {
  const routes = createBrowserRouter([
    {path: '/', element: <MainLayout />, errorElement: <ErrorPage />, children: [
      {path: '/', element: <Home />},
      {path: 'all-posts', element: <AllPosts />},
      {path: 'all-announcements', element: <AllAnnouncements />},
      {path: 'post/:id', element: <PostDetails />},
      {path: 'sign-in', element: <SignIn />},
      {path: 'sign-up', element: <SignUp />}
    ]},
    {path: 'dashboard', element: <DashboardLayout />, children: [
      // admin dashboard
      {path: 'manage-users', element: <AdminRoute><ManageUsers /></AdminRoute>},
      {path: 'reported-comments', element: <AdminRoute><ReportedComments /></AdminRoute>},
      {path: 'make-announcement', element: <AdminRoute><Announcement /></AdminRoute>},

      // users dashboard
      {path: 'my-profile', element: <MyProfile />},
      {path: 'add-post', element: <AddPost />},
      {path: 'my-posts', element: <MyPosts />},
      {path: 'comments/:id', element: <PostReviews />}
    ]}
  ])

  return <RouterProvider router={routes} />
}

export default App
