import { useState } from 'react'
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'

interface LogWaterModalProps {
    isOpen: boolean
    onClose: () => void
    onWaterLogged: () => void
}

const getCurrentTime = () => {

    const currentDate = new Date()
    const year = currentDate.getFullYear()
    const month = (now.getMonth() + 1).toString().padStart(2, '0')
    const day = now.getDate().toString().padStart(2, '0')
    return `${day}-${month}-${year}`

}

const getCurrentTime = () => {
    const now = new Date()
    const hours = now.getHours().toString().padStart(2, '0')
    const minutes = now.getMinutes().toString().padStart(2, '0')
    return `${hours}:${minutes}`
}

function LogWaterModal({ isOpen, onClose, onWaterLogged }: LogWaterModalProps) {
    const [date, setDate] = useState(getCurrentDate())
    const [time, setTime] = useState(getCurrentTime())
    const [notes, setNotes] = useState('')
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')


    return (
        <div>LogWaterModal</div>
    )
}

export default LogWaterModal