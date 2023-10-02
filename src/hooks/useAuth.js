import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import baseUrl from "url";
import basePath from "basePath";
export default () => {
    const [loginData, setLoginData] = useState({
        "email": "",
        "password": "",
        "cpassword": "",
        "otp": ""
    })
    const [otp, setOTP] = useState(['', '', '', '']);
    const inputRefs = useRef([]);
    const handleChange = (e, index) => {
        const { value } = e.target;
        if (isNaN(value)) return; // Only allow numeric input

        const newOTP = [...otp];
        newOTP[index] = value;
        setOTP(newOTP);

        if (index < 3 && value !== '') {
            // Move focus to the next input box
            inputRefs.current[index + 1].focus();
        }

        if (newOTP.every((digit) => digit !== '')) {
            // Call the onComplete callback when all input fields have a value
            verify(newOTP.join(''))
        }
    };
    const [pageState, setpageState] = useState('forget');
    const [isLoading, setIsLoading] = useState(false)
    const navigator = useNavigate()
    
    const onChange = (event) => {
        setLoginData({ ...loginData, [event.target.name]: event.target.value })
    }
    const forget = async () => {
        try {
            setIsLoading(true)
            if (loginData.email) {
                await fetch(`${baseUrl}emailVerification/sendEmail?email=${loginData.email}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(res => res.json()).then(response => {
                    if (response.status) {
                        //   navigator(`/${basePath}/admin/index`)
                        localStorage.setItem('otp', response.data.otp);
                        localStorage.setItem('email', response.data.email);
                        setpageState('verify')
                        toast.success(response.message, {
                            position: toast.POSITION.TOP_RIGHT
                        })
                    }
                    else {
                        toast.error(response.message, {
                            position: toast.POSITION.TOP_RIGHT
                        })
                    }
                })
            }
            else {
                toast.error('Email and Password are required', {
                    position: toast.POSITION.TOP_RIGHT
                })
            }
            setIsLoading(false)
        } catch (err) {

        }
    }
    const verify = async (enteredotp) => {
        setIsLoading(true)
        if (otp) {
            let otp = localStorage.getItem('otp')
            if (otp == enteredotp) {
                setpageState('reset')
                toast.success('Verification Successfull', {
                    position: toast.POSITION.TOP_RIGHT
                })
            }
            else {
                toast.error('otp incorrect', {
                    position: toast.POSITION.TOP_RIGHT
                })
            }
        }
        else {
            toast.error('otp required', {
                position: toast.POSITION.TOP_RIGHT
            })
        }
        setIsLoading(false)
    }
    const reset = async () => {
        try {
            setIsLoading(true)
            if (loginData.password && loginData.cpassword) {
                if (loginData.password === loginData.cpassword) {
                    await fetch(`${baseUrl}admin/updatePassword`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            email: localStorage.getItem('email'),
                            newPassword: loginData.cpassword
                        })
                    }).then(res => res.json()).then(response => {
                        if (response.status) {
                            //   navigator(`/${basePath}/admin/index`)
                            localStorage.clear();
                            navigator(`/${basePath}/auth/login`)
                            toast.success(`Password Updated`, {
                                position: toast.POSITION.TOP_RIGHT
                            })
                        }
                        else {
                            toast.error(response.message, {
                                position: toast.POSITION.TOP_RIGHT
                            })
                        }
                    })
                }
                else {
                    toast.error('Password and Confirm Password should match', {
                        position: toast.POSITION.TOP_RIGHT
                    })
                }
            }
            else {
                toast.error('Password and Confirm Password are required', {
                    position: toast.POSITION.TOP_RIGHT
                })
            }
            setIsLoading(false)
        } catch (err) {

        }
    }
    const login = async () => {
        setIsLoading(true)
        if (loginData.email && loginData.password) {
            await fetch(`${baseUrl}admin/login`, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                  email: loginData.email,
                  password: loginData.password
                })
              }).then(res => res.json()).then(response => {
                if (response.status) {
                  navigator(`/${basePath}/admin/index`)
                  localStorage.setItem('jwt-token', response.token);
                  localStorage.setItem('name', response.result.name);
                  localStorage.setItem('id', response.result._id);
        
                  window.location.reload()
                }
                else {
                  toast.error(response.message, {
                    position: toast.POSITION.TOP_RIGHT
                  })
                }
              }).catch(err=>{
                    navigator(`/${basePath}/error`);
              })
        }
        else {
            toast.error('Email and Password are required', {
                position: toast.POSITION.TOP_RIGHT
            })
        }

        setIsLoading(false)

    }
    return {
        loginData,
        setLoginData,
        otp,
        setOTP,
        inputRefs,
        handleChange,
        pageState,
        setpageState,
        isLoading,
        setIsLoading,
        navigator,
        onChange,
        forget,
        verify,
        reset,
        login
    }
}