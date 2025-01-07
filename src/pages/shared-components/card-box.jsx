import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';

export default function CardBox({ cards }) {
    return (
        <Box sx={{ minWidth: 275 }}>
            {cards.map((card, cardIdx) => (
                <Card key={cardIdx} variant="outlined">
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        {card.title}
                    </Typography>
                    {card.categories.map((category, categoryIdx) => (
                        <Box key={categoryIdx} className="flex align-center justify-between">
                            <Typography variant="h5" component="div">
                                {category.name}
                            </Typography>
                            <Typography variant="h5" component="div">
                                {category.details}
                            </Typography>
                        </Box>
                    ))}
                </Card>
            ))}
        </Box>
    );
}