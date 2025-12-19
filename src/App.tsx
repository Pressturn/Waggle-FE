import MainLayout from './layouts/MainLayout'
import { Routes, Route, Navigate } from 'react-router-dom'
import ActivityLog from './pages/ActivityLog'
import Dashboard from './pages/Dashboard'
import Signin from './pages/Signin'
import Pets from './pages/Pets'
import Signup from './pages/Signup'
import PetDetails from './pages/ManagePet'
import ProtectedRoute from './routes/ProtectedRoute'
import Caregivers from './pages/Caregivers'
import Settings from './pages/Settings'

function App() {
  return (
    <Routes>

      <Route path="/signin" element={<Signin />} />
      <Route path="/signup" element={<Signup />} />

      <Route path="/"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Dashboard />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route path="/"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Dashboard />
            </MainLayout>
          </ProtectedRoute >
        }
      />

      <Route path="/activity"
        element={
          <ProtectedRoute>
            <MainLayout>
              <ActivityLog />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      < Route path="/pets"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Pets />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route path="/pets/:dogId"
        element={
          <ProtectedRoute>
            <MainLayout>
              <PetDetails />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route path="/caregivers"
        element={
          <ProtectedRoute>
            <MainLayout>
              <Caregivers />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route path='/settings'
        element={
          <ProtectedRoute>
            <MainLayout>
              <Settings />
            </MainLayout>
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" />} />

    </Routes>
  )
}

export default App
