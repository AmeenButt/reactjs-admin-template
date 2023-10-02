import { Box, Tooltip, Typography } from '@mui/material';
import React, { useContext } from 'react'
import { mainPopupBoxSmall } from 'style';
import useNavbar from "hooks/useNavbar";
import AppContext from 'appState/context';
import PopupClose from 'components/popupClose';
import CircularProgress from '@material-ui/core/CircularProgress';
import CloseIcon from '@mui/icons-material/Close';
import { Button } from 'reactstrap';
import PopupBoxSmall from 'components/popupBoxSmall'
import CommonButton from 'components/globalButton'
export default function Default() {
    const appState = useContext(AppContext);
    const { setShowSideNavbar, setChangeEmail } = appState;
    const {
        disableButton,
        isLoading,
        submitted,
        setSubmitted,
        handleEmailSubmit,
        handleEmailChange,
        emailData
    } = useNavbar();
    return (
        <PopupBoxSmall>
            <PopupClose onClose={() => { setChangeEmail(false); setShowSideNavbar(true) }} text='Change Email' /><br /><br />
            <Box style={{ "backgroundColor": "white" }}>
                <center><Box>
                    <form onSubmit={handleEmailSubmit} style={{ m: 1, width: '80%' }}>
                        <div style={{ "position": "relative", "height": "80px" }}>
                            <input onClick={() => { setSubmitted((prevState) => ({ ...prevState, emailError: false, emailValidationError: false })); }} onChange={handleEmailChange} value={emailData.email} name='email'
                                className={`${submitted.emailError || submitted.emailValidationError ? 'signin-input-error' : 'signin-input'}`}
                                placeholder='Old Email' label="Outlined" type='text' />
                            <p className={`${submitted.emailError || submitted.emailValidationError ? 'error-text' : 'hidden-text'}`}>
                                {submitted.emailError ? 'Email is required' : submitted.emailValidationError ? 'Invalid Email'
                                    : ''}</p>
                        </div>
                        <div style={{ "position": "relative", "height": "80px" }}>
                            <input onClick={() => { setSubmitted((prevState) => ({ ...prevState, CemailError: false, CemailValidationError: false })); }} onChange={handleEmailChange}
                                value={emailData.cemail} name='cemail'
                                className={`${submitted.CemailError || submitted.CemailValidationError ? 'signin-input-error' : 'signin-input'}`}
                                placeholder='New Email' label="Outlined" type='text' />
                            <p className={`${submitted.CemailError || submitted.CemailValidationError ? 'error-text' : 'hidden-text'}`}>
                                {submitted.CemailValidationError ? 'Invalid Email' : submitted.CemailError ? 'Confirm Password is required'
                                    : ''}</p>
                        </div>
                        <center>
                            <CommonButton
                                type='submit'
                                isLoading={isLoading}
                                text='Update'
                                disabled={disableButton}
                                marginClass='my-4'
                            />

                            </center>
                    </form>

                </Box></center>
            </Box>
        </PopupBoxSmall>
    )
}
