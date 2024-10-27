import React from 'react'
import {createBrowserRouter, RouterProvider} from "react-router-dom"
import Login from './Login'
import Student from './Student'
import Admin from './Admin'
const Body = () => {
    const appRouter=createBrowserRouter([
        {
            path:"/",
            element:<Login/>
        },
        {
            path:"/student",
            element:<Student/>
        },
        {
            path:"/admin",
            element:<Admin/>
        }
    ])
  return (
    <div>   
      <RouterProvider router={appRouter}/>
    </div>
  )
}

export default Body
