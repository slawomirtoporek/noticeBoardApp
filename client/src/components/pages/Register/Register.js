import RegisterForm from "../../features/RegisterForm/RegisterForm";
import { Row, Col } from "react-bootstrap";

const Register = () => {

  return (
    <>
      <Row>
        <Col className="col-12 col-sm-3 mx-auto">
          <h1 className="my-3">Sign up</h1>
          <RegisterForm />
        </Col>
      </Row>
    </>
  );

};

export default Register;