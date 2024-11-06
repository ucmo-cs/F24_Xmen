import React, {useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom'
 
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
    const [user, setUser] = useState({ name: '', email: '', phone_number: '',
        bank_routing: '', bank_account_number: ''});
    const navigate = useNavigate();
    const [editStatus, setEditStatus] = useState("")

    useEffect(() => {
        fetch("http://localhost:8081/user/account", {
            method: "GET",
            credentials: "include",
        })
            .then((res) => res.json())
            .then((data) => setUser(data))
            .catch((error) => console.error("Error fetching user data:", error));
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        fetch("http://localhost:8081/user/edit", {
            method: "PUT",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(user),
        })
            .then((res) => {
                if (res.ok) {
                    setEditStatus("Successfully Updated!");
                } else {
                    setEditStatus("Failed to update user");
                }
            })
            .catch((error) => console.error("Error updating user:", error));
    };


  return (
    <div>
       <h2 id="welcome-customer">Welcome back, {user.name}!</h2>
       <Form onSubmit={handleSubmit}>
        <h5 id="edit-message">To edit your profile, enter your new information in the forms below and 
          hit submit.
        </h5>
        <Form.Group className="mb-3" id="floating-box">
        <Form.Label>Name</Form.Label>
        <Form.Control  placeholder="CurrentNameHere" type="text"
                       name="name"
                       value={user.name}
                       onChange={handleInputChange}/>
      </Form.Group>
      <Form.Group className="mb-3" id="floating-box">
        <Form.Label>Email</Form.Label>
        <Form.Control  placeholder="CurrentEmailHere" type="email"
                       name="email"
                       value={user.email}
                       onChange={handleInputChange}/>
      </Form.Group>
       <Form.Group className="mb-3" id="floating-box">
        <Form.Label>Phone #</Form.Label>
        <Form.Control  placeholder="CurrentPhoneNumberHere" type="text"
                       name="phone_number"
                       value={user.phone_number}
                       onChange={handleInputChange}/>
      </Form.Group>
      <Form.Group className="mb-3" id="floating-box">
        <Form.Label>Routing #</Form.Label>
        <Form.Control  placeholder="CurrentRoutingNumberHere" type="text"
                       name="bank_routing"
                       value={user.bank_routing}
                       onChange={handleInputChange}/>
      </Form.Group>
      <Form.Group className="mb-3" id="floating-box">
        <Form.Label>Account #</Form.Label>
        <Form.Control  placeholder="CurrentAccountNumberHere" type="text"
                       name="bank_account_number"
                       value={user.bank_account_number}
                       onChange={handleInputChange}/>
      </Form.Group>

      <Button variant="primary" type="submit" id="save-edits-button">
        Change My Information
      </Button>
       </Form>

        {editStatus && <p id="text-align-left">{editStatus}</p>}
    </div>

  );
}

export default Customer;
