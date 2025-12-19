import { useEffect, useState } from 'react'
import activityService, { type Activity } from "../services/activityService"
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import dogService from '../services/dogService'
import ActivityCard from '../components/Activity/ActivityCard'
import ActivityModalManager from '../components/Activity/ActivityModalManager'
import { useActivities } from '../hooks/useActivities'

function ActivityLog() {
  const { activities, loading, error, fetchActivities } = useActivities()
  const [showLogWaterModal, setShowLogWaterModal] = useState(false)
  const [showLogFeedingModal, setShowLogFeedingModal] = useState(false)
  const [showLogWalkPlayModal, setShowLogWalkPlayModal] = useState(false)
  const [showLogMedicationModal, setShowLogMedicationModal] = useState(false)
  const [dogs, setDogs] = useState<any[]>([])
  const [editingActivity, setEditingActivity] = useState<Activity | null>(null)
  const [selectDogId, setSelectDogId] = useState<string>('')

  const fetchDogs = async () => {
    try {
      const data = await dogService.getAll()
      setDogs(data.dogs)

      if (data.dogs.length > 0 && !selectDogId) {
        setSelectDogId(data.dogs[0].id)
      }
    } catch (error) {
      console.error('Failed to fetch dogs:', error)
    }
  }

  useEffect(() => {
    fetchDogs()
  }, [])

  const handleEdit = (activity: Activity) => {
    setEditingActivity(activity)

    switch (activity.type) {
      case 'WATER':
        setShowLogWaterModal(true)
        break

      case 'MEAL':
        setShowLogFeedingModal(true)
        break

      case 'WALK':
      case 'PLAY':
        setShowLogWalkPlayModal(true)
        break

      case 'MEDICATION':
        setShowLogMedicationModal(true)
        break
    }
  }

  const handleDelete = async (activityId: string) => {
    const confirmed = window.confirm('Are you sure you want to delete this?')
    if (!confirmed) return
    try {
      await activityService.delete(activityId)
      fetchActivities()
    } catch (error) {
      console.error('Failed to delete activity:', error)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-4xl font-semibold text-gray-700"> Activity Log</h1>
          <p className="text-gray-400 mt-2">View and filter all care activities.</p>
        </div>

        <div className="flex items-center gap-3">
          {dogs.length > 0 && (
            <div className="flex items-center gap-2">
              <label className="text-gray-600 text-sm font-medium">
                Select Dog:
              </label>
              <select
                value={selectDogId}
                onChange={(event) => setSelectDogId(event.target.value)}
                className="bg-white border border-gray-300 text-gray-700 px-4 py-2.5 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 hover:border-gray-400 transition"
              >
                {dogs.map(dog => (
                  <option key={dog.id} value={dog.id}>
                    {dog.name}
                  </option>
                ))}
              </select>
            </div>
          )}

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
      </div>

      {loading && <p className="text-gray-600">Loading activities...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      <div className="space-y-4">
        {activities?.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm p-12 text-center border border-gray-200">
            <p className="text-gray-500 text-lg">No activities logged yet</p>
            <p className="text-gray-400 text-sm mt-2">Start logging activities using the "+ Log Activity" button above</p>
          </div>
        ) : (
          activities?.map(activity => (
            <ActivityCard
              key={activity.id}
              activity={activity}
              onEdit={() => handleEdit(activity)}
              onDelete={() => handleDelete(activity.id)}
            />
          ))
        )}
      </div>

      <ActivityModalManager
        showFeeding={showLogFeedingModal}
        showWalkPlay={showLogWalkPlayModal}
        showWater={showLogWaterModal}
        showMedication={showLogMedicationModal}
        onCloseFeeding={() => {
          setShowLogFeedingModal(false)
          setEditingActivity(null)
        }}
        onCloseWalkPlay={() => {
          setShowLogWalkPlayModal(false)
          setEditingActivity(null)
        }}
        onCloseWater={() => {
          setShowLogWaterModal(false)
          setEditingActivity(null)
        }}
        onCloseMedication={() => {
          setShowLogMedicationModal(false)
          setEditingActivity(null)
        }}
        dogId={selectDogId}
        editActivity={editingActivity}
        onActivitySaved={fetchActivities}
      />
    </div>

  )
}

export default ActivityLog