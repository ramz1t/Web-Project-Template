import React, { useContext } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import AuthContext from '../../contexts/AuthProvider'

const PrivateRoute = ({ children }) => {
    const { user } = useContext(AuthContext)

    return (
        <>
            {user ? (
                children ? (
                    children
                ) : (
                    <Outlet />
                )
            ) : (
                <div className="flex h-full flex-col items-center justify-center gap-5">
                    No access to route without active auth
                    <NavLink
                        to={`/login?redirectFrom=${window.location.pathname}`}
                    >
                        Login
                    </NavLink>
                </div>
            )}
        </>
    )
}

export default PrivateRoute
