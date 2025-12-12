import { Navigate } from 'react-router-dom'
import authService from '../services/authService'
import React from 'react'

interface ProtectedRouteProps {
    children: React.ReactNode
}
function ProtectedRoute({ children }: ProtectedRouteProps) {
    if (!authService.isAuthenticated()) {
        return <Navigate to="/login" replace />
    }

    return <> {children}</>
}

export default ProtectedRoute