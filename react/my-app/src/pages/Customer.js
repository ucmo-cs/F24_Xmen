import React from 'react';
 
import "./Customer.css";
import { Button, Form } from 'react-bootstrap';
/*• In addition, any of the following data should be populated if it exists, and the customer should
be able to input or edit any of the following:
o The name of the customer.
o The customer’s email address.
o The customer’s phone number.
o The customer’s bank account details for automatic payments
*/
function Customer() {
  return (
    <div>
       <h2 id="welcome-customer">Welcome back, CustomerName!</h2>
       <Form /*onSubmit={}*/>
        <h5 id="edit-message">To edit your profile, enter your new information in the forms below and 
          hit submit.
        </h5>
        <Form.Group className="mb-3" id="floating-box">
        <Form.Label>Name</Form.Label>
        <Form.Control  placeholder="CurrentNameHere" />
      </Form.Group>
      <Form.Group className="mb-3" id="floating-box">
        <Form.Label>Email</Form.Label>
        <Form.Control  placeholder="CurrentEmailHere" />
      </Form.Group>
       <Form.Group className="mb-3" id="floating-box">
        <Form.Label>Phone #</Form.Label>
        <Form.Control  placeholder="CurrentPhoneNumberHere" />
      </Form.Group>
      <Form.Group className="mb-3" id="floating-box">
        <Form.Label>Routing #</Form.Label>
        <Form.Control  placeholder="CurrentRoutingNumberHere" />
      </Form.Group>
      <Form.Group className="mb-3" id="floating-box">
        <Form.Label>Account #</Form.Label>
        <Form.Control  placeholder="CurrentAccountNumberHere" />
      </Form.Group>
      </Form>

      <Button variant="primary" type="submit" id="save-edits-button">
        Change My Information
      </Button>
    </div>
  );
}

export default Customer;
