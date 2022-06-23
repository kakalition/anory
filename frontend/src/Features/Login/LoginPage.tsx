import { Button, Form } from 'react-bootstrap';
import AnoryLogo from '../Component/AnoryLogo';
import Spacer from '../Utilities/Spacer';
import '../../Stylesheets/LoginPage/LoginPage.css';

export default function LoginPage() {
  return (
    <div
      className="vh-100 vw-100 position-relative container-fluid d-flex flex-column align-items-center justify-content-center"
      style={{ backgroundColor: '#FAFAFA' }}
    >
      <Form
        className="container d-flex flex-column"
        style={{
          width: '40%',
          backgroundColor: '#FFFFFF',
          padding: '4rem',
        }}
      >
        <h1>Welcome Back!</h1>
        <Spacer height="3rem" />
        <Form.Group>
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="joseph@mail.com" />
        </Form.Group>
        <Spacer height="2rem" />
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="••••••••" />
        </Form.Group>
        <Spacer height="2rem" />
        <Button
          variant="primary"
          type="submit"
        >
          Login
        </Button>
        <Spacer height="3rem" />
        <p>
          Don&apos;t have an account, yet?
          {'  '}
          <a href="">Sign up here</a>
        </p>
      </Form>
      <div id="logo-container">
        <AnoryLogo />
      </div>
    </div>
  );
}
