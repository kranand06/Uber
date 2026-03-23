import React from 'react'
import { NavLink } from 'react-router-dom'

const ProfilePage = () => {
    return (
        <div>
            <h1>Profile Page</h1>
            <NavLink to="/main" className="mt-6 block w-full text-center bg-black text-white py-3 rounded-xl text-lg font-medium hover:bg-gray-800 transition">
                Go to Home
            </NavLink>
            <NavLink to="/logout" className="mt-6 block w-full text-center bg-black text-white py-3 rounded-xl text-lg font-medium hover:bg-gray-800 transition">
                Logout
            </NavLink>

        </div>
    )
}

export default ProfilePage