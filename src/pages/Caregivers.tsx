import { useState, useEffect } from 'react'
import getUserRole from '../utils/getUserRole'
import api from '../utils/api'
import inviteService from '../services/inviteService'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'

interface Member {
  id: string
  name: string
  role: string
}

function Caregivers() {
  const userRole = getUserRole()
  const [members, setMembers] = useState<Member[]>([])
  const [loading, setLoading] = useState(true)
  const [creatingInvite, setCreatingInvite] = useState(false)
  const [inviteLink, setInviteLink] = useState('')
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    fetchMembers()
  }, [])

  const fetchMembers = async () => {
    try {
      const response = await api.get('/households/members')
      setMembers(response.data.members)
    } catch (error) {
      console.error('Failed to fetch members', error)
    } finally {
      setLoading(false)
    }
  }


  const createInvite = async () => {
    setCreatingInvite(true)
    try {
      const response = await inviteService.create({ role: 'MEMBER' })
      setInviteLink(`${window.location.origin}/signup?code=${response.code}`)
    } catch (error: any) {
      alert(error.response?.data?.message || 'Failed to create invite')
      setShowModal(false)
    } finally {
      setCreatingInvite(false)
    }
  }

  const closeModal = () => {
    setShowModal(false)
    setInviteLink('')
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
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition"
          >
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
                <div className="w-12 h-12 rounded-full bg-blue-300 text-white flex items-center justify-center font-bold">
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

      <Dialog open={showModal} onClose={closeModal} className="relative z-50">

        <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

        <div className="fixed inset-0 flex items-center justify-center p-4">
          <DialogPanel className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
            {!inviteLink ? (
              <>
                <DialogTitle className="text-xl font-semibold mb-4">
                  Create Invite Link
                </DialogTitle>

                <p className="text-gray-600 text-sm mb-6">
                  Generate a link to share with family members.
                </p>

                <div className="flex gap-3">
                  <button
                    onClick={closeModal}
                    disabled={creatingInvite}
                    className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-3 rounded-lg transition disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={createInvite}
                    disabled={creatingInvite}
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-lg transition disabled:bg-blue-300"
                  >
                    {creatingInvite ? 'Creating...' : 'Create'}
                  </button>
                </div>
              </>
            ) : (

              <>
                <DialogTitle className="text-xl font-semibold mb-4">
                  Link Ready!
                </DialogTitle>

                <p className="text-gray-600 text-sm mb-4">
                  Copy the link to sign up
                </p>

                <div className="bg-gray-100 rounded-lg p-3 mb-4">
                  <input
                    value={inviteLink}
                    readOnly
                    className="w-full bg-transparent text-sm font-mono focus:outline-none"
                    onClick={(event) => event.currentTarget.select()}
                  />
                </div>

                <p className="text-xs text-gray-500 mb-6">
                  One time use that expires in 1 hour
                </p>

                <button
                  onClick={closeModal}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-lg transition"
                >
                  Done
                </button>
              </>
            )}
          </DialogPanel>
        </div>
      </Dialog>
    </div>
  )
}


export default Caregivers