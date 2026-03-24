import React from 'react'
import { NavLink } from 'react-router-dom'

const DriverHome = () => {
  return (
    <div>
        <NavLink to="/logout" className="mt-6 block w-full text-center bg-black text-white py-3 rounded-xl text-lg font-medium hover:bg-gray-800 transition">
          Logout
      </NavLink>
    </div>
  )
}

export default DriverHome