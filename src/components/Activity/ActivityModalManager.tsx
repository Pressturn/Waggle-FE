import LogFeedingModal from './LogFeedingModal'
import LogWalkPlayModal from './LogWalkPlayModal'
import LogWaterModal from './LogWaterModal'
import LogMedicationModal from './LogMedicationModal'
import { type Activity } from '../../services/activityService'

interface ActivityModalManagerProps {
    showFeeding: boolean
    showWalkPlay: boolean
    showWater: boolean
    showMedication: boolean
    onCloseFeeding: () => void
    onCloseWalkPlay: () => void
    onCloseWater: () => void
    onCloseMedication: () => void
    dogId: string
    editActivity?: Activity | null
    onActivitySaved: () => void
}

function ActivityModalManager({
    showFeeding,
    showWalkPlay,
    showWater,
    showMedication,
    onCloseFeeding,
    onCloseWalkPlay,
    onCloseWater,
    onCloseMedication,
    dogId,
    editActivity,
    onActivitySaved
}: ActivityModalManagerProps) {

    const handleFeedingLogged = () => {
        onActivitySaved()
        onCloseFeeding()
    }

    const handleWalkPlayLogged = () => {
        onActivitySaved()
        onCloseWalkPlay()
    }

    const handleWaterLogged = () => {
        onActivitySaved()
        onCloseWater()
    }

    const handleMedicationLogged = () => {
        onActivitySaved()
        onCloseMedication()
    }

    return (
        <div>
            <LogFeedingModal
                isOpen={showFeeding}
                onClose={onCloseFeeding}
                onFeedingLogged={handleFeedingLogged}
                dogId={dogId}
                editActivity={editActivity?.type === 'MEAL' ? editActivity : undefined}
            />

            <LogWalkPlayModal
                isOpen={showWalkPlay}
                onClose={onCloseWalkPlay}
                onWalkPlayLogged={handleWalkPlayLogged}
                dogId={dogId}
                editActivity={editActivity?.type === 'WALK' || editActivity?.type === 'PLAY' ? editActivity : undefined}
            />
            
            <LogWaterModal
                isOpen={showWater}
                onClose={onCloseWater}
                onWaterLogged={handleWaterLogged}
                dogId={dogId}
                editActivity={editActivity?.type === 'WATER' ? editActivity : undefined}
            />

            <LogMedicationModal
                isOpen={showMedication}
                onClose={onCloseMedication}
                onMedicationLogged={handleMedicationLogged}
                dogId={dogId}
                editActivity={editActivity?.type === 'MEDICATION' ? editActivity : undefined}
            />

        </div>
    )
}

export default ActivityModalManager