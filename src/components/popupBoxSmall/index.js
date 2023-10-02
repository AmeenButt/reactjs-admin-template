import { Box } from '@mui/material'
import React from 'react'
import { mainPopupBoxSmall } from 'style'
import { overlay } from 'style'

export default function Default(props) {
    return (
        <div style={overlay}>
            <Box sx={mainPopupBoxSmall}>
                {props.children}
            </Box>
        </div>


    )
}
