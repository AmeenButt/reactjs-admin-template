
import { CircularProgress } from "@material-ui/core";
import {
    Button,
    Card,
    CardBody,
    Col,
} from "reactstrap";
import CommonInput from 'components/commonInput'
import styled from 'styled-components';
import useAuth from "hooks/useAuth";
import CommonButton from 'components/globalButton'

const OTPInputContainer = styled.div`
    width: 100%;
    display: flex;
    position: relative;
    textAlign: center;
`;

const OTPInputBox = styled.input`
  width: 20%;
  height: 50px;
  font-size: 18px;
  text-align: center;
  margin: 5px;
  border: 1px solid #ccc;
  border-radius: 10px;
`;

const Forget = () => {
    const { loginData,
        otp,
        inputRefs,
        handleChange,
        pageState,
        isLoading,
        onChange,
        forget,
        verify,
        reset } = useAuth()
    let forgetPasswordFields = [
        {
            placeholder: 'Email',
            value: loginData.email,
            onChange: onChange,
            type: 'email',
            name: 'email',
            icon: 'ni ni-email-83'
        }
    ]
    let resetPasswordFields = [
        {
            placeholder: 'New Password',
            value: loginData.password,
            onChange: onChange,
            type: 'password',
            name: 'password',
            icon: 'ni ni-lock-circle-open'
        },
        {
            placeholder: 'Re-Enter Password',
            value: loginData.cpassword,
            onChange: onChange,
            type: 'password',
            name: 'cpassword',
            icon: 'ni ni-lock-circle-open'
        },

    ]
    return (
        <>
            <Col lg="5" md="7">
                <Card className="bg-secondary shadow border-0">
                    <CardBody className="px-lg-5 py-lg-5">
                        {pageState == 'forget' ?
                            <>
                                <div className="text-center text-muted mb-4">
                                    <small style={{ fontSize: '24px' }}>Enter your Email</small>
                                </div><form onSubmit={(event) => { event.preventDefault(); forget() }}>
                                    {forgetPasswordFields.map((item, index) =>
                                        <CommonInput
                                            key={index}
                                            icon={item.icon}
                                            type={item.type}
                                            value={item.value}
                                            onChange={item.onChange}
                                            name={item.name}
                                            placeholder={item.placeholder}
                                        />
                                    )}

                                    <div className="text-center">
                                        <CommonButton
                                            type='submit'
                                            isLoading={isLoading}
                                            text='Send Code'
                                            marginClass='my-4'
                                        />
                                    </div>
                                </form>
                            </> : pageState == 'verify' ?
                                <>
                                    <div className="text-center text-muted mb-4">
                                        <small style={{ fontSize: '24px' }}>Enter otp</small>
                                    </div>
                                    <form onSubmit={(event) => { event.preventDefault(); verify() }}>
                                        <OTPInputContainer>
                                            <center>{otp.map((digit, index) => (
                                                <OTPInputBox
                                                    key={index}
                                                    type="text"
                                                    maxLength="1"
                                                    value={digit}
                                                    onChange={(e) => handleChange(e, index)}
                                                    ref={(ref) => (inputRefs.current[index] = ref)}
                                                />
                                            ))}</center>
                                        </OTPInputContainer>

                                        <div className="text-center">
                                            <CommonButton
                                                type='submit'
                                                isLoading={isLoading}
                                                text='Verify'
                                                marginClass='my-4'
                                            />
                                        </div>
                                    </form>
                                </> : pageState == 'reset' ?
                                    <>
                                        <div className="text-center text-muted mb-4">
                                            <small style={{ fontSize: '24px' }}>Reset  password</small>
                                        </div>
                                        <form onSubmit={(event) => { event.preventDefault(); reset() }}>
                                            {resetPasswordFields.map((item, index) => <CommonInput
                                                key={index}
                                                icon={item.icon}
                                                type={item.type}
                                                value={item.value}
                                                onChange={item.onChange}
                                                name={item.name}
                                                placeholder={item.placeholder}
                                            />)}
                                            <div className="text-center">
                                                <CommonButton
                                                    type='submit'
                                                    isLoading={isLoading}
                                                    text='Reset'
                                                    marginClass='my-4'
                                                />
                                            </div>
                                        </form>
                                    </> : <></>}
                    </CardBody>
                </Card>
            </Col>
        </>
    );
};

export default Forget;
