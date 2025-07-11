import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import Layout from './Layout.jsx'
import Home from './components/Home/Home.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import AddContact from './components/AddContact/AddContact.jsx'
import ViewContact from './components/ViewContact/ViewContact.jsx'
import EditContact from './components/EditContact/EditContact.jsx'
import Login from './components/Auth/Login.jsx'
import Registration from './components/Auth/Registeration.jsx'
import AdminPage from './components/AdminPage/AdminPage.jsx'
import AdminRoute from './components/AdminRoute.jsx'
import { GoogleOAuthProvider } from '@react-oauth/google';
const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID; 

const router = createBrowserRouter(
  createRoutesFromElements(
<Route path='/' element={<Layout/>}>
<Route path='' element={<Home/>}/>
<Route path='/addcontact' element={<AddContact/>}/>
<Route path='/viewcontact/:id' element={<ViewContact/>}/>
<Route path='/editcontact/:id' element={<EditContact/>}/>
 <Route path="/login" element={<Login />} />
<Route path="/register" element={<Registration />} />

      {/*Protected Admin Route */}
      <Route
        path="/adminpage"
        element={
          <AdminRoute>
            <AdminPage />
          </AdminRoute>
        }
      />
</Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={clientId}>
      <RouterProvider router={router} />
    </GoogleOAuthProvider>
  </StrictMode>,
)
