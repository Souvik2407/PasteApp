import { useState } from 'react'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import './App.css'
import Navbar from './Components/Navbar'
import Home from './Components/Home'
import Paste from './Components/Paste'
import ViewPaste from './Components/ViewPaste'

const router = createBrowserRouter(
  [
    {
      path: "/",
      element :
      <div>
        <Navbar/>
        <Home/>
      </div>
        },

        {
      path: "/pastes",
      element :
      <div>
      <Navbar/>
      <Paste/>
      </div>
        },

        {
      path: "/pastes/:id",
      element :
      <div>
      <Navbar/>
      <ViewPaste/> 
      </div>
        },

  ]
)

function App() {
  

  return (
    <div>
      <RouterProvider router={router}>
        
      </RouterProvider>
    </div>
  )
}

export default App
