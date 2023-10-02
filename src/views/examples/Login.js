import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  Col,
} from "reactstrap";
import basePath from "basePath";
import useAuth from "hooks/useAuth";
import CommonInput from 'components/commonInput'
import CommonButton from 'components/globalButton'
const Login = () => {
  const {
    onChange,
    login,
    isLoading,
    loginData
  } = useAuth();
  let loginFields = [
    {
      placeholder: 'Email',
      value: loginData.email,
      onChange: onChange,
      type: 'email',
      name: 'email',
      icon: 'ni ni-email-83'
    },
    {
      placeholder: 'Password',
      value: loginData.password,
      onChange: onChange,
      type: 'password',
      name: 'password',
      icon: 'ni ni-lock-circle-open'
    },

  ]
  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <div className="text-center text-muted mb-4">
              <small style={{ fontSize: '24px' }}>Enter your credentials</small>
            </div>
            <form onSubmit={(event) => { event.preventDefault(); login() }}>
              {loginFields.map((item, index) =>
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
                  text='Sign in'
                  marginClass='my-4'
                />
              </div>
            </form>
            <center><Link to={`/${basePath}/auth/forgetPassword`} style={{
              color: 'blue'
            }}>Forget Password?</Link></center>
          </CardBody>
        </Card>
      </Col>
    </>
  );
};

export default Login;
