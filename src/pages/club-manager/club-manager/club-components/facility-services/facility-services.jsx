import React from 'react';
import { CustomCheckbox } from '../../../../shared-components/check-box';

export const FacilityServices = ({ facilityServices, setFacilityServices }) => {

    const handleOnChange = (e, key) => {
        const mServices = JSON.parse(JSON.stringify(facilityServices));
        mServices[key] = e.target.checked;
        setFacilityServices(mServices)
    }

    return (
        <>
            <CustomCheckbox label="קפיטריה" value={facilityServices.cafeteria} setValue={(e) => handleOnChange(e, "cafeteria")} />
            <CustomCheckbox label="חניה" value={facilityServices.parking} setValue={(e) => handleOnChange(e, "parking")} />
            <CustomCheckbox label="מים קרים" value={facilityServices.coldWater} setValue={(e) => handleOnChange(e, "coldWater")} />
            <CustomCheckbox label="תאורת לד" value={facilityServices.ledLight} setValue={(e) => handleOnChange(e, "ledLight")} />
            <CustomCheckbox label="חנות" value={facilityServices.store} setValue={(e) => handleOnChange(e, "store")} />
            <CustomCheckbox label="גישה לבעלי מוגבלויות" value={facilityServices.disabledPeople} setValue={(e) => handleOnChange(e, "disabledPeople")} />
            <CustomCheckbox label="שירותי שזירה" value={facilityServices.stringing} setValue={(e) => handleOnChange(e, "stringing")} />
            <CustomCheckbox label="קיר אימון" value={facilityServices.practiceWall} setValue={(e) => handleOnChange(e, "practiceWall")} />
            <CustomCheckbox label="מקלחת" value={facilityServices.shower} setValue={(e) => handleOnChange(e, "shower")} />

        </>
    )
}