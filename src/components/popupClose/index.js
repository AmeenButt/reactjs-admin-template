import { Box, Tooltip, Typography } from '@mui/material';
import React from 'react'
import CloseIcon from '@mui/icons-material/Close';

export default function Default(props) {
    const {onClose, text} = props
    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '10px'
        }}>
            <Typography fontSize={'28px'}>{text}</Typography>
            <Tooltip title="Close" style={{ color: 'black', cursor: 'pointer', zIndex: '1111111' }}>
                <Typography onClick={onClose} fontSize={'20px'}><CloseIcon /></Typography>
            </Tooltip>
        </Box>
    )
}
