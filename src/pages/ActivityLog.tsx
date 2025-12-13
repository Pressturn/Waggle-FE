import { useEffect, useState } from 'react'
import activityService, { type Activity } from "../services/activityService"
import LogFeedingModal from '../components/Activity/LogFeedingModal'
import LogWalkPlayModal from '../components/Activity/LogWalkPlayModal'
import LogWaterModal from '../components/Activity/LogWaterModal'
import LogMedicationModal from '../components/Activity/LogMedicationModal'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import dogService from '../services/dogService'
import ActivityCard from '../components/Activity/ActivityCard'

function ActivityLog() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [showLogFeedingModal, setShowLogFeedingModal] = useState(false)
  const [showLogWalkPlayModal, setShowLogWalkPlayModal] = useState(false)
  const [showLogWaterModal, setShowLogWaterModal] = useState(false)
  const [showLogMedicationModal, setShowLogMedicationModal] = useState(false)
  const [dogs, setDogs] = useState<any[]>([])

  useEffect(() => {
    fetchActivities()
    fetchDogs()
  }, [])

  const fetchActivities = async () => {
    try {
      const data = await activityService.getAll()
      setActivities(data.activities)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to fetch activities')
    } finally {
      setLoading(false)
    }
  }

  const fetchDogs = async () => {
    try {
      const data = await dogService.getAll()
      setDogs(data.dogs)
    } catch (error) {
      console.error('Failed to fetch dogs:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex justify-between items-start mb-8">
        <div>

          <h1 className="text-4xl font-semibold text-gray-700"> Activity Log</h1>
          <p className="text-gray-400 mt-2">View and filter all care activities.</p>
        </div>

        <Menu as="div" className="relative">
          <MenuButton className="bg-blue-400 text-white px-5 py-2.5 rounded-lg hover:bg-blue-500 transition flex items-center gap-2">
            + Log Activity
            <span className="text-sm">▼</span>
          </MenuButton>

          <MenuItems className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-200 p-2 focus:outline-none z-10">

            <MenuItem>
              {({ focus }) => (
                <button
                  onClick={() => setShowLogFeedingModal(true)}
                  className={`w-full text-left px-4 py-2 rounded-lg transition ${focus ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                    }`}
                >
                  Log Feeding
                </button>
              )}
            </MenuItem>

            <MenuItem>
              {({ focus }) => (
                <button
                  onClick={() => setShowLogWalkPlayModal(true)}
                  className={`w-full text-left px-4 py-2 rounded-lg transition ${focus ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                    }`}
                >
                  Log Walk/Play
                </button>
              )}
            </MenuItem>

            <MenuItem>
              {({ focus }) => (
                <button
                  onClick={() => setShowLogWaterModal(true)}
                  className={`w-full text-left px-4 py-2 rounded-lg ${focus ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                    }`}
                >
                  Log Water
                </button>
              )}
            </MenuItem>

            <MenuItem>
              {({ focus }) => (
                <button
                  onClick={() => setShowLogMedicationModal(true)}
                  className={`w-full text-left px-4 py-2 rounded-lg transition ${focus ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                    }`}
                >
                  Log Medication
                </button>
              )}
            </MenuItem>
          </MenuItems>
        </Menu>
      </div>


      {loading && <p className="text-gray-600">Loading activities...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      <div className="space-y-4">
        {activities.map(activity => (
          <ActivityCard
            key={activity.id}
            activity={activity}
          />

        ))}
      </div>

      <LogFeedingModal
        isOpen={showLogFeedingModal}
        onClose={() => setShowLogFeedingModal(false)}
        onFeedingLogged={() => {
          fetchActivities()
          setShowLogFeedingModal(false)
        }}
        dogId={dogs.length > 0 ? dogs[0].id : ''}
      />

      <LogWalkPlayModal
        isOpen={showLogWalkPlayModal}
        onClose={() => setShowLogWalkPlayModal(false)}
        onWalkPlayLogged={() => {
          console.log('Walk/Play logged!')
          fetchActivities()
          setShowLogWalkPlayModal(false)
        }}
        dogId={dogs.length > 0 ? dogs[0].id : ''}
      />

      <LogWaterModal
        isOpen={showLogWaterModal}
        onClose={() => setShowLogWaterModal(false)}
        onWaterLogged={() => {
          fetchActivities()
          setShowLogWaterModal(false)
        }}
        dogId={dogs.length > 0 ? dogs[0].id : ''}
      />

      <LogMedicationModal
        isOpen={showLogMedicationModal}
        onClose={() => setShowLogMedicationModal(false)}
        onMedicationLogged={() => {
          fetchActivities()
          setShowLogMedicationModal(false)
        }}
        dogId={dogs.length > 0 ? dogs[0].id : ''}
      />
    </div >
  )
}

export default ActivityLog