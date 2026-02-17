import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
import { Card, Row, Col } from 'react-bootstrap';

function Features() {
  return (
    <Row className="mt-4">
      <Col md={4}>
        <Card bg="info" text="white" className="mb-4" onClick={() => window.location.href='/dashboard/user'}>
          <Card.Body>
            <Card.Title>User Dashboard</Card.Title>
            <Card.Text>Book appointments, view your bookings, and more.</Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col md={4}>
        <Card bg="success" text="white" className="mb-4" onClick={() => window.location.href='/dashboard/doctor'}>
          <Card.Body>
            <Card.Title>Doctor Dashboard</Card.Title>
            <Card.Text>Manage appointments, view patient requests, and more.</Card.Text>
          </Card.Body>
        </Card>
      </Col>
      <Col md={4}>
        <Card bg="warning" text="white" className="mb-4" onClick={() => window.location.href='/dashboard/admin'}>
          <Card.Body>
            <Card.Title>Admin Dashboard</Card.Title>
            <Card.Text>Approve doctors, manage users, and admin tasks.</Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
}
export default Features;