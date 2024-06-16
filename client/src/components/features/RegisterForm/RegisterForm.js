import { useState } from "react";
import { Form, Button, Alert, Spinner } from "react-bootstrap";
import {API_URL } from "../../../config";

const Register = () => {

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [avatar, setAvatar] = useState(null);
  const [status, setStatus] = useState(null); // null, 'loading', 'success', 'serverError', 'clientError', 'loginError'
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const errors = {};

    if (!login) {
      errors.login = 'Login is required';
    };

    if (!password) {
      errors.password = 'Password is required';
    };

    if (!phone) {
      errors.phone = 'Phone number is required';
    };

    if (!avatar) {
      errors.avatar = 'Avatar is required';
    };

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    };

    const fd = new FormData();
    fd.append('login', login);
    fd.append('password', password);
    fd.append('phoneNumber', phone);
    fd.append('avatar', avatar);

    const options = {
      method: 'POST',
      body: fd
    };

    setStatus('loading');
    fetch(`${API_URL}/auth/register`, options)
      .then(res => {
        if (res.status === 201) {
          setStatus('success');
        } else if (res.status === 400) {
          setStatus('clientError');
        } else if (res.status === 409) {
          setStatus('loginError');
        } else {
          setStatus('serverError');
        };
      })
      .catch(err => {
        setStatus('serverError');
      });
  };

  return(
    <Form onSubmit={handleSubmit}>

      {status === "success" && (
        <Alert variant="success">
          <Alert.Heading>Success!</Alert.Heading>
          <p>You have been successfuly registred! You can now log in...</p>
        </Alert>
      )}
      
      {status === "serverError" && (
        <Alert variant="danger">
          <Alert.Heading>Something went wrong...</Alert.Heading>
          <p>Unexpected error... Try again!</p>
        </Alert>
      )}

      {status === "clientError" && (
        <Alert variant="danger">
          <Alert.Heading>No enough data</Alert.Heading>
          <p>You have to fill all the fields.</p>
        </Alert>
      )}

      {status === "loginError" && (
        <Alert variant="warning">
          <Alert.Heading>Login already in use</Alert.Heading>
          <p>You have to use other login.</p>
        </Alert>
      )}

      {status === "loading" && (
        <Spinner animation="border" role="status" className="d-block mx-auto">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      )}

      <Form.Group className="mb-3" controlId="formLogin">
        <Form.Label>Login</Form.Label>
        <Form.Control
          type="text"
          value={login}
          onChange={e => setLogin(e.target.value)}
          placeholder="Enter login"
          isInvalid={!!errors.login}
        />
        <Form.Control.Feedback type="invalid">
          {errors.login}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          isInvalid={!!errors.password} 
        />
        <Form.Control.Feedback type="invalid">
          {errors.password}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPhone">
        <Form.Label>Phone number</Form.Label>
        <Form.Control
          type="tel"
          value={phone}
          onChange={e => setPhone(e.target.value)}
          placeholder="Phone number"
          isInvalid={!!errors.phone}
        />
        <Form.Control.Feedback type="invalid">
          {errors.phone}
        </Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formFile">
        <Form.Label>Avatar</Form.Label>
        <Form.Control
          type="file"
          onChange={e => setAvatar(e.target.files[0])}
          isInvalid={!!errors.avatar}
        />
        <Form.Control.Feedback type="invalid">
          {errors.avatar}
        </Form.Control.Feedback>
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>

    </Form>
  );
};

export default Register;