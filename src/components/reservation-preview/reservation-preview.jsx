import React, { useCallback, useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faPenToSquare } from '@fortawesome/free-solid-svg-icons'
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons'
import dayjs from "dayjs"

export const ReservationPreview = ({ item, todaysDate, hrBeforeCancel, onDeleteReservation, isLoading }) => {
    const [isCancelable, setIsCancelable] = useState(false)

    const getTimeLeft = useCallback((item) => {
        const futureDate = dayjs(item.date)
        let timeLeftInDays = futureDate.diff(todaysDate, 'day')
        const currentHour = dayjs().hour()
        const hrDiff = item.startHour.split(":")[0] - currentHour
        return hrDiff + timeLeftInDays*24;
    }, [todaysDate])

    const getIsCancelable = useCallback((item) => {
        const cancelItem = getTimeLeft(item)
        if (cancelItem > hrBeforeCancel) {
            setIsCancelable(true)
        }
        else {
            setIsCancelable(false)
        }
    }, [hrBeforeCancel, getTimeLeft])

    useEffect(() => {
        getIsCancelable(item);
    }, [getIsCancelable, item])

    return (
        <>
            <tr key={item.id}>
                <td data-label="תאריך">{item.date}</td>
                <td data-label="שעת התחלה">{item.startHour}</td>
                <td data-label="שעת סיום">{item.endHour}</td>
                <td data-label="מספר מגרש">{item.courtNumber}</td>
                <td data-label="פעולות" className="flex align-center justify-center">
                    <table className="table-actions flex">
                        <tbody>
                            <tr className="table-action-cell">
                                <td className="table-cell-btn">
                                    {isCancelable ? <button disabled={isLoading} className="table-btn" onClick={(e) => onDeleteReservation(e, item)}>
                                        <NavLink to='/user-reservations/'>
                                            <FontAwesomeIcon icon={faTrashAlt} />
                                        </NavLink>
                                    </button> : <button className="table-btn" disabled>
                                        <NavLink to='/user-reservations/'>
                                            <FontAwesomeIcon icon={faTrashAlt} />
                                        </NavLink>
                                    </button>}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>
        </>
    )
}