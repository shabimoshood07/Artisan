import React from 'react'
import {selectLoggedInStatus} from '../authSlice/authSlice'
import { useSelector } from 'react-redux'
 import { Navigate, useLocation, Outlet} from 'react-router-dom'
const ProtectedRoute = () => {
    const location = useLocation()
    const isLoggedIn = useSelector(selectLoggedInStatus)


    return (
        isLoggedIn
            ? <Outlet />
            : <Navigate to="/login" state={{ from: location }} replace />
    )
}

export default ProtectedRoute