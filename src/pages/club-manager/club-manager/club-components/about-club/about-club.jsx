import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'
import CustomDivider from '../../../../shared-components/custom-divider';
import { TextBox } from '../../../../shared-components/text-box';
import { SaveButton } from '../../../../shared-components/save-button';
import Button from '@mui/material/Button';
import { FacilityServices } from '../facility-services/facility-services';
import UploadButton from '../../../../shared-components/upload-button';
import { courtService } from '../../../../../services/court.service'
import { Loader } from '../../../../../components/loader.jsx';

export const AboutClub = () => {
  const [clubName, setClubName] = useState("");
  const [clubMail, setClubMail] = useState("dudiselaacademy@gmail.com");
  const [clubNameEng, setClubNameEng] = useState("Dudi Sela Tennis Academy");
  const [city, setCity] = useState("תל אביב");
  const [address, setAddress] = useState("אוניברסיטת תל אביב שער 9");
  const [addressInEng, setAddressInEng] = useState("Haim Lebanon 60, Tel Aviv, Israel");
  const [cityInEng, setCityInEng] = useState("Tel-Aviv");
  const [phone, setPhone] = useState("");
  const [instagram, setInstagram] = useState("");
  const [facebook, setFacebook] = useState("");
  const [moreDetails, setMoreDetails] = useState('מרכז הטניס באוניברסיטת תל אביב ממוקם בלב העיר .ומנוהל על ידי דודי סלע ויואב בן צבי מאמן נבחרת ישראל.במתקן 9 מגרשי טניס ותאורת LED ,אקדמיה מתקדמת לטניס , חוגי טניס ,מלתחות , חניה  ועוד.לכל בעיה יש לפנות ליואב מנהל המועדון בטלפון שימו לב מגרשי הטניס אדום, כחול,ירוק קצרים מהסטנדרט מהקו האחורי ועד הגדר .');
  const [moreDetailsInEng, setMoreDetailsInEng] = useState("The tennis center at Tel Aviv University is located in the heart of the city. And is managed by Dudi Sela and Yoav Ben Zvi, the coach of the Israel national team. The facility has 9 tennis courts and LED lighting, an advanced academy for tennis, tennis clubs, changing rooms, parking and more. For any problem, please contact the club manager, Yoav, Notice the red, blue, and green tennis courts are shorter than standard from the back line to the fence.");
  const [facilityServices, setFacilityServices] = useState({ cafiteria: true, coldWater: true, disabledPeople: false, ledLight: true, parking: true, store: false, shower: true, stringing: true, practiceWall: true });
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(()=> {

    const getAboutClub = async () => {
      try {
        // setIsLoading(true)
        let res = await courtService.getAboutClub()
        // setIsLoading(false)
        return res.data.about_club
      } catch (error) {
        navigate('/')
      }
    }
    if (clubName === "") {
      getAboutClub().then(res => {
        setClubName(res.clubName)
        setClubMail(res.clubMail)
        setClubNameEng(res.clubNameEng)
        setCity(res.city)
        setAddress(res.address)
        setCityInEng(res.cityInEng)
        setPhone(res.phone)
        setInstagram(res.instagram)
        setFacebook(res.facebook)
        setMoreDetails(res.moreDetails)
        setMoreDetailsInEng(res.moreDetailsInEng)
        setFacilityServices(res.facilityServices)
      })
    }
  }, [])

  const handleSave = async (e) => {
    e.stopPropagation()
    e.preventDefault()
    setIsLoading(true)
    const payload = {clubMail, clubName, clubNameEng, city, address, addressInEng, cityInEng, clubName, phone, facebook, instagram, moreDetails, moreDetailsInEng, "facilityServices": facilityServices}
    let res = await courtService.editAboutClub(payload)
    setIsLoading(false)
  }
  const renderIsLoading = () => {
    if (isLoading) {
      return (
        <Loader />
      )
    }
  }
  return (
    <Box className="club-box container">
      {renderIsLoading()}
      <div className="grid-club-component">
        <Typography id="club-title" className="club-title" variant="h6" component="h2">מידע על המועדון</Typography>
        <CustomDivider className="grid-divider" />
        <Box className="main-component-fields-container">
          <TextBox label="שם המועדון" value={clubName} setValue={setClubName} />
          <TextBox label="מייל" value={clubMail} setValue={setClubMail} />
          <TextBox label="עיר" value={city} setValue={setCity} />
          <TextBox label="שם המועדון באנגלית" value={clubNameEng} setValue={setClubNameEng} />
          <TextBox label="כתובת" value={address} setValue={setAddress} />
          <TextBox label="שם העיר באנגלית" value={cityInEng} setValue={setCityInEng} />
          <TextBox label="טלפון" value={phone} setValue={setPhone} />
          <TextBox label="כתובת באנגלית" value={addressInEng} setValue={setAddressInEng} />
          <Box>
            <FacilityServices facilityServices={facilityServices} setFacilityServices={setFacilityServices} />
          </Box>
          <TextBox label="פייסבוק" value={facebook} setValue={setFacebook} />
          <TextBox label="אינסטגרם" value={instagram} setValue={setInstagram} />
          <TextBox label="מידע נוסף" value={moreDetails} setValue={setMoreDetails} />
          <TextBox label="מידע נוסף באנגלית" value={moreDetailsInEng} setValue={setMoreDetailsInEng} />
        </Box>
        {/* <Box className="btn-club-components-container flex align-center"> */}
          {/* <UploadButton /> */}
          <Button className="save-club-info-btn" variant="contained" component="label" onClick={(e) => handleSave(e)}>שמור</Button>
        {/* </Box> */}
      </div>
    </Box>
  )
}