import { Box, Grid, Tooltip, Typography } from '@mui/material'
import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
export default function Default(props) {
    const { image, setShowImage } = props
    return (
        <div style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent black color for the overlay
            zIndex: 111,
            display: 'flex',
            justifyContent: 'center',
            borderRadius: '16px'
        }}>
            <Box style={{
                position: 'fixed',
                zIndex: '11',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                height: 'auto',
                maxHeight: '95%',
                overflow: 'auto',
                width: {
                    xs: '90%',
                    sm: '90%',
                    md: '70%',
                    lg: '70%',
                    xl: '50%'
                },
                border: '1px solid #00000012',
                backgroundColor: 'white',
                padding: '10px',
                borderRadius: '16px',
            }}>
                <Grid container sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '10px'
                }}>
                    <Grid sm={12} md={12} lg={12} item align='right'>
                        <Typography onClick={() => { setShowImage(false) }} style={{ right: '0', cursor:'pointer' }} fontSize={'20px'}><CloseIcon /></Typography>
                    </Grid>
                </Grid>
                <Box position={'relative'} style={{
                    maxHeight:'95vh',
                    maxWidth:'95vw'
                }}>
                    <center><img src={image} height='100%' width='100%'/></center>
                </Box>
            </Box>
        </div>
    )
}
