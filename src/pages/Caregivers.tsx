import { useState, useEffect } from 'react'
import getUserRole from '../utils/getUserRole'
import api from '../utils/api'

interface Member {
  id: string
  name: string
  role: string
}

function Caregivers() {
  const userRole = getUserRole()
  const [members, setMembers] = useState<Member[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMembers()
  }, [])

  const fetchMembers = async () => {
    try {
      const response = api.get('/households/members')
      setMembers(response.data.members)
    } catch (error) {
      console.error('Failed to fetch members', error)
    } finally {
      setLoading(false)
    }
  }
  
  if (loading) return <p className="p-8">Loading...</p>

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-4xl font-semibold text-gray-800">Household Caregivers</h1>
          <p className="text-gray-500 mt-2">Manage your household members</p>
        </div>

        {userRole === 'OWNER' && (
          <button className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition">
            Invite Caregiver
          </button>
        )}
      </div>

      <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
        <h2 className="text-xl font-semibold mb-4">Members ({members.length})</h2>

        <div className="space-y-3">
          {members.map(member => (
            <div key={member.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
              <div className="flex items-center gap-4">

                <div className="w-12 h-12 rounded-full bg-blue-500 text-white flex items-center justify-center font-bold">
                  {member.name.charAt(0).toUpperCase()}
                </div>

                <div>
                  <p className="font-semibold text-gray-800">{member.name}</p>
                  <p className="text-sm text-gray-500">
                    {member.role === 'OWNER' ? 'Household Owner' : 'Family Member'}
                  </p>
                </div>
              </div>

              <span className={`px-4 py-1 rounded-full text-sm font-medium ${member.role === 'OWNER'
                ? 'bg-blue-100 text-blue-700'
                : 'bg-green-100 text-green-700'
                }`}>
                {member.role}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Caregivers