import MainLayout from './layouts/MainLayout'
import { Routes, Route, Navigate } from 'react-router-dom'
import ActivityLog from './pages/ActivityLog'
import Dashboard from './pages/Dashboard'
import Login from './pages/Login'
import Pets from './pages/Pets'
import Signup from './pages/Signup'
import PetDetails from './pages/ManagePet'


function App() {
  return (
    <Routes>

      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route path="/" element={<MainLayout><Dashboard /></MainLayout>} />
      <Route path="/pets" element={<MainLayout><Pets /></MainLayout>} />
      <Route path="/pets/:dogId" element={<MainLayout><PetDetails /></MainLayout>} />
      <Route path="/activity" element={<MainLayout><ActivityLog /></MainLayout>} />

      <Route path="*" element={<Navigate to="/" />} />

    </Routes>
  )
}

export default App
