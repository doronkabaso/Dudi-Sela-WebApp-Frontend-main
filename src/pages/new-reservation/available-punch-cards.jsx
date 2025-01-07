import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography'
import Modal from '@mui/material/Modal';
import Container from '@mui/material/Container';

export const AvailablePunchCards = ({punchCards, showPunchCards, closePunchCards, selectPunchCard}) => {

    const renderPunchCards = () => {
        return (
          punchCards.map((card) => {
            // TODO validForMembers - show card only for valid members/users
            return (
              <button onClick={(e) => selectPunchCard(e, card)} className="card-type-btn flex-column">
                {card.cardName}
                <span>כמות קרדיט: {card.creditAmount}</span>
                <span>מחיר: {card.price}</span>
              </button>
            )
          }))
      }

    return (
        <Modal
            open={showPunchCards}
            onClose={closePunchCards}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            className="modal-overlay">
            <Box className="modal-box">
                <Container className="modal-content">
                    <Box className="modal-header">
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            בחר\קנה כרטיסייה
                        </Typography>
                    </Box>
                    <Box className="modal-body flex-row">
                        {renderPunchCards()}
                        <button onClick={() => closePunchCards()} className='cancel-btn'>
                                ביטול
                        </button>

                    </Box>
                </Container>
            </Box>
        </Modal>
    )
}