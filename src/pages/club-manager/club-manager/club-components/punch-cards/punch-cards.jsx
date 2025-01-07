import { useState, useEffect, useCallback } from 'react'
import Box from '@mui/material/Box';
import { courtService } from '../../../../../services/court.service'
import Container from '@mui/material/Container';
import CustomDivider from '../../../../shared-components/custom-divider';
import Typography from '@mui/material/Typography'
import { CreatePunchCard } from './create-punch-card';
import { useNavigate } from 'react-router-dom'
import { Loader } from '../../../../../components/loader.jsx';
import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { reservationService } from '../../../../../services/reservation.service';

export const PunchCards = () => {
  const [showModalCreate, setShowModalCreate] = useState(false);
  const [punchCards, setPunchCards] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [selectedCard, setSelectedCard] = useState();
  const navigate = useNavigate()
  const [messageAlert, setMessageAlert] = useState()
  const [showMessageAlert, setShowMessageAlert] = useState(false)
  const [usersCredit, setUsersCredit] = useState([])

  const _emptyCard = {
    cardName: undefined,
    creditAmount: undefined,
    creditInMinutes: undefined,
    dueNumDays: undefined,
    blockOnDate: undefined,
    price: undefined,
    additionalDetails: undefined,
    showForSale: undefined,
    isMember: false,
    validForMembers: [],
    cardHours: []
  }

  const getPunchCards = useCallback(async () => {
    try {
      // setIsLoading(true)
      let res = await courtService.getPunchCards()
      // setIsLoading(false)
      return res.data.punch_cards
    } catch (error) {
      navigate('/')
    }
  }, [navigate])

  useEffect(() => {
    if (punchCards.length === 0) {
      getPunchCards().then(res => {
        setPunchCards(res)
      })
      setSelectedCard(_emptyCard)
    }
  }, [_emptyCard, getPunchCards, punchCards.length])


  const getUsersCredit = useCallback(async () => {
    let res = await reservationService.getUsersCredit()
    setUsersCredit(res)
  }, [])

  useEffect(() => {
    getUsersCredit()
  }, [getUsersCredit])

  const closePunchCard = () => {
    console.info("close")
  }

  const handleClose = () => {
    setShowModalCreate(false)
    setSelectedCard(_emptyCard)
  }

  const renderModalCreate = () => {
    if (showModalCreate) {
      return (
        <CreatePunchCard selectedCard={selectedCard} showModalCreate={showModalCreate} closePunchCard={closePunchCard} handleSave={saveSelectedCard} handleClose={(e) => handleClose(e)} isLoading={isLoading} />
      )
    }
  }

  const handleShowPunchCard = (e, card) => {
    console.info(e, card)
    setSelectedCard(card)
    setShowModalCreate(true)
  }

  const renderPunchCards = () => {
    return (
      punchCards.map((card) => {
        return (
          <button onClick={(e) => handleShowPunchCard(e, card)} className="card-type-btn flex-column">
            {card.cardName}
            <span>כמות קרדיט: {card.creditAmount}</span>
            <span>מחיר: {card.price}</span>
          </button>
        )
      }))
  }

  const removeSelectedCard = async (court) => {
    await courtService.deletePunchCard(court).then(
      setShowModalCreate(false)
    )
    // getClubCards().then(res => {
    //   setCardData(res)
    // })
  }

  const validateCard = (card) => {
    return (card.cardName && card.cardName.trim() !== "" && card.creditAmount && Number(card.creditAmount) > 0 && card.price && Number(card.price) > 0)
  }

  const saveSelectedCard = async (e, card) => {
    if (validateCard(card)) {
      setIsLoading(true)
      let res
      if (selectedCard.id) { // it is an existing card, as it has id
        card["id"] = selectedCard.id
        res = await courtService.editPunchCard(card)
      } else {
        res = await courtService.addPunchCard(card)
      }
      getPunchCards().then(res => {
        setPunchCards(res)
        setIsLoading(false)
      })
      setShowModalCreate(false)
      setSelectedCard(_emptyCard)
    } else {
      setMessageAlert('כרטיסייה חייבת להיות עם שם, מספר ניקובים, ומחיר')
      setShowMessageAlert(true)
    }
  }

  const renderModalPunchCard = () => {
    if (showModalCreate) {
      return (
        <CreatePunchCard selectedCard={selectedCard} showModalCreate={showModalCreate} closePunchCard={closePunchCard} handleSave={saveSelectedCard} handleClose={(e) => handleClose(e)} isLoading={isLoading} removeSelectedCard={removeSelectedCard} />
      )
    }
  }

  const handleCloseAlert = (event, reason) => {
    setShowMessageAlert(false)
  }

  const alertAction = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="#F2F6F7"
        onClick={handleCloseAlert}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  )

  const renderMessageAlert = () => {
    if (showMessageAlert) {
      return (
        <Snackbar
          open={true}
          anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          autoHideDuration={6000}
          onClose={handleCloseAlert}
          action={alertAction}
        >
          <Alert
            severity="info"
            onClose={handleCloseAlert}
            sx={{
              minWidth: '100%',
              color: '#1d1d1d',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: '10px',
              backgroundColor: '#50D4F2'
            }}
            spacing={5}
            variant="filled"
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
          >{messageAlert}</Alert>
        </Snackbar>
      )
    }
  }

  const renderIsLoading = () => {
    if (isLoading) {
      return (
        <Loader />
      )
    }
  }

  const renderUserCredit = (keyVal) => {
    if (keyVal[1].user_credit>0) {
      return (
        <tr className="table-action-cell" key={keyVal[0]}>
          <td className="table-cell-btn">{keyVal[1].user_credit}</td>
          <td className="table-cell-btn">{keyVal[1].mail}</td>
          <td className="table-cell-btn">{keyVal[1].date}</td>
        </tr>
      )
    }
  }
  const renderUsersCredit = () => {
    return (
      <table className="credit-list">
        <thead>
          <tr>
            <th className='credit-th'>קרדיט</th>
            <th className='credit-th'>מייל</th>
            <th className='credit-th'>תאריך</th>
          </tr>
        </thead>
        <tbody>
          {usersCredit && Object.entries(usersCredit).map(keyVal =>
            renderUserCredit(keyVal)
          )}
        </tbody>
      </table>
    )
  }

  const renderCardCredit = (punchCards) => {
    return (
      Object.keys(punchCards).map((key) => {
        return (
          <button className="card-type-btn flex-column">
            שם כרטיסייה: {key}
            <span>כמות קרדיט: {punchCards[key]}</span>
          </button>
        )
      }))
  }
  const renderCardsCredit = () => {
    if (usersCredit) {
      return (
        usersCredit && Object.entries(usersCredit).map(keyVal =>
          <span className="flex-row">
            {renderCardCredit(keyVal[1].punch_cards)}
          </span>
        )
      )
    }
  }

  return (
    <Box className="punch-card-box container">
      {renderMessageAlert()}
      <Container className="punch-card-content">
        <Box className="punch-card-header">
          <Typography id="club-title" className="club-title" variant="h6" component="h2">כרטיסיות</Typography>
        </Box>

        <CustomDivider />
        <h2>סוגי כרטיסיות</h2>
        <div className="card-type-container flex">
          {renderPunchCards()}
          {renderModalPunchCard()}
          {renderIsLoading()}
        </div>
        <CustomDivider />

        <Box className="club-credit">
          <Typography id="club-title" className="club-title" variant="h6" component="h2">זיכויים</Typography>
          {renderUsersCredit()}
          {renderCardsCredit()}
        </Box>

        <CustomDivider />

        <button onClick={() => setShowModalCreate(true)} className="create-punch-card-btn">צור כרטיסיה</button>
        {renderModalCreate()}

      </Container>
    </Box>
  )
}