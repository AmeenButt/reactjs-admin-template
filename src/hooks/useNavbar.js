import AppContext from "appState/context";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import basePath from "basePath";
import { toast } from "react-toastify";
import baseUrl from "url";
import { useLocation } from "react-router-dom/dist";
export default () => {
    const navigator = useNavigate();
    const appState = useContext(AppContext);
    const { setShowSideNavbar, setChangePassword, setChangeEmail } = appState;
    const handleResetFormSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setDisableButton(true);
        let hasError = false;
        if (userData.password === '') {
            setSubmitted((prevState) => ({ ...prevState, passwordError: true }));
            setIsLoading(false);
            setDisableButton(false);
            hasError = true;
        } else if (userData.password.length < 5) {
            setSubmitted((prevState) => ({ ...prevState, passwordValidatonError: true }));
            setIsLoading(false);
            setDisableButton(false);
            hasError = true;
        } else {
            setSubmitted((prevState) => ({ ...prevState, passwordValidatonError: false, passwordError: false }));
        }

        if (userData.confirmPassword === '') {
            setSubmitted((prevState) => ({ ...prevState, confirmPasswordCheck: true }));
            setIsLoading(false);
            setDisableButton(false);
            hasError = true;
        } else if (userData.confirmPassword !== userData.password) {
            setSubmitted((prevState) => ({ ...prevState, confirmPasswordError: true }));
            setIsLoading(false);
            setDisableButton(false);
            hasError = true;
        } else {
            setSubmitted((prevState) => ({ ...prevState, confirmPasswordCheck: false, confirmPasswordError: false }));
        }
        if (userData.currentPassword === '') {
            setSubmitted((prevState) => ({ ...prevState, currentPasswordValidatonError: true }));
            setIsLoading(false);
            setDisableButton(false);
            hasError = true;
        } else {
            setSubmitted((prevState) => ({ ...prevState, currentPasswordValidatonError: false }));
        }
        if (!hasError) {
            try {
                await fetch(`${baseUrl}admin/updatedPassword`, {
                    method: 'PUT',
                    headers: {
                        "Content-Type": "application/json",
                        "token": localStorage.getItem('jwt-token')
                    },
                    body: JSON.stringify({
                        newPassword: userData.confirmPassword,
                        currentPassword: userData.currentPassword,
                        admin_id: localStorage.getItem('id')
                    })
                }).then(res => res.json()).then(response => {
                    if (response.status === true) {
                        localStorage.clear();
                        toast.success(response.message, {
                            position: toast.POSITION.TOP_CENTER,
                        });
                        setChangePassword(false);
                        setUserData({
                            "password": "",
                            "confirmPassword": ""
                        });
                        navigator(`/${basePath}/auth/login`)
                        setShowSideNavbar(true)
                    }
                    else {
                        toast.error(response.message, {
                            position: toast.POSITION.TOP_CENTER,
                        });

                    }
                }).catch(err => {
                    throw new Error(err)
                })
            } catch (err) {
                throw new Error(err)
            }
        }
        setIsLoading(false);
        setDisableButton(false);
    }
    const validateEmail = (email) => {
        const pattern = /^[\w\.-]+@[\w\.-]+\.\w+$/;
        return pattern.test(email);
    };
    const [emailData, setemailData] = useState({
        email: '',
        cemail: ''
    })
    const handleEmailChange = (event) => {
        setemailData({ ...emailData, [event.target.name]: event.target.value });
    };
    const handleEmailSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        setDisableButton(true);
        let hasError = false;
        if (emailData.email === '') {
            setSubmitted((prevState) => ({ ...prevState, emailError: true }));
            setIsLoading(false);
            setDisableButton(false);
            hasError = true;
        } else if (!validateEmail(emailData.email)) {
            setSubmitted((prevState) => ({ ...prevState, emailValidationError: true }));
            setIsLoading(false);
            setDisableButton(false);
            hasError = true;
        } else {
            setSubmitted((prevState) => ({ ...prevState, emailError: false, emailValidationError: false }));
        }

        if (emailData.cemail === '') {
            setSubmitted((prevState) => ({ ...prevState, CemailError: true }));
            setIsLoading(false);
            setDisableButton(false);
            hasError = true;
        } else if (!validateEmail(emailData.cemail)) {
            setSubmitted((prevState) => ({ ...prevState, CemailValidationError: true }));
            setIsLoading(false);
            setDisableButton(false);
            hasError = true;
        }
        else {
            setSubmitted((prevState) => ({ ...prevState, CemailError: false, CemailValidationError: false }));
        }
        if (!hasError) {
            try {
                await fetch(`${baseUrl}admin/updateEmail`, {
                    method: 'PUT',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email: emailData.email,
                        newEmail: emailData.cemail,
                    })
                }).then(res => res.json()).then(response => {
                    if (response.status === true) {
                        localStorage.clear();
                        toast.success(response.message, {
                            position: toast.POSITION.TOP_CENTER,
                        });
                        setChangeEmail(false);
                        setemailData({
                            "email": "",
                            "cemail": ""
                        });
                        setShowSideNavbar(true)
                        navigator(`/${basePath}/auth/login`)
                    }
                    else {
                        toast.error(response.message, {
                            position: toast.POSITION.TOP_CENTER,
                        });
                    }
                }).catch(err => {
                    throw new Error(err)
                })
            } catch (err) {
                throw new Error(err)
            }
        }
        setIsLoading(false);
        setDisableButton(false);
    }
    const [submitted, setSubmitted] = useState({
        "emailError": false,
        "emailValidationError": false,
        "CemailError": false,
        "CemailValidationError": false,
        "currentPasswordValidatonError": false,
        "passwordIncorrectCheck": false,
        "passwordValidatonError": false,
        "passwordError": false,
        "confirmPasswordCheck": false,
        "confirmPasswordError": false,
    });
    const handleInputChange = (event) => {
        setUserData({ ...userData, [event.target.name]: event.target.value })
    }
    const [userData, setUserData] = useState({
        "password": "",
        "confirmPassword": "",
        "currentPassword": ""
    })
    const [isLoading, setIsLoading] = useState(false);
    const [disableButton, setDisableButton] = useState(false)
    let location = useLocation()
    return {
        location,
        disableButton,
        setDisableButton,
        isLoading,
        setIsLoading,
        userData, setUserData,
        handleEmailChange,
        handleInputChange, submitted, setSubmitted, handleEmailSubmit, emailData, setemailData, validateEmail,
        handleResetFormSubmit
    }
}