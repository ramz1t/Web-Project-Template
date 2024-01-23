import { createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'
import { getCookie } from '../utils'
import { useQueryClient } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

const AuthContext = createContext()

export default AuthContext

export const AuthProvider = ({ children }) => {
    const { i18n } = useTranslation()
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const [authTokens, setAuthTokens] = useState(() =>
        localStorage.getItem('authTokens')
            ? JSON.parse(localStorage.getItem('authTokens'))
            : null
    )

    const [user, setUser] = useState(() =>
        localStorage.getItem('authTokens')
            ? jwtDecode(localStorage.getItem('authTokens'))
            : null
    )

    const loginUser = async ({ email, password, redirectFrom }, setError) => {
        fetch(
            '/api/v1/auth/jwt/create',
            {
                method: 'POST',
                headers: {
                    accept: 'application/json',
                    'Content-Type': 'application/json',
                    'Accept-Language': i18n.resolvedLanguage,
                },
            },
            JSON.stringify({ email, password })
        )
            .then((res) => {
                setAuthTokens(res.data)
                localStorage.setItem('authTokens', JSON.stringify(res.data))
                navigate(redirectFrom)
            })
            .catch((err) => {
                setError({
                    status: err.response.status,
                    message: err.response.data,
                })
                alert(err.response.status)
            })
    }

    const registerUser = (user, setError) => {
        fetch(
            '/api/v1/users/',
            {
                method: 'POST',
                headers: {
                    accept: 'application/json',
                    'Content-Type': 'application/json',
                    'X-CSRFToken': getCookie('csrftoken'),
                    'Accept-Language': i18n.resolvedLanguage,
                },
            },
            JSON.stringify(user)
        )
            .then((res) => {
                notification(res.data.message)
                loginUser({
                    email: user.email,
                    password: user.password,
                    redirectFrom: '/users/me',
                })
            })
            .catch((err) => setError(err))
    }

    const logoutUser = () => {
        setAuthTokens(null)
        setUser(null)
        queryClient.clear()
        localStorage.removeItem('authTokens')
        navigate('/login')
    }

    const contextData = {
        user,
        setUser,
        loginUser,
        registerUser,
        authTokens,
        setAuthTokens,
        logoutUser,
    }

    useEffect(() => {
        if (authTokens) {
            setUser(jwtDecode(authTokens.access))
        }
    }, [authTokens])

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    )
}
