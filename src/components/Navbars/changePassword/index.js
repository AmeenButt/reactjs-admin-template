import { Box, Tooltip, Typography } from '@mui/material';
import React, { useContext } from 'react'
import { mainPopupBoxSmall } from 'style';
import useNavbar from "hooks/useNavbar";
import AppContext from 'appState/context';
import PopupClose from 'components/popupClose';
import CircularProgress from '@material-ui/core/CircularProgress';
import CommonButton from 'components/globalButton';
import { Button } from 'reactstrap';
import PopupBoxSmall from 'components/popupBoxSmall'
export default function Default() {
    const appState = useContext(AppContext);
    const { setShowSideNavbar, setChangePassword } = appState;
    const {
        disableButton,
        isLoading,
        userData,
        handleInputChange, submitted, setSubmitted,
        handleResetFormSubmit,
    } = useNavbar();
    return (
        <PopupBoxSmall>
            <PopupClose onClose={() => { setChangePassword(false); setShowSideNavbar(true) }} text='Change Password' />
            <br /><br />
            <Box style={{ "backgroundColor": "white" }}>
                <center><Box>
                    <form onSubmit={handleResetFormSubmit} style={{ m: 1, width: '80%' }}>
                        <div style={{ "position": "relative", "height": "80px" }}>
                            <input onClick={() => { setSubmitted((prevState) => ({ ...prevState, currentPasswordValidatonError: false })); }} onChange={handleInputChange} value={userData.currentPassword} name='currentPassword'
                                className={`${submitted.currentPasswordValidatonError ? 'signin-input-error' : 'signin-input'}`}
                                placeholder='Current Password' label="Outlined" type='password' />
                            <p className={`${submitted.currentPasswordValidatonError ? 'error-text' : 'hidden-text'}`}>
                                {submitted.currentPasswordValidatonError ? 'Current Password is required' : ''}</p>
                        </div>
                        <div style={{ "position": "relative", "height": "80px" }}>
                            <input onClick={() => { setSubmitted((prevState) => ({ ...prevState, passwordIncorrectCheck: false, passwordValidatonError: false, passwordError: false })); }} onChange={handleInputChange} value={userData.password} name='password'
                                className={`${submitted.passwordError || submitted.passwordValidatonError || submitted.passwordIncorrectCheck ? 'signin-input-error' : 'signin-input'}`}
                                placeholder='New Password' label="Outlined" type='password' />
                            <p className={`${submitted.passwordError || submitted.passwordValidatonError || submitted.passwordIncorrectCheck ? 'error-text' : 'hidden-text'}`}>
                                {submitted.passwordError ? 'New Password is required' : submitted.passwordValidatonError ? 'Password should be greater then 5 characters'
                                    : ''}</p>
                        </div>
                        <div style={{ "position": "relative", "height": "80px" }}>
                            <input onClick={() => { setSubmitted((prevState) => ({ ...prevState, confirmPasswordCheck: false, confirmPasswordError: false })); }} onChange={handleInputChange}
                                value={userData.confirmPassword} name='confirmPassword'
                                className={`${submitted.confirmPasswordError || submitted.confirmPasswordCheck ? 'signin-input-error' : 'signin-input'}`}
                                placeholder='Confirm Password' label="Outlined" type='password' />
                            <p className={`${submitted.confirmPasswordError || submitted.confirmPasswordCheck ? 'error-text' : 'hidden-text'}`}>
                                {submitted.confirmPasswordError ? 'Confirm Password should match password' : submitted.confirmPasswordCheck ? 'Confirm Password is required'
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
