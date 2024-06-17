import { Row, Col } from 'react-bootstrap';
import LoginForm from '../../features/LoginForm/LoginForm';

const Login = () => {
  return(
    <Row>
        <Col className="col-12 col-sm-3 mx-auto">
          <h1 className="my-3">Sign in</h1>
          <LoginForm />
        </Col>
    </Row>
  );
};

export default Login;