import { useEffect, useState } from 'react'
import activityService, { Activity } from "../services/activityService"
import { format, parseISO } from 'date-fns'
import LogFeedingModal from '../components/Activity/LogFeedingModal'
import LogWalkPlayModal from '../components/Activity/LogWalkPlayModal'
import LogWaterModal from '../components/Activity/LogWaterModal'
import LogMedicationModal from '../components/Activity/LogMedicationModal'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import dogService from '../services/dogService'

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

  const formatDate = (dateString: string) => {
    try {
      const date = parseISO(dateString)
      return format(date, 'dd MMM, yyyy')
    } catch {
      return dateString
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
          <div key={activity.id} className="bg-white rounded-2xl shadow-sm p-6 border border-gray-200">
            <div className="flex justify-between items-start">
              <div>

                <div className="flex gap-4 mb-2">
                  {activity.date && <p className="text-sm text-gray-500">Date: {formatDate(activity.date)}</p>}
                  {activity.time && <p className="text-sm text-gray-500" >Time: {activity.time}</p>}
                </div>

                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                  {activity.type}
                </h3>

                {activity.type === 'MEAL' && (
                  <div className="text-gray-600">
                    {activity.foodType && <p>Food Type:{activity.foodType}</p>}
                    {activity.portion && <p> Portion: {activity.portion}</p>}
                  </div>
                )}

                {(activity.type === 'WALK' || activity.type === 'PLAY') && (
                  <div className="text-gray-600">
                    {activity.activityKind && <p>Activity Kind: {activity.activityKind}</p>}
                  </div>
                )}

                {activity.type === 'MEDICATION' && (
                  <div className="text-gray-600">
                    {activity.medication && <p>Activity Medication: {activity.medication}</p>}
                  </div>
                )}

                {activity.notes && <p className="text-gray-600 mt-2" >Notes: {activity.notes}</p>}
              </div>

              <div className="flex flex-col items-end gap-2">
                <span className={`px-4 py-1.5 rounded-full text-sm font-medium ${activity.type === 'MEAL' ? 'bg-orange-100 text-orange-600' :
                  activity.type === 'WALK' ? 'bg-green-100 text-green-600' :
                    activity.type === 'PLAY' ? 'bg-green-100 text-green-600' :
                      activity.type === 'WATER' ? 'bg-blue-100 text-blue-600' :
                        'bg-purple-100 text-purple-600'
                  }`}>
                  {activity.type === 'MEAL' ? 'Food' :
                    activity.type === 'WALK' ? 'Walk' :
                      activity.type === 'PLAY' ? 'Play' :
                        activity.type === 'WATER' ? 'Water' :
                          'Medication'}
                </span>

                {activity.dog && <p className="text-gray-600 text-sm">Dog: {activity.dog.name}</p>}
                {activity.loggedBy && <p className="text-gray-400 text-sm">Logged by: {activity.loggedBy.name}</p>}

              </div>
            </div>
          </div>
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