import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import {createBrowserRouter, RouterProvider} from "react-router-dom"

import HomePage from './pages/Home.jsx'
import NotFoundPage from './pages/NotFound.jsx'

const router = createBrowserRouter([
  {
    path:"/",
    element: <HomePage />
  },
  {
    path: "*",
    element: <NotFoundPage />
  }
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router = {router} />
  </StrictMode>,
)
